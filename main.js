import "./reset.css";
import "./style.css";

const gridSize = 21;
const playBoardElement = document.querySelector(".play-board");

let food = { xFoodPosition: null, yFoodPosition: null };
let snake = {
  xSnakePosition: null,
  ySnakePosition: null,
  xSnakeVelocity: 1,
  ySnakeVelocity: 0,
};

startGame();

function startGame() {
  initSnake();
  displayFood();
  document.addEventListener("keydown", handleKeyPress);
  setInterval(moveSnake, 200);
}

function displayFood() {
  const randomGridCoordinates = geRandomGridCoordinates(gridSize);
  food.xFoodPosition = randomGridCoordinates.randomXPosition;
  food.yFoodPosition = randomGridCoordinates.randomYPosition;

  const foodElement = document.createElement("div");
  foodElement.classList.add("play-board__food");
  foodElement.style.gridArea = `${food.yFoodPosition}/${food.xFoodPosition}`;

  playBoardElement.appendChild(foodElement);
}

function initSnake() {
  const snakeElement = document.createElement("div");
  snakeElement.classList.add("play-board__snake");

  const randomGridCoordinates = geRandomGridCoordinates(gridSize);
  snake.xSnakePosition = randomGridCoordinates.randomXPosition;
  snake.ySnakePosition = randomGridCoordinates.randomYPosition;

  snakeElement.style.gridArea = `${snake.ySnakePosition}/${snake.xSnakePosition}`;

  playBoardElement.appendChild(snakeElement);
}

function moveSnake() {
  const snakeElement = document.querySelector(".play-board__snake");

  snake.xSnakePosition += snake.xSnakeVelocity;
  snake.ySnakePosition += snake.ySnakeVelocity;

  snakeElement.style.gridArea = `${snake.ySnakePosition}/${snake.xSnakePosition}`;
}

function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowUp":
      snake.ySnakeVelocity = -1;
      snake.xSnakeVelocity = 0;
      break;
    case "ArrowDown":
      snake.ySnakeVelocity = 1;
      snake.xSnakeVelocity = 0;
      break;
    case "ArrowLeft":
      snake.xSnakeVelocity = -1;
      snake.ySnakeVelocity = 0;
      break;
    case "ArrowRight":
      snake.xSnakeVelocity = 1;
      snake.ySnakeVelocity = 0;
      break;
  }
}

function geRandomGridCoordinates(gridSize) {
  const xPosition = Math.floor(Math.random() * gridSize) + 1;
  console.log(xPosition);

  const yPosition = Math.floor(Math.random() * gridSize) + 1;
  console.log(yPosition);

  const randomGridCoordinates = {
    randomXPosition: xPosition,
    randomYPosition: yPosition,
  };

  return randomGridCoordinates;
}
