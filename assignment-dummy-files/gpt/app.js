// app.js — vanilla JS module (no frameworks)
const qs = sel => document.querySelector(sel);
const qsa = sel => Array.from(document.querySelectorAll(sel));

/* ---------- Basic data: stations + lines ----------
   This is a compact version of stations.json (10x10 coordinates 0..9).
   Replace with full stations.json as you like.
*/
const stations = [
  // id, x(0..9), y(0..9), type, train, side, district
  { id: 1, x:0, y:0, type:'A', train:false, side:'Buda', district:1 },
  { id: 2, x:2, y:0, type:'B', train:false, side:'Buda', district:1 },
  { id: 3, x:6, y:1, type:'C', train:true,  side:'Pest', district:5 },
  { id: 4, x:9, y:1, type:'A', train:false, side:'Pest', district:5 },
  { id: 5, x:1, y:3, type:'D', train:false, side:'Buda', district:2 },
  { id: 6, x:4, y:2, type:'D', train:false, side:'Buda', district:2 },
  { id: 7, x:5, y:4, type:'C', train:false, side:'Pest', district:6 },
  { id: 8, x:7, y:5, type:'B', train:false, side:'Pest', district:6 },
  { id: 9, x:3, y:6, type:'A', train:true, side:'Pest', district:7 },
  { id: 10, x:0, y:9, type:'C', train:false, side:'Buda', district:2 },
  { id: 30, x:4, y:4, type:'?', train:false, side:'Pest', district:6 } // Deák (joker)
];

// minimal lines.json
const lines = [
  { id: 1, name: 'M1', color:'#FFD400', start:1 },
  { id: 2, name: 'M2', color:'#E11D2A', start:4 },
  { id: 3, name: 'M3', color:'#0E7BFF', start:6 },
  { id: 4, name: 'M4', color:'#1DB954', start:10 }
];

/* ---------- State ---------- */
let state = {
  player: 'Player',
  timerRef: null,
  startTime: null,
  elapsed: 0,
  roundOrder: [],           // order of lines
  roundIndex: 0,            // 0..3
  currentLineSegments: {},  // lineId -> segments array
  usedStationsByLine: {},   // lineId -> Set of station ids
  deck: [],
  cardsThisRound: 0,
  currentCard: null,
  gameEnded: false,
  roundScores: [],
  railwaySlider: 0
};

/* ---------- Utilities ---------- */
const stationById = id => stations.find(s => s.id === id);
const stationsAt = (x,y) => stations.filter(s => s.x===x && s.y===y);

/* ---------- Deck ---------- */
function buildDeck() {
  // 11 cards: A,B,C,D,Joker each twice (center/side) -> represent by type+slot
  const cards = [
    {label:'A',kind:'side'}, {label:'B',kind:'side'},{label:'C',kind:'side'},{label:'D',kind:'side'},{label:'J',kind:'side'},
    {label:'A',kind:'center'},{label:'B',kind:'center'},{label:'C',kind:'center'},{label:'D',kind:'center'},{label:'J',kind:'center'},
    // no switch implementation in minimum
  ];
  // shuffle
  for (let i=cards.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [cards[i],cards[j]]=[cards[j],cards[i]];
  }
  return cards;
}

/* ---------- Rendering SVG board ---------- */
const BOARD_SIZE = 1000;
const GRID_CELLS = 10;
const CELL = BOARD_SIZE / GRID_CELLS;

function renderBoard() {
  const svg = qs('#board');
  svg.innerHTML = '';
  // draw light grid (already CSS background) — draw station elements
  // segments first
  const segmentsGroup = makeSVG('g', {id:'segmentsGroup'});
  svg.appendChild(segmentsGroup);

  // draw stations
  const stationsG = makeSVG('g', {id:'stationsGroup'});
  svg.appendChild(stationsG);

  for (const s of stations) {
    const cx = s.x * CELL + CELL/2;
    const cy = s.y * CELL + CELL/2;
    const g = makeSVG('g', {class:'station', 'data-id':s.id});
    const circle = makeSVG('circle', {cx,cy,r:16, fill:'#000', stroke:'#fff','stroke-width':3});
    const t = makeSVG('text', {x:cx, y:cy+5, 'text-anchor':'middle'}); t.textContent = s.type==='?' ? '?' : s.type;
    g.appendChild(circle);
    g.appendChild(t);
    // small train icon mark
    if (s.train) {
      const tri = makeSVG('rect', {x:cx+14, y:cy-18, width:8, height:8, rx:2, ry:2, fill:'#666'});
      g.appendChild(tri);
    }
    // clickable
    g.addEventListener('click', onStationClick);
    stationsG.appendChild(g);
  }
  // draw existing segments for current roundOrder
  for (const line of state.roundOrder) {
    drawAllSegmentsForLine(line.id);
  }
}

