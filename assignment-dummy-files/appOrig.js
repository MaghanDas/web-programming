
function makeMessageBox(){
    const mb = document.createElement('div');
    mb.className = 'message-box';
    mb.style.cssText = `
    position:fixed; top:18px; left:50%; transform:translateX(-50%);
    background:#111; color:#fff; padding:8px 12px; border-radius:8px;
    font-weight:600; opacity:0; pointer-events:none; transition:opacity .25s;
    z-index:9999;
    `;
    document.body.appendChild(mb);
    return mb;
}
const messageBox = makeMessageBox();
function showMessage(text, ms=1700){
    messageBox.textContent = String(text);
    messageBox.style.opacity = '1';
    setTimeout(() => messageBox.style.opacity = '0', ms);
}

// // loading data functin
// async function loadData() {
//     const [stationsRes, linesRes] = await Promise.all([
//         fetch("stations.json"),
//         fetch("lines.json")
//     ]);
//     const stations = await stationsRes.json();
//     const lines = await linesRes.json();
//     return {stations , lines};
// }

// ---------- Data loading ----------
async function loadData() {
  // prefer full stations.json; if not present, try stations-min.json
  const stationsPath = await fetch('stations.json').then(r => r.ok ? 'stations.json' : 'stations-min.json').catch(()=> 'stations-min.json');
  const [stationsRes, linesRes] = await Promise.all([
    fetch(stationsPath),
    fetch('lines.json')
  ]);
  const stations = await stationsRes.json();
  const lines = await linesRes.json();
  return { stations, lines };
}

// ---------- UI helpers ----------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const el = document.querySelector(`#${id}`);
  if (el) el.classList.remove('hidden');
}

// game -state : 

// __ SVG BOARD RENDERING. 
const SVG_NS = "http://www.w3.org/2000/svg";
const GRID_CELLS = 10;
const BOARD_SIZE = 1000;
const CELL = BOARD_SIZE / GRID_CELLS;

let stations = [];
let lines = [];
let currentCard = null;

let timerInterval = null;
let timeElapsed = 0;

let cardsThisRound = 0;
const MAX_CARDS_PER_ROUND = 8;
const deckTemplate = ["A", "B", "C", "D", "A", "B", "J", "C", "D", "J"];
let deck = [];

let currentRoundIndex = 0;
const MAX_ROUNDS = 4;

// game scores variables.
let roundSegments = [];
let allSegments = [];
const railwayTouched = {};
const stationLines = {};
let visitedStationsThisRound = new Set();

const railwayPointsMap = [0,1,2,4,6,8,11,14,17,21,25];

// dom refers .
const drawCardBtn = document.querySelector('#drawCardBtn');
const cardDisplay = document.querySelector('#cardDisplay');
const currentLineNameEl = document.getElementById("currentLineName");
const currentLineColorEl = document.getElementById("currentLineColor");
const timerEl = document.getElementById("timer");

const cardDisplayEl = document.querySelector('#cardDisplay');
const cardsThisRoundEl = document.querySelector('#cardsThisRound');
const boardEl = document.querySelector('#board');
const startBtn = document.querySelector('#startBtn');
const nextRoundBtn = document.querySelector('#nextRoundBtn');
const playerDisplay = document.querySelector('#playerDisplay');
const roundIndexEl = document.querySelector('#roundIndex');
const lastRoundScoreEl = document.querySelector('#lastRoundScore');
const railwaySliderEl = document.querySelector('#railwaySlider');
const finalScoreElWrapper = document.querySelector('.final-score');

const showRulesBtn = document.querySelector('#showRulesBtn');
const backFromRulesBtn = document.querySelector('#backFromRules');

// Show rules screen
showRulesBtn.addEventListener('click', () => {
    showScreen('rules');
});

// Back to menu
backFromRulesBtn.addEventListener('click', () => {
    showScreen('menu');
});


