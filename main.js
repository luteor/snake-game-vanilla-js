import "./reset.css";
import "./style.css";

const gridSize = 19;
const playBoardElement = document.querySelector(".play-board");

let food = { xFoodPosition: null, yFoodPosition: null };
let snake = {
  xSnakePosition: null,
  ySnakePosition: null,
  xSnakeVelocity: 1,
  ySnakeVelocity: 0,
  body: [],
};
let score = 0;

startGame();

function startGame() {
  displayFood();
  initSnake();
  document.addEventListener("keydown", handleKeyPress);
  setInterval(moveSnake, 150);
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
  const snakeHeadElement = document.createElement("div");
  snakeHeadElement.classList.add("play-board__snake");

  const randomGridCoordinates = geRandomGridCoordinates(gridSize);
  snake.xSnakePosition = randomGridCoordinates.randomXPosition;
  snake.ySnakePosition = randomGridCoordinates.randomYPosition;

  snakeHeadElement.style.gridArea = `${snake.ySnakePosition}/${snake.xSnakePosition}`;

  playBoardElement.appendChild(snakeHeadElement);
}

function moveSnake() {
  const snakeElement = document.querySelectorAll(".play-board__snake");
  snakeElement.forEach((element) => {
    element.remove();
  });

  snake.xSnakePosition += snake.xSnakeVelocity;
  snake.ySnakePosition += snake.ySnakeVelocity;

  if (
    snake.xSnakePosition === food.xFoodPosition &&
    snake.ySnakePosition === food.yFoodPosition
  ) {
    snakeEats();
  }

  for (let i = snake.body.length - 1; i > 0; i--) {
    snake.body[i] = [...snake.body[i - 1]];
  }

  snake.body[0] = [snake.xSnakePosition, snake.ySnakePosition];

  for (let i = 0; i < snake.body.length; i++) {
    const snakeBodyElement = document.createElement("div");
    snakeBodyElement.classList.add("play-board__snake");
    snakeBodyElement.style.gridArea = `${snake.body[i][1]}/${snake.body[i][0]}`;
    playBoardElement.appendChild(snakeBodyElement);
  }
}

function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowUp":
      snake.xSnakeVelocity = 0;
      snake.ySnakeVelocity = -1;
      break;
    case "ArrowDown":
      snake.xSnakeVelocity = 0;
      snake.ySnakeVelocity = 1;
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

function snakeEats() {
  document.querySelector(".play-board__food").remove();
  score++;
  const scoreElement = document.querySelector(".game-details__score");
  scoreElement.textContent = `Score:${score}`;

  snake.body.push([food.xFoodPosition, food.yFoodPosition]);

  displayFood();
}
