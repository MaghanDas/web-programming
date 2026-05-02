

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

// loading data functin
async function loadData() {
    const [stationsRes, linesRes] = await Promise.all([
        fetch("stations.json"),
        fetch("lines.json")
    ]);
    const stations = await stationsRes.json();
    const lines = await linesRes.json();
    return {stations , lines};
}


function showScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => { screen.classList.add("hidden"); 
  });
  document.getElementById(id).classList.remove("hidden");
}


// game -state : 

// __ SVG BOARD RENDERING. 
const SVG_NS = "http://www.w3.org/2000/svg";
const GRID_CELLS = 10;
const BOARD_SIZE = 1000;
const CELL = BOARD_SIZE / GRID_CELLS;


let currentCard = null;
let cardsThisRound = 0;
// dom elements.
const drawCardBtn = document.getElementById("drawCardBtn");
const cardDisplay = document.getElementById("cardDisplay");
const cardsThisRoundEl = document.getElementById("cardsThisRound");

const deck = ["A", "B", "C", "D", "A", "B", "J", "C", "D", "J"];

// game scores variables.
let currentRound = 1;
const MAX_ROUNDS = 4;
let roundSegments = [];
let cardCountsByType = {A: 0, B: 0, C: 0, D:0, J: 0};
let railwayStationsTouched = {};
let roundScores = [];
let stationLines = {};

// function to draw a card
function drawRandomCard(){
    return deck[Math.floor(Math.random() * deck.length)];
 } 

 // handl card drawing.
 drawCardBtn.addEventListener("click", () => {
    if(isRoundOver()) {
        drawCardBtn.disabled = true;
        return;
    }

    currentCard = drawRandomCard();
    cardDisplay.textContent = currentCard;

    cardCountsByType[currentCard] = (cardCountsByType[currentCard] || 0) + 1;

    cardsThisRound++;
    cardsThisRoundEl.textContent = cardsThisRound;

    // checks if the round should end after this draw.
    if(isRoundOver()){
        drawCardBtn.disabled = true;
    }
 });
 function isRoundOver(){
    return cardsThisRound >= 8 || Object.values(cardCountsByType).some(v => v >= 5);

 }


function renderBoard(stations) {
  const svg = document.getElementById("board");
  svg.innerHTML = " ";

  // groups for z-ordering: segments under stations.
  const segmentsG = document.createElementNS(SVG_NS, "g");
  segmentsG.setAttribute("id", "segments");
  svg.appendChild(segmentsG);

  const stationsG = document.createElementNS(SVG_NS, "g");
  stationsG.setAttribute("id", "stations");
  svg.appendChild(stationsG);

  stations.forEach((st, idx) => {
    const gx = st.x * CELL + CELL / 2;
    const gy = st.y * CELL + CELL / 2;

    const g = document.createElementNS(SVG_NS, "g");
    g.classList.add("station-group");
    g.setAttribute("data-x", String(st.x));
    g.setAttribute("data-y", String(st.y));
    g.setAttribute("data-letter", String(st.type));
    g.setAttribute("data-id", String(st.id ?? idx));

    // circle
    const circle = document.createElementNS(SVG_NS, "circle");
    circle.classList.add("station");
    circle.setAttribute("cx", String(gx));
    circle.setAttribute("cy", String(gy));
    circle.setAttribute("r", "14");
    circle.setAttribute("fill", "#111");
    circle.setAttribute("stroke", "#fff");
    circle.setAttribute("stroke-width", "2");
circle.setAttribute("pointer-events", "all");
    // adding letters on top
    const label = document.createElementNS(SVG_NS, "text");
    label.setAttribute("x", String(gx));
    label.setAttribute("y", String(gy + 5));
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "12");
    label.setAttribute("fill", "#fff");
    label.textContent = st.type === "?" ? "J" : st.type;

    g.appendChild(circle);
    g.appendChild(label);
    stationsG.appendChild(g);
  });
    console.log(`renderBoard: rendered ${stations.length} stations`);
}

