import "./reset.css";
import "./style.css";

const gridSize = 21;
const playBoardElement = document.querySelector(".play-board");

let food = { xFoodPosition: null, yFoodPosition: null };
let snake = { xSnakePosition: null, ySnakePosition: null };

startGame();

function startGame() {
  displayFood();
  displaySnake();
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

function displaySnake() {
  const randomGridCoordinates = geRandomGridCoordinates(gridSize);
  snake.xSnakePosition = randomGridCoordinates.randomXPosition;
  snake.ySnakePosition = randomGridCoordinates.randomYPosition;

  const snakeElement = document.createElement("div");
  snakeElement.classList.add("play-board__snake");
  snakeElement.style.gridArea = `${snake.ySnakePosition}/${snake.xSnakePosition}`;

  playBoardElement.appendChild(snakeElement);
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