function makeSVG(name, attrs={}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', name);
  Object.entries(attrs).forEach(([k,v])=> { if (v!==undefined) el.setAttribute(k,v); });
  return el;
}

/* ---------- Gameplay operations ---------- */
function startGame() {
  const name = qs('#playerName').value.trim() || 'Player';
  state.player = name;
  state.roundOrder = shuffleArray(lines.map(l => ({...l})));
  state.roundIndex = 0;
  state.currentLineSegments = {};
  state.usedStationsByLine = {};
  state.roundScores = [];
  state.railwaySlider = 0;
  state.gameEnded = false;
  state.cardsThisRound = 0;
  state.currentCard = null;
  state.deck = buildDeck();
  // initialize per-line
  for (const l of state.roundOrder) {
    state.currentLineSegments[l.id] = [];
    state.usedStationsByLine[l.id] = new Set([lines.find(x=>x.id===l.id).start]);
  }
  state.startTime = Date.now();
  state.timerRef = setInterval(updateTimer, 1000);

  // show game screen
  qs('#menu').classList.add('hidden');
  qs('#description').classList.add('hidden');
  qs('#game').classList.remove('hidden');
  qs('#playerDisplay').textContent = state.player;
  qs('#roundIndex').textContent = state.roundIndex+1;
  qs('#cardsThisRound').textContent = state.cardsThisRound;
  renderBoard();
  updateLineDisplay();
}

function endGame() {
  clearInterval(state.timerRef);
  state.gameEnded = true;
  // calculate final score
  const sumFP = state.roundScores.reduce((a,b)=>a+b,0);
  const pp = state.railwaySlider;
  const junctions = calculateJunctions();
  const finalScore = sumFP + pp + (2*junctions.p2) + (5*junctions.p3) + (9*junctions.p4);
  saveScore({name:state.player, score:finalScore, time: state.elapsed});
  alert(`Game over. Final score: ${finalScore}\n( Sum rounds ${sumFP}, Railway ${pp}, P2:${junctions.p2},P3:${junctions.p3},P4:${junctions.p4} )`);
  showMenu();
}

function showMenu() {
  qs('#game').classList.add('hidden');
  qs('#menu').classList.remove('hidden');
  qs('#description').classList.add('hidden');
  updateHighScoresUI();
}

/* ---------- Timer ---------- */
function updateTimer() {
  state.elapsed = Math.floor((Date.now() - state.startTime)/1000);
  const mm = String(Math.floor(state.elapsed/60)).padStart(2,'0');
  const ss = String(state.elapsed%60).padStart(2,'0');
  qs('#timer').textContent = `${mm}:${ss}`;
}

/* ---------- Card draw ---------- */
function drawCard() {
  if (state.gameEnded) return;
  if (state.deck.length===0) {
    state.deck = buildDeck(); // reshuffle if needed
  }
  const card = state.deck.pop();
  state.currentCard = card;
  state.cardsThisRound += 1;
  qs('#cardDisplay').textContent = `${card.label}${card.kind==='center' ? ' (C)' : ' (S)'}`;
  qs('#cardsThisRound').textContent = state.cardsThisRound;
  // If this is the 8th card -> round ends after this turn (minimum requirements)
  if (state.cardsThisRound >= 8) {
    // round will end after this card: we leave it to player to place last segment if desired,
    // when they click Next Round we finalize. For convenience, auto-end if no placement made in 5s.
    setTimeout(()=>{ if (!state.gameEnded) finalizeRound(); }, 12000);
  }
}