function startNextRound(){
    if(currentRound < MAX_ROUNDS){ 
        currentRound++;
    }
    else {
    // game over after MAX_ROUNDS
    calculateFinalScore();
    showScreen("gameOver");
    return
}
    cardsThisRound = 0;
    cardsThisRoundEl.textContent = cardsThisRound;
    currentCard = null;
    cardDisplay.textContent = "-";
    cardCountsByType = {A:0, B:0,C:0,D:0,J:0};
    roundSegments = [];
    document.getElementById("roundIndex").textContent = currentRound;
    drawCardBtn.disabled = false;
    shuffleDeck();
    console.log(`started round $P{currentRound}`);
}

function findStationGroup(node){
    while(node && node != document && node != document.body){
        if(node.classList && node.classList.contains("station-group")) return node;
        node  = node.parentNode;
    }
    return null;
}


// station click and line drawing.
let selectedStation  = null;

function onStationClick(e) {
    const group = findStationGroup(e.target);
    if(!group) return;

    console.log("onStationClick: clicked node",e.target.nodeName, "group: ", group);


  const sx = Number(group.getAttribute("data-x"));
  const sy = Number(group.getAttribute("data-y"));
  const sletter = group.getAttribute("data-letter");
  const sid = group.getAttribute("data-id");
 
  if (!currentCard) {
    alert("please draw a card first");
    return;
  }
  if (currentCard !== "J" && sletter !== "?" && sletter !== currentCard) {
    alert(
      `station letter "${sletter}" doesn't match current card "${currentCard}".`
    );
    return;
  }

  // if no selected station yet, pick this as start.
  if(!selectedStation){
    selectedStation={x: sx, y: sy, id: sid, element: group };
    const circ = group.querySelector('circle');
    if(circ) circ.setAttribute('stroke', '#00ccff');
    console.log("selected start station: ", selectedStation);
    return;
  }

  const start = selectedStation;
  const end = {x: sx, y:sy, id: sid, element: group };

  // validate geometru : straight or 45-diagonal 
  const dx = Math.abs(start.x - end.x);
  const dy = Math.abs(start.y - end.y);
  const straightOrDiag = dx ===0 || dy ===0 || dx === dy;

 if(!straightOrDiag){
    alert('segments must be horizontal, vertical , or 45 diagonal');
    clearSelectionHighlight();
    selectedStation = null;
    return;
 }

 // draw the segment on the svg
 drawLineSVG(start, end);
 roundSegments.push({start, end, card: currentCard});
 [start, end ].forEach(s => {
    if(!railwayStationsTouched[s.id]) railwayStationsTouched[s.id] = 0;
    railwayStationsTouched[s.id]++;
 });

 // track line per station for junction calculation
 [start, end ].forEach(s =>{
    if(!stationLines[s.id]) stationLines[s.id] = [];
    if(!stationLines[s.id].includes(currentRound)) stationLines[s.id].push(currentRound);
 });

//  document.getElementById("cardDisplay").textContent= "-";
currentCard = null;
cardDisplay.textContent = "-";
//  cardsThisRound++;
//  document.getElementById('cardsThisRound').textContent = String(cardsThisRound);

 clearSelectionHighlight();
selectedStation = null;

if(isRoundOver()){
    drawCardBtn.disabled = true;
}
}