function startTimer(){
  timeElapsed = 0;
  timerInterval = setInterval(() => {
    timeElapsed++;
    const minutes = String(Math.floor(timeElapsed / 60)).padStart(2,'0');
    const seconds = String(timeElapsed % 60).padStart(2,'0');
    timerEl.textContent = `${minutes}:${seconds}`;
  },1000);
}

function shuffleInPlace(arr) {
    for(let i = arr.length -1; i > 0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    return arr;
}

function resetDeck(){
    deck = deckTemplate.slice();
    shuffleInPlace(deck);
}

function renderBoard(sts) {
  boardEl.innerHTML = "";

  // groups for z-ordering: segments under stations.
  const segG = document.createElementNS(SVG_NS, "g");
  segG.id='segments';
  boardEl.appendChild(segG);

  const stationsG = document.createElementNS(SVG_NS, "g");
  stationsG.id = 'stations'
  boardEl.appendChild(stationsG);

  // drawing river in middle horizontal
  const river = document.createElementNS(SVG_NS,"rect");
  river.setAttribute("x", "0");
  river.setAttribute("y", BOARD_SIZE / 2 - 20); // 40px river width
  river.setAttribute("width", BOARD_SIZE);
  river.setAttribute("height", "140");
  river.setAttribute("fill", "#00ccff");
  river.setAttribute("opacity", "0.3");
  boardEl.appendChild(river);

  sts.forEach((st, idx) => {
    const gx = st.x * CELL + CELL / 2;
    const gy = st.y * CELL + CELL / 2;

    const g = document.createElementNS(SVG_NS, "g");
    g.classList.add("station-group");
    g.setAttribute("data-x", String(st.x));
    g.setAttribute("data-y", String(st.y));
    g.setAttribute("data-letter", String(st.type));
    g.setAttribute("data-id", String(st.id ?? idx));
    if (st.district !== undefined) g.setAttribute('data-district', String(st.district));
    if (st.side) g.setAttribute('data-side', st.side);
    if (st.train) g.setAttribute('data-train', String(Boolean(st.train)));
    // circle
    const circle = document.createElementNS(SVG_NS, "circle");
    circle.classList.add("station");
    circle.setAttribute("cx", String(gx));
    circle.setAttribute("cy", String(gy));
    circle.setAttribute("r", "28");
    circle.setAttribute("fill", "#1f78ff");
    circle.setAttribute("stroke", "#fff");
    circle.setAttribute("stroke-width", "2");
circle.setAttribute("pointer-events", "all");
    // adding letters on top
    const label = document.createElementNS(SVG_NS, "text");
    label.setAttribute("x", String(gx));
    label.setAttribute("y", String(gy + 6));
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "16");
    label.setAttribute("font-weight", "700");
    label.setAttribute("fill", "#fff");
    label.textContent = st.type === "?" ? "J" : st.type;

    g.appendChild(circle);
    g.appendChild(label);
    stationsG.appendChild(g);
  });
    // console.log(`renderBoard: rendered ${stations.length} stations`);
}

function gridToSvgCoords(x,y){
    return {x: x * CELL + CELL/2, y: y* CELL + CELL/2};
}
function between (v,a,b){
  return v >= Math.min(a,b) - 1e-9 && v <= Math.max(a,b) + 1e-9;
}

function segmentsIntersect(seg1,seg2){
  const p1 = {x: seg1.x1, y: seg1.y1}, p2 = {x:seg1.x2,y:seg1.y2};
  const p3 = {x: seg2.x1, y: seg2.y1}, p4 = {x:seg2.x2,y:seg2.y2};
  const denom = (p1.x-p2.x)*(p3.y-p4.y)-(p1.y-p2.y)*(p3.x-p4.x);
  if(Math.abs(denom) <  1e-9) {
    const col = (p2.x-p1.x)*(p3.y-p1.y)===(p3.x-p1.x)*(p2.y-p1.y);
    if(!col)return null;
     const xs = [p1.x,p2.x,p3.x,p4.x].sort((a,b)=>a-b);
    const ys = [p1.y,p2.y,p3.y,p4.y].sort((a,b)=>a-b);
    return {x: xs[1], y: ys[1]};
  }
   const xi = ((p1.x*p2.y - p1.y*p2.x)*(p3.x-p4.x) - (p1.x-p2.x)*(p3.x*p4.y - p3.y*p4.x)) / denom;
  const yi = ((p1.x*p2.y - p1.y*p2.x)*(p3.y-p4.y) - (p1.y-p2.y)*(p3.x*p4.y - p3.y*p4.x)) / denom;
  if (between(xi, p1.x, p2.x) && between(xi, p3.x, p4.x) && between(yi, p1.y, p2.y) && between(yi, p3.y, p4.y)) {
    return { x: xi, y: yi };
  }
  return null;
}