/* ---------- Station click + build segment flow ---------- */
let placingFrom = null; // station id where the drawn segment must start (an endpoint)
function onStationClick(ev) {
  const id = Number(ev.currentTarget.getAttribute('data-id'));
  if (!state.currentCard) {
    // no drawn card -> maybe select endpoint?
    return;
  }
  const currentLine = state.roundOrder[state.roundIndex];
  // Determine valid starting stations (endpoints only)
  const usedSet = state.usedStationsByLine[currentLine.id];
  const endpoints = computeEndpointsForLine(currentLine.id);
  // If placingFrom is null, we expect user to click an endpoint to start the segment
  if (!placingFrom) {
    if (!endpoints.has(id)) {
      // invalid start
      flashElement(ev.currentTarget);
      return;
    }
    placingFrom = id;
    highlightStation(id, true);
    return;
  }
  // placingFrom set -> interpret this click as the target station
  const fromId = placingFrom;
  const toId = id;
  // reset highlight
  highlightStation(placingFrom, false);
  placingFrom = null;

  // Validate building a segment from -> to with current card rules
  const card = state.currentCard;
  if (!card) return;
  if (!canBuildSegment(currentLine.id, fromId, toId, card)) {
    alert('Segment invalid by rules.');
    return;
  }
  // Build segment
  addSegment(currentLine.id, fromId, toId);
  // If target is a train station: update railway slider
  const targetStation = stationById(toId);
  if (targetStation.train) {
    state.railwaySlider = Math.min(25, state.railwaySlider + 1); // slider increment
  }
  // mark station visited by line
  state.usedStationsByLine[currentLine.id].add(toId);
  state.currentCard = null;
  qs('#cardDisplay').textContent = '—';
  renderBoard();
  // if 8th card triggered round end earlier, finalize if needed
  if (state.cardsThisRound >= 8 && state.currentCard === null) {
    finalizeRound();
  }
}

/* ---------- Building validation ---------- */
function canBuildSegment(lineId, fromId, toId, card) {
  if (fromId === toId) return false;
  const sFrom = stationById(fromId);
  const sTo = stationById(toId);

  // card matching: Joker or '?' is allowed
  const matchOk = (card.label === 'J') || (sTo.type === '?' ) || (sTo.type === card.label);
  if (!matchOk) return false;

  // must not already be in same line's used stations
  if (state.usedStationsByLine[lineId].has(toId)) return false; // no loops

  // segment must be straight: horizontal, vertical, or 45° diagonal
  const dx = sTo.x - sFrom.x;
  const dy = sTo.y - sFrom.y;
  const straight = (dx === 0) || (dy === 0) || (Math.abs(dx) === Math.abs(dy));
  if (!straight) return false;

  // segment cannot pass through other stations (touch exactly two stations).
  // check cells between from and to: if any station located strictly between them, fail.
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  const stepX = dx === 0 ? 0 : dx / steps;
  const stepY = dy === 0 ? 0 : dy / steps;
  for (let step = 1; step < steps; step++) {
    const cx = sFrom.x + step * stepX;
    const cy = sFrom.y + step * stepY;
    // we require cx,cy to be integer grid positions
    if (!Number.isInteger(cx) || !Number.isInteger(cy)) continue;
    const present = stationsAt(cx,cy);
    if (present.length > 0) return false;
  }

  // parallel segments: no existing segment between these two stations (any order)
  const segs = state.currentLineSegments[lineId];
  if (segs.some(s => (s.a===fromId && s.b===toId) || (s.a===toId && s.b===fromId))) return false;
  // also across other lines: no parallel segments across lines
  for (const lid of Object.keys(state.currentLineSegments)) {
    if (Number(lid)===lineId) continue;
    if (state.currentLineSegments[lid].some(s => (s.a===fromId && s.b===toId) || (s.a===toId && s.b===fromId))) return false;
  }

  // intersections: segments cannot cross other segments in open areas (only allowed at stations).
  // We'll check each existing segment for intersection point that is not a shared station.
  const newSegGeom = {x1:sFrom.x, y1:sFrom.y, x2:sTo.x, y2:sTo.y};
  for (const [lid, segList] of Object.entries(state.currentLineSegments)) {
    for (const s of segList) {
      const sa = stationById(s.a), sb = stationById(s.b);
      const existing = {x1:sa.x,y1:sa.y,x2:sb.x,y2:sb.y};
      const inter = segmentsIntersectGrid(newSegGeom, existing);
      if (inter) {
        // if intersection happens at a station (one of endpoints), it's allowed
        const interIsStation = [s.a, s.b, fromId, toId].some(id => {
          const st = stationById(id);
          return st.x === inter.x && st.y === inter.y;
        });
        if (!interIsStation) return false;
      }
    }
  }

  return true;
}

