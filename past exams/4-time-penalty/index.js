// Selected elements
const ulContestants = document.querySelector("ul#contestants");
const divEditor = document.querySelector("#contestant-editor");
const btnNew = document.querySelector("#btnNew");
const inputNew = document.querySelector("#inputNew");

// Data
let contestants = {
  "1": {
    id: "1",
    name: "Contestant 1",
    penalties: [
      { timestamp: Date.now(), duration: 60000 },
      { timestamp: Date.now() - 2000, duration: 10000 },
      { timestamp: Date.now() - 10000, duration: 30000 },
    ],
  },
  "2": {
    id: "2",
    name: "Contestant 2",
    penalties: [
      { timestamp: Date.now(), duration: 10000 },
      { timestamp: Date.now() - 5000, duration: 10000 },
      { timestamp: Date.now() - 30000, duration: 30000 },
    ],
  },
};
let selectedContestantId = null;

// ========= Solution =========
// ================================
// a. Display list of contestants
// b. Display remaining cumulative penalty time and apply 'penalty' class
// ================================
function renderContestantList() {
  ulContestants.innerHTML = ""; // clear previous list
  const now = Date.now();

  Object.values(contestants).forEach(contestant => {
    const li = document.createElement("li");
    li.dataset.id = contestant.id;

    // calculate remaining cumulative penalty (b)
    const remainingMsArray = contestant.penalties
      .map(p => (p.timestamp + p.duration) - now)
      .filter(ms => ms > 0);

    const remainingSeconds = remainingMsArray.reduce((sum, ms) => sum + ms, 0) / 1000;

    li.innerHTML = `${contestant.name} <span>${Math.round(remainingSeconds)}s</span>`;

    if (remainingSeconds > 0) {
      li.classList.add("penalty");
    } else {
      li.classList.remove("penalty");
    }

    ulContestants.appendChild(li);
  });
}

// ================================
// c. Click on contestant to show details panel
// d. Display selected contestant's penalties in the details panel
// ================================
function renderContestantDetails() {
  if (!selectedContestantId) return;
  const contestant = contestants[selectedContestantId];
  if (!contestant) return;

  // show editor
  divEditor.hidden = false;
  divEditor.querySelector("h2").textContent = contestant.name;

  const ulPenalties = divEditor.querySelector("ul");
  ulPenalties.innerHTML = "";

  const now = Date.now();

  contestant.penalties.forEach(p => {
    const li = document.createElement("li");

    const endTime = p.timestamp + p.duration;
    const remaining = Math.max(0, endTime - now);
    const remainingSeconds = Math.round(remaining / 1000);

    li.innerHTML = `
      ${new Date(p.timestamp).toLocaleString()} + ${Math.round(p.duration / 1000)}s
      <progress max="${p.duration}" value="${remaining}"></progress>
      (${remainingSeconds}s)
    `;
    ulPenalties.appendChild(li);
  });
}

// ================================
// e. Add new penalty using buttons in editor
// ================================
divEditor.querySelectorAll("button[data-duration]").forEach(button => {
  button.addEventListener("click", () => {
    if (!selectedContestantId) return;

    const durationMs = Number(button.dataset.duration) * 1000;

    contestants[selectedContestantId].penalties.push({
      timestamp: Date.now(),
      duration: durationMs
    });

    saveContestants();
    renderContestantList();
    renderContestantDetails();
  });
});

// ================================
// f. Add new contestant
// ================================
btnNew.addEventListener("click", () => {
  const name = inputNew.value.trim();
  if (!name) return;

  const newId = Date.now().toString(); // unique id using timestamp
  contestants[newId] = {
    id: newId,
    name: name,
    penalties: []
  };

  inputNew.value = "";
  saveContestants();
  renderContestantList();
});

// ================================
// g. Click on contestant in list to show details
// ================================
ulContestants.addEventListener("click", e => {
  const li = e.target.closest("li");
  if (!li) return;

  selectedContestantId = li.dataset.id;
  renderContestantDetails();
});

// ================================
// g. Refresh the list and details every second
// ================================
setInterval(() => {
  renderContestantList();
  renderContestantDetails();
}, 1000);

// ================================
// Initial render
// ================================
renderContestantList();