let selectedStation = null;

function findStationGroup(node){
    while(node && node !== document && node!== document.body){
        if(node.classList && node.classList.contains('station-group')) return node;
        node = node.parentNode;
    }
    return null;
}

function clearSelectionHighlight(){
    document.querySelectorAll('#board .station-group circle').forEach(c=>{
        c.setAttribute('stroke','#fff');
    });
}


function canAddSegment(start, end){
    const dx = Math.abs(start.x - end.x);
    const dy = Math.abs(start.y - end.y);
    if(!(dx ===0 || dy===0 || dx === dy)){
        showMessage("Segment must be horizontla, vertical, or 45 diagonal");
        return false;
    }

    if(visitedStationsThisRound.has(end.id)){
        showMessage("cannot return to a station already visited this round.");
        return false;
    }

    const pairKey = (a,b) => `${Math.min(a,b)}-${Math.max(a,b)}`;
    const key = pairKey(start.id, end.id);
    if(allSegments.some(s => s.key === key)){
        showMessage("A segment between those stations already exist.");
        return false;
    }

    const steps = Math.max(Math.abs(start.x - end.x),Math.abs(start.y - end.y));
    const sx = (end.x - start.x) / steps;
    const sy = (end.y - start.y) / steps;
    for (let i  = 1; i < steps; i++){
        const cx = start.x + sx * i;
        const cy = start.y + sy * i; 
        const exists = stations.some(s => s.x === cx && s.y ===cy);
        if(exists){
                  showMessage('Segment passes through another station (not allowed).');
        return false;
    }
}
  const newSegGeom = (() => {
    const a = gridToSvgCoords(start.x, start.y);
    const b = gridToSvgCoords(end.x, end.y);
    return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
  })();

  for (const s of allSegments) {
    const sa = gridToSvgCoords(s.a.x, s.a.y);
    const sb = gridToSvgCoords(s.b.x, s.b.y);
    const existing = { x1: sa.x, y1: sa.y, x2: sb.x, y2: sb.y };
    const inter = segmentsIntersect(newSegGeom, existing);
    if (inter) {
      const interIsStation = Number.isInteger(inter.x / CELL - 0) && Number.isInteger(inter.y / CELL - 0) &&
        stations.some(st => {
          const sc = gridToSvgCoords(st.x, st.y);
          return Math.abs(sc.x - inter.x) < 1e-6 && Math.abs(sc.y - inter.y) < 1e-6;
        });
      if (!interIsStation) {
        showMessage('Segment would cross another segment in open space (not allowed).');
        return false;
      }
    }
  }
  return true;
}

