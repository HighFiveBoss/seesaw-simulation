let objects = [];
let angleCurrent = 0;
let angleTarget = 0;
let leftWeight = 0;
let rightWeight = 0;

const plank = document.querySelector(".plank");
const weightsLayer = document.querySelector(".plank .weights");
const leftWeightStat = document.getElementById("left-weight");
const rightWeightStat = document.getElementById("right-weight");

plank.addEventListener("click", function (event) {
  const middlePlank = (
    plank.getBoundingClientRect().left +
    plank.offsetWidth / 2
  ).toFixed(0);
  const clickPosition = event.clientX;
  let randomWeight = Math.floor(Math.random() * 10) + 1; // Random weight between 1 and 10 KG

  if (event.clientX < middlePlank) {
    addObject(randomWeight, clickPosition - plank.getBoundingClientRect().left);
  } else {
    addObject(randomWeight, clickPosition - plank.getBoundingClientRect().left);
  }
});

function addObject(weight, position) {
  objects.push({ weight: weight, position: position });
  const objDiv = document.createElement("div");
  objDiv.classList.add("object");
  objDiv.style.left = position + "px";
  objDiv.style.width = weight * 10 + "px";
  objDiv.style.height = weight * 10 + "px";
  objDiv.textContent = weight + " KG";
  weightsLayer.appendChild(objDiv);
  updateSeesaw();
}

function updateSeesaw() {
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
  angleTarget = Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 10));
  leftWeightStat.textContent = leftWeight + " KG";
  rightWeightStat.textContent = rightWeight + " KG";
  loop();
}

function loop() {
  angleCurrent += (angleTarget - angleCurrent) * 0.1;

  plank.style.setProperty("--angle", angleCurrent + "deg");
  
  requestAnimationFrame(loop);
}