/* ---------- Segment geometry helpers ---------- */
function segmentsIntersectGrid(s1, s2) {
  // s1: {x1,y1,x2,y2} (integer coords)
  // we compute intersection point in continuous plane; if they intersect at exactly a grid point return that point
  const p1 = {x:s1.x1, y:s1.y1}, p2={x:s1.x2,y:s1.y2}, p3={x:s2.x1,y:s2.y1}, p4={x:s2.x2,y:s2.y2};
  // convert to continuous coords (multiply by CELL for real geometry if needed) but integer grid is fine
  const denom = (p1.x-p2.x)*(p3.y-p4.y)-(p1.y-p2.y)*(p3.x-p4.x);
  if (denom === 0) {
    // parallel or collinear: if collinear overlapping segments count as intersecting
    // check collinearity and overlapping interior points
    if (isCollinear(p1,p2,p3)) {
      // check overlap excluding endpoints that are allowed only if intersection at station
      const allX=[p1.x,p2.x,p3.x,p4.x].sort((a,b)=>a-b);
      const allY=[p1.y,p2.y,p3.y,p4.y].sort((a,b)=>a-b);
      // pick middle interval
      const midX = allX[1], midY = allY[1];
      return {x:midX,y:midY}; // treat as intersection
    }
    return null;
  }
  const xi = ((p1.x*p2.y - p1.y*p2.x)*(p3.x-p4.x) - (p1.x-p2.x)*(p3.x*p4.y - p3.y*p4.x)) / denom;
  const yi = ((p1.x*p2.y - p1.y*p2.x)*(p3.y-p4.y) - (p1.y-p2.y)*(p3.x*p4.y - p3.y*p4.x)) / denom;
  // check if intersection lies within both segments
  if (between(xi, p1.x, p2.x) && between(xi, p3.x, p4.x) && between(yi, p1.y, p2.y) && between(yi, p3.y, p4.y)) {
    // if xi,yi are integers they match a station grid point; return it
    if (Number.isInteger(xi) && Number.isInteger(yi)) return {x:xi,y:yi};
    return {x:xi,y:yi};
  }
  return null;
}
function between(v,a,b) {
  return v >= Math.min(a,b)-1e-9 && v <= Math.max(a,b)+1e-9;
}
function isCollinear(p1,p2,p3) {
  return (p2.x-p1.x)*(p3.y-p1.y) === (p3.x-p1.x)*(p2.y-p1.y);
}

/* ---------- Add segment to state ---------- */
function addSegment(lineId, aId, bId) {
  state.currentLineSegments[lineId].push({a:aId,b:bId});
}

/* ---------- Draw segments onto SVG ---------- */
function drawAllSegmentsForLine(lineId) {
  const svg = qs('#board');
  const group = svg.querySelector('#segmentsGroup');
  const existing = group.querySelectorAll(`[data-line="${lineId}"]`);
  existing.forEach(n=>n.remove());
  const segs = state.currentLineSegments[lineId] || [];
  const lineDef = state.roundOrder.find(l => l.id === lineId) || lines.find(l=>l.id===lineId);
  const color = lineDef ? lineDef.color : '#000';
  for (const s of segs) {
    const sa = stationById(s.a), sb = stationById(s.b);
    const x1 = sa.x*CELL + CELL/2, y1 = sa.y*CELL + CELL/2;
    const x2 = sb.x*CELL + CELL/2, y2 = sb.y*CELL + CELL/2;
    const line = makeSVG('line', {x1,y1,x2,y2, stroke:color, 'stroke-width':6, class:'segment', 'data-line':lineId});
    group.appendChild(line);
  }
}

/* ---------- Round/score handling ---------- */
function finalizeRound() {
  // score current line
  const currentLine = state.roundOrder[state.roundIndex];
  const segs = state.currentLineSegments[currentLine.id];
  // touched stations are usedStationsByLine
  const usedIds = Array.from(state.usedStationsByLine[currentLine.id]);
  // PK = number districts this line passes through
  const districts = new Set(usedIds.map(id=>stationById(id).district));
  const PK = districts.size;
  // PM = max number of stations in a single district
  const counts = {};
  for (const id of usedIds) {
    const d = stationById(id).district;
    counts[d] = (counts[d]||0)+1;
  }
  const PM = Math.max(...Object.values(counts));
  // PD = number of times it crosses the Danube (segment that connects Buda<->Pest)
  let PD = 0;
  for (const s of segs) {
    const aSide = stationById(s.a).side;
    const bSide = stationById(s.b).side;
    if (aSide !== bSide) PD++;
  }
  const FP = (PK * PM) + PD;
  state.roundScores.push(FP);
  qs('#lastRoundScore').textContent = FP;
  // proceed to next round
  state.roundIndex++;
  state.cardsThisRound = 0;
  state.currentCard = null;
  qs('#cardDisplay').textContent = '—';
  qs('#roundIndex').textContent = Math.min(state.roundIndex+1, 4);
  qs('#cardsThisRound').textContent = state.cardsThisRound;

  if (state.roundIndex >= state.roundOrder.length) {
    // end game
    endGame();
  } else {
    // reshuffle deck for next round
    state.deck = buildDeck();
    updateLineDisplay();
    renderBoard();
  }
}