function onBoardClick(e){
    const group = findStationGroup(e.target);
    if(!group) return;

    const sx = Number(group.getAttribute('data-x'));
    const sy = Number(group.getAttribute('data-y'));
    const sletter = group.getAttribute('data-letter');
    const sid = group.getAttribute('data-id');

    if(!currentCard){
        showMessage("Draw a card first");
        return;
    }

    if(currentCard !== 'J' && sletter !== '?' && sletter !== currentCard){
    showMessage(`Station ${sletter} doesn't match card ${currentCard}.`);
    return;
    }
if(!selectedStation){
    selectedStation = {x:sx, y:sy, id:sid, element: group};
    const circ = group.querySelector('circle');
    if(circ) circ.setAttribute('stroke' ,'#00ccff');
    showMessage('start selected. now click target stations');
    return;
}

const start = selectedStation;
const end = {x: sx, y:sy, id:sid, element:group};

if(!canAddSegment(start,end)){
    clearSelectionHighlight();
    selectedStation = null;
    return;
}
  drawLineSVG(start, end, lines[currentRoundIndex]?.color ?? '#005CA5');

  // record segment
  const segKey = `${Math.min(start.id, end.id)}-${Math.max(start.id, end.id)}`;
  allSegments.push({ a: start, b: end, key: segKey, round: currentRoundIndex });


  // update railway touches.
  const endStationData = stations.find(st => String(st.id) === String(end.id));
  const startStationData = stations.find(st => String(st.id) === String(start.id));
   [startStationData, endStationData].forEach(st => {
    if (!st) return;
    if (st.train) {
      railwayTouched[st.id] = (railwayTouched[st.id] || 0) + 1;
    }
  });

  // marked stationlines 
  [start.id, end.id].forEach(id => {
    const key = String(id);
    if(!stationLines[key]) stationLines[key] = new Set();
    stationLines[key].add(currentRoundIndex);
  });

  // marking station that's visited 
  visitedStationsThisRound.add(start.id);
  visitedStationsThisRound.add(end.id);

  currentCard = null;
  cardDisplayEl.textContent = '—';
  clearSelectionHighlight();
  selectedStation = null;

  if(isRoundOver()){
    drawCardBtn.disabled = true; 
    showMessage('Round end condition reached. Press next round');
  }
}

// add event listener . 
boardEl.addEventListener('click', onBoardClick);

// draw segments on svg..
function drawLineSVG(start, end, color = '#005CA5'){
    const segG = document.querySelector('#segments');
    if(!segG) return;
    const a = gridToSvgCoords(start.x, start.y);
    const b = gridToSvgCoords(end.x, end.y);
    const line = document.createElementNS(SVG_NS,'line');
  line.setAttribute('x1', String(a.x));
  line.setAttribute('y1', String(a.y));
  line.setAttribute('x2', String(b.x));
  line.setAttribute('y2', String(b.y));
  line.setAttribute('stroke', color);
  line.setAttribute('stroke-width', '8');
  line.setAttribute('stroke-linecap', 'round');
  segG.appendChild(line);
}

function isRoundOver(){
    return cardsThisRound >= MAX_CARDS_PER_ROUND;
}

function drawRandomCard(){
    if(!deck || deck.length ===0) resetDeck();
    return deck.pop();
}

drawCardBtn.addEventListener('click', () => {
    if(isRoundOver()){
        showMessage('Round Already finished(8 cards).');
        return;
    }
    currentCard = drawRandomCard();
    cardDisplayEl.textContent = currentCard;
    cardsThisRound++;
    cardsThisRoundEl.textContent = String(cardsThisRound);

    if(isRoundOver()){
        drawCardBtn.disabled = true;
        showMessage('Reached 8 cards this round. press next round');
    }
});

