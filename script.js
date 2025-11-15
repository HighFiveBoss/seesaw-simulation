let objects = [];
let angleCurrent = 0;
let angleTarget = 0;
let leftWeight = 0;
let rightWeight = 0;
let nextWeight = Math.floor(Math.random() * 10) + 1;
let log = [];

const MIN_SIZE = 30;
const MAX_SIZE = 70;
const MAX_ANGLE = 30;
const TORQUE_DIVIDER = 10;

const plank = document.querySelector(".plank");
const weightsLayer = document.querySelector(".plank .weights");
const leftWeightStat = document.getElementById("left-weight");
const rightWeightStat = document.getElementById("right-weight");
const nextWeightStat = document.getElementById("next-weight");
const tiltAngleStat = document.getElementById("tilt-angle");
const logBox = document.getElementById("log-box");
nextWeightStat.textContent = nextWeight + " KG";

plank.addEventListener("click", function (event) {
  const rect = plank.getBoundingClientRect();
  const middlePlank = Math.floor(plank.offsetWidth / 2);
  const clickPosition = event.clientX;
  let position = Math.floor(clickPosition - rect.left);
  if (event.clientX < middlePlank) {
    log.push(
      nextWeight + " kg dropped on left side at " + (position - middlePlank)
    );
    addObject(nextWeight, position);
  } else {
    log.push(
      nextWeight + " kg dropped on right side at " + (position - middlePlank)
    );
    addObject(nextWeight, position);
  }
  nextWeight = Math.floor(Math.random() * 10) + 1;
  nextWeightStat.textContent = nextWeight + " KG";

  const message = log[log.length - 1];
  const entry = document.createElement("div");
  entry.textContent = message;

  logBox.insertBefore(entry, logBox.firstChild);
  while (logBox.childNodes.length > 5) {
    logBox.removeChild(logBox.lastChild);
  }
  logBox.scrollTop = 0;
});

function addObject(weight, position, renderOnly = false) {
  if (!renderOnly) {
    objects.push({ weight: weight, position: position });
  }

  const objDiv = document.createElement("div");
  objDiv.classList.add("object");
  objDiv.style.left = position + "px";
  const scaledWeight = MIN_SIZE + ((weight - 1) / 9) * (MAX_SIZE - MIN_SIZE);
  objDiv.style.width = scaledWeight + "px";
  objDiv.style.height = scaledWeight + "px";
  objDiv.textContent = weight + " KG";
  weightsLayer.appendChild(objDiv);

  if (!renderOnly) updateSeesaw();
}

function updateSeesaw(save = true) {
  let leftTorque = 0;
  let rightTorque = 0;
  leftWeight = 0;
  rightWeight = 0;
  const middlePlank = plank.offsetWidth / 2;

  objects.forEach((obj) => {
    const distanceFromCenter = obj.position - middlePlank;
    if (distanceFromCenter < 0) {
      leftTorque += obj.weight * Math.abs(distanceFromCenter);
      leftWeight += obj.weight;
    } else {
      rightTorque += obj.weight * Math.abs(distanceFromCenter);
      rightWeight += obj.weight;
    }
  });
  angleTarget = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, (rightTorque - leftTorque) / TORQUE_DIVIDER));
  leftWeightStat.textContent = leftWeight + " KG";
  rightWeightStat.textContent = rightWeight + " KG";
  tiltAngleStat.textContent = angleTarget.toFixed(1) + "°";

  if (save) {
    localStorage.setItem("seesawState", JSON.stringify(objects));
    localStorage.setItem("seesawLog", JSON.stringify(log));
  }
}

function loop() {
  angleCurrent += (angleTarget - angleCurrent) * 0.1;

  plank.style.setProperty("--angle", angleCurrent + "deg");

  requestAnimationFrame(loop);
}
loop();

const saved = localStorage.getItem("seesawState");
const savedLog = localStorage.getItem("seesawLog");

if (saved) {
  const savedObjects = JSON.parse(saved);
  savedObjects.forEach((obj) => addObject(obj.weight, obj.position, true));
  objects = savedObjects;
  updateSeesaw(false);
}

if (savedLog) {
  log = JSON.parse(savedLog);
  logBox.innerHTML = "";
  log.forEach((message) => {
    const entry = document.createElement("div");
    entry.textContent = message;
    logBox.insertBefore(entry, logBox.firstChild);
  });
  logBox.scrollTop = 0;
}

document.getElementById("reset").addEventListener("click", function () {
  objects = [];
  weightsLayer.innerHTML = "";
  angleTarget = 0;
  log = [];
  logBox.innerHTML = "";
  localStorage.removeItem("seesawState");
  localStorage.removeItem("seesawLog");
  updateSeesaw();
});