function endRound() {

    let FP = 0;
    if(roundSegments.length > 0){
    let districts = new Set();
    let stationCountByDistrict = {};
// assume stations have 'district' property
    roundSegments.forEach(seg => {
        [seg.start,seg.end].forEach(s => {
            const st = document.querySelector(`.station-group[data-id='${s.id}']`);
            const district  = st?.dataset.district ?? 'unknown';
            districts.add(district);
            if(!stationCountByDistrict[district]) stationCountByDistrict[district] = 0;
            stationCountByDistrict[district]++;
        });
    });

    const PK = districts.size;
    const PM = Math.max(0,...Object.values(stationCountByDistrict));
    const PD = roundSegments.filter(seg => crossesDanube(seg)).length;
    const FP = (PK * PM) + PD; 
}
    roundScores.push(FP);

    // update-Dom
    document.getElementById("lastRoundScore").textContent = FP;
    // railway slider poinits.
    const pp = Object.values(railwayStationsTouched).reduce((sum,val)=>{
        const pointsMap = [0,1,2,4,6,8,11,14,17,21,25];
        return sum+ (pointsMap[val] || 25);
    }, 0);
    document.getElementById("railwaySlider").textContent = pp;
    console.log(`Round ${currentRound} ended. Score: ${FP}`);

}

function crossesDanube(seg){
    return (seg.start.y < 5 && seg.end.y > 5) || (seg.start.y > 5 && seg.end.y < 5);
}

function shuffleDeck(){
    deck.sort(() => Math.random() - 0.5);
}
function calculateFinalScore(){
    // railway points 
    const pp = Object.values(railwayStationsTouched).reduce((sum, val) => {
        const pointsMap = [0,1,2,4,6,8,11,14,17,21,25];
        return sum + (pointsMap[val] || 25);
    }, 0);

    // junction points
    let CSP2 = 0, CSP3=0,CSP4 =0;
    Object.values(stationLines).forEach(lines => {
        if(lines.length === 2 )CSP2++;
        else if(lines.length===3)CSP3++;
        else if(lines.length===4)CSP4++;
    });

    const junctionPoints = 2*CSP2 + 5*CSP3 + 9*CSP4;
    const SumFP = roundScores.reduce((a,b)=>a+b,0);

    const finalScore = SumFP + PP + junctionPoints;
    // alert(`Game Over! Final score: ${finalScore}`);
    const finalScoreEl = document.querySelector(".final-score");
    if(finalScoreEl){
    finalScoreEl.hidden = false;
    finalScoreEl.querySelector("span").textContent = finalScore;
    }
    console.log(`Final score: ${finalScore}`);
}

function clearSelectionHighlight(){
    document.querySelectorAll('#board .station-group circle').forEach((c) => {
    c.setAttribute('stroke', '#fff');    
    });
}

function drawLineSVG(start,end,color = '#005CA5') {
    const segmentsG = document.getElementById('segments');
    if(!segmentsG) return;

    const x1 = start.x * CELL + CELL / 2;
     const y1 = start.y * CELL + CELL / 2;
    const x2 = end.x * CELL + CELL / 2;
    const y2 = end.y * CELL + CELL / 2;

    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', String(x1));
    line.setAttribute('y1', String(y1));
    line.setAttribute('x2', String(x2));
    line.setAttribute('y2', String(y2));
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '8');
    line.setAttribute('stroke-linecap', 'round' );

    segmentsG.appendChild(line);
      console.log(`drawLineSVG: ${start.x},${start.y} -> ${end.x},${end.y}`);


}
// plaeceholder: define move rules
function isValidMove(start, end) {
  const dx = Math.abs(start.x - end.x);
  const dy = Math.abs(start.y - end.y);
  return dx === 0 || dy === 0 || dx === dy;
}

// initializing the app .
(async function init() {
  const { stations, lines } = await loadData();

  console.log("Stations loaded: ", stations);
  console.log("Lines loaded: ", lines);
  renderBoard(stations);
  document.getElementById("board").addEventListener("click",onStationClick);
//   enableStationClicking(stations);

  // start button handler
  document.getElementById("startBtn").addEventListener("click", () => {
    const playerName = document.getElementById("playerName").value.trim();
    if (!playerName) {
      alert("Please enter your name before starting the game. ");
      return;
    }
    document.getElementById("playerDisplay").textContent = playerName;
    showScreen("game");
  });

document.getElementById("nextRoundBtn").addEventListener("click", () => {
    if(isRoundOver()){
        endRound();
        startNextRound();
    } else {
        alert("please finish using all your cards before ending the round");
    }
});
})();