// round control 
function startNextRound(){
    endRound();
    currentRoundIndex++;
    if(currentRoundIndex >= MAX_ROUNDS){
        calculateFinalScore();
        showScreen('menu');
        return;
    }

    roundSegments = [];
    visitedStationsThisRound = new Set();
    cardsThisRound = 0;
    cardsThisRoundEl.textContent = '0';
     cardDisplayEl.textContent = '-';
  drawCardBtn.disabled = false;
  resetDeck();
  roundIndexEl.textContent = String(currentRoundIndex + 1);
  showMessage(`Round ${currentRoundIndex+1} started.`);
}
  nextRoundBtn.addEventListener('click', ()=>{
    if(!isRoundOver()){
        showMessage("you must draw 8 cards before ending the round");
        return;
    }
        startNextRound();  
  });

  // scoring
  function crossesDanube(seg){
    const aSide = (() => {
        const st = stations.find(s => String(s.id) === String(seg.a.id));
        return st ? st.side : (seg.a.y < 5 ? 'Buda' : 'Pest');
    })();
    const bSide = (() => {
    const st = stations.find(s => String(s.id) === String(seg.b.id));
    return st ? st.side : (seg.b.y < 5 ? 'Buda' : 'Pest');
  })();
  return aSide !== bSide;
  }

  const roundFPs = [];
  function endRound(){
    if(allSegments.length ===0){
        roundFPs.push(0);
        lastRoundScoreEl.textContent = '0';
        return;
    }

    const visited = new Set();
    const segsThisRound = allSegments.filter(s => s.round === currentRoundIndex);
    segsThisRound.forEach(s=>{
        visited.add(String(s.a.id));
        visited.add(String(s.b.id));
    });

    // Pk: distinct points 
   
  // PK: distinct districts
  const districts = new Set();
  const stationsPerDistrict = {};
  visited.forEach(id => {
    const st = stations.find(s => String(s.id) === String(id));
    const d = st && st.district !== undefined ? String(st.district) : 'unknown';
    districts.add(d);
    stationsPerDistrict[d] = (stationsPerDistrict[d] || 0) + 1;
  });
  const PK = districts.size;
  const PM = Object.keys(stationsPerDistrict).length ? Math.max(...Object.values(stationsPerDistrict)) : 0;
  // PD: Danube crossings
  const PD = segsThisRound.reduce((acc, s) => acc + (crossesDanube(s) ? 1 : 0), 0);
  const FP = PK * PM + PD;
  roundFPs.push(FP);
  lastRoundScoreEl.textContent = String(FP);

  // update railway slider UI
  const pp = Object.values(railwayTouched).reduce((sum,val) => sum + (railwayPointsMap[val] || 25), 0);
  railwaySliderEl.textContent = String(pp);
}

// ---------- final score ----------
function calculateFinalScore() {
  // PP (railway)
  const PP = Object.values(railwayTouched).reduce((sum,val) => sum + (railwayPointsMap[val] || 25), 0);

  // junction counts
  let CSP2 = 0, CSP3 = 0, CSP4 = 0;
  Object.values(stationLines).forEach(set => {
    const n = set.size;
    if (n === 2) CSP2++;
    else if (n === 3) CSP3++;
    else if (n >= 4) CSP4++;
  });
  const junctionPoints = 2*CSP2 + 5*CSP3 + 9*CSP4;
  const SumFP = roundFPs.reduce((a,b) => a + b, 0);
  const finalScore = SumFP + PP + junctionPoints;

  // show in UI
  if (finalScoreElWrapper) {
    finalScoreElWrapper.hidden = false;
    finalScoreElWrapper.querySelector('span').textContent = String(finalScore);
  }
  showMessage(`Game finished. Final score: ${finalScore}`, 3000);
  console.log('Final score:', finalScore);
}

// ---------- initialization ----------
(async function init() {
  try {
    const data = await loadData();
    stations = data.stations;
    lines = data.lines;
    renderBoard(stations);
    resetDeck();

    // wire start button
    startBtn.addEventListener('click', () => {
      const input = document.querySelector('#playerName').value.trim();
      if (!input) {
        showMessage('Enter your name first.');
        return;
      }
      playerDisplay.textContent = input;
      // prepare round 1
      currentRoundIndex = 0;
      roundIndexEl.textContent = String(currentRoundIndex + 1);
      visitedStationsThisRound = new Set();
      cardsThisRound = 0;
      cardsThisRoundEl.textContent = '0';
      cardDisplayEl.textContent = '-';
      drawCardBtn.disabled = false;
      allSegments = [];
      for (const k in stationLines) delete stationLines[k];
      for (const k in railwayTouched) delete railwayTouched[k];
      // showScreen('game');
      // showMessage('Game started! Draw your first card.');
   showScreen('game');
  startTimer();
  showMessage('Game started! Draw your first card.');

    });

    // board click is already wired above; ensure it remains
    boardEl.addEventListener('click', onBoardClick);

  } catch (err) {
    console.error('Initialization error', err);
    showMessage('Failed to load game data. Check console.');
  }
})();
