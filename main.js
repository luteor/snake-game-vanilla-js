import "./reset.css";
import "./style.css";

const gridSize = 21;

const playBoardElement = document.querySelector(".play-board");

startGame();

function startGame() {
  displayFood();
}

function displayFood() {
  const randomGridCoordinates = geRandomGridCoordinates(gridSize);

  const foodElement = document.createElement("div");
  foodElement.classList.add("play-board__food");
  foodElement.style.gridArea = `${randomGridCoordinates[1]}/${randomGridCoordinates[0]}`;

  playBoardElement.appendChild(foodElement);
}

function geRandomGridCoordinates(gridSize) {
  const xPosition = Math.floor(Math.random() * gridSize) + 1;
  console.log(xPosition);

  const yPosition = Math.floor(Math.random() * gridSize) + 1;
  console.log(yPosition);

  const randomGridCoordinates = [xPosition, yPosition];

  return randomGridCoordinates;
}
