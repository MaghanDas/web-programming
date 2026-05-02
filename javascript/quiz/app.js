
// loading data functin
async function loadData() {
    // fetch stations and lines.
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
let currentCard = null;
let cardsThisRound = 0;
// dom elements.
const drawCardBtn = document.getElementById("drawCardBtn");
const cardDisplay = document.getElementById("cardDisplay");
const cardsThisRoundEl = document.getElementById("cardsThisRound");

const deck = ["A", "B", "C", "D", "A", "B", "J", "C", "D", "J"];
// function to draw a card
function drawRandomCard(){
    return deck[Math.floor(Math.random() * deck.length)];
 } 

 // handl card drawing.
 drawCardBtn.addEventListener("click", () => {
    if(cardsThisRound >= 8) {
        alert("you have already drawn 8 cards. press <next round> to continue");
        return;
    }
    currentCard = drawRandomCard();
    cardDisplay.textContent = currentCard;
    cardsThisRound++;
    cardsThisRoundEl.textContent = cardsThisRound;
 });



// __ SVG BOARD RENDERING. 
const SVG_NS = "http://www.w3.org/2000/svg";
const GRID_CELLS = 10;
const BOARD_SIZE = 1000;
const CELL = BOARD_SIZE / GRID_CELLS;

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

// helper: find station-group by walking up DOM
function findStationGroup(node){
    while(node && node !== document && node !== document.body) {
        if(node.classList && node.classList.contains("station-group")) return node;
        node = node.parentNode;
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
 document.getElementById("cardDisplay").textContent= "-";

 cardsThisRound++;
 document.getElementById('cardsThisRound').textContent = String(cardsThisRound);

 clearSelectionHighlight();
selectedStation = null;
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



// station cllicking and line drawing.
// let selectedStation = null;

// function enableStationClicking(stations) {
//   const svg = document.getElementById("board");

//   // attaching click listerner to svg elements.
//   svg.querySelectorAll("circle").forEach((circle, index) => {
//     circle.style.cursor = "pointer";

//     circle.addEventListener("click", () => {
//       const station = stations[index];

//       if (selectedStation) {
//         console.log(
//           `Trying to connect: ${selectedStation.type} -> ${station.type}`
//         );

//         // basic visual feedback
//         circle.setAttribute("fill", "orange");

//         // Todo: once we add validation and drawing : drawsegment(selectedstation,stations);

//         selectedStation = null;
//       } else {
//         // first clicking- selecting this station
//         selectedStation = station;
//         circle.setAttribute("fill", "red");
//         console.log(
//           `selected station: ${station.type} at (${station.x}, ${stations.y})`
//         );
//       }
//     });
//   });
// }

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
})();