/* ---------- Utility: endpoints and used stations ---------- */
function computeEndpointsForLine(lineId) {
  // endpoints = stations on line with degree 1 in segment graph
  const segs = state.currentLineSegments[lineId];
  const deg = {};
  for (const s of segs) {
    deg[s.a] = (deg[s.a]||0)+1;
    deg[s.b] = (deg[s.b]||0)+1;
  }
  // starting station always considered used and endpoint if deg 0 or 1
  const startId = lines.find(l=>l.id===lineId).start;
  if (!deg[startId]) deg[startId]=0;
  const endpoints = new Set();
  Object.entries(deg).forEach(([idStr,d]) => {
    const id = Number(idStr);
    if (d <= 1) endpoints.add(id);
  });
  return endpoints;
}

/* ---------- Junctions final calc ---------- */
function calculateJunctions() {
  // How many stations served by 2,3,4 lines
  const counts = {}; // stationId -> how many lines
  for (const [lid, usedSet] of Object.entries(state.usedStationsByLine)) {
    for (const id of usedSet) {
      counts[id] = (counts[id]||0) + 1;
    }
  }
  let p2=0,p3=0,p4=0;
  Object.values(counts).forEach(n=>{
    if (n===2) p2++;
    if (n===3) p3++;
    if (n>=4) p4++;
  });
  return {p2,p3,p4};
}

/* ---------- High scores (localStorage) ---------- */
function saveScore(rec) {
  const key = 'metro_scores_v1';
  const arr = JSON.parse(localStorage.getItem(key) || '[]');
  arr.push(rec);
  arr.sort((a,b)=>b.score - a.score || a.time - b.time);
  localStorage.setItem(key, JSON.stringify(arr.slice(0,50)));
}
function updateHighScoresUI() {
  const key='metro_scores_v1';
  const arr = JSON.parse(localStorage.getItem(key)||'[]');
  const el = qs('#scoresList');
  if (!arr.length) { el.textContent = 'No previous games.'; return; }
  el.innerHTML = '<h3>High scores</h3>';
  const ul = document.createElement('ol');
  for (const r of arr) {
    const li = document.createElement('li');
    li.textContent = `${r.name} — ${r.score} pts — ${r.time}s`;
    ul.appendChild(li);
  }
  el.appendChild(ul);
}

/* ---------- Small UI helpers ---------- */
function updateLineDisplay() {
  const cur = state.roundOrder[state.roundIndex];
  qs('#currentLineName').textContent = cur.name;
  qs('#currentLineColor').style.background = cur.color;
}
function flashElement(el) {
  el.classList.add('flash');
  setTimeout(()=>el.classList.remove('flash'),300);
}
function highlightStation(id, on) {
  const node = qs(`#board g.station[data-id="${id}"] circle`);
  if (!node) return;
  node.setAttribute('stroke', on ? '#0bf' : '#fff');
  node.setAttribute('stroke-width', on ? 4 : 3);
}

/* ---------- Helpers ---------- */
function shuffleArray(a) {
  for (let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

/* ---------- Small DOM wiring ---------- */
qs('#startBtn').addEventListener('click', ()=> {
  startGame();
});
qs('#descBtn').addEventListener('click', ()=> {
  qs('#menu').classList.add('hidden');
  qs('#description').classList.remove('hidden');
});
qs('#backFromDesc').addEventListener('click', ()=> {
  qs('#description').classList.add('hidden');
  qs('#menu').classList.remove('hidden');
});
qs('#drawCardBtn').addEventListener('click', ()=> drawCard());
qs('#nextRoundBtn').addEventListener('click', ()=> finalizeRound());
window.addEventListener('resize', ()=> renderBoard()); // keep board responsive

// Blue heart toggles color when clicked (visible on menu). Do not mention.
qs('#blueHeart').addEventListener('click', (e)=> {
  const node = e.currentTarget;
  const current = node.textContent;
  // toggle between blue heart and green heart emoji
  node.textContent = current === '💙' ? '💚' : '💙';
});

// initialize UI
updateHighScoresUI();
renderBoard();
