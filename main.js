import "./reset.css";
import "./style.css";

const gridSize = 21;
const playBoardElement = document.querySelector(".play-board");

let food = { xFoodPosition: null, yFoodPosition: null };
let snake = { xSnakePosition: null, ySnakePosition: null };

startGame();

function startGame() {
  displayFood();
  displayAndMoveSnake();
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

function displayAndMoveSnake() {
  const snakeElement = document.createElement("div");
  snakeElement.classList.add("play-board__snake");

  if (snake.xSnakePosition === null && snake.ySnakePosition === null) {
    const randomGridCoordinates = geRandomGridCoordinates(gridSize);
    snake.xSnakePosition = randomGridCoordinates.randomXPosition;
    snake.ySnakePosition = randomGridCoordinates.randomYPosition;

    snakeElement.style.gridArea = `${snake.ySnakePosition}/${snake.xSnakePosition}`;

    playBoardElement.appendChild(snakeElement);
  }

  document.addEventListener("keydown", (event) => {
    console.log(event);
    if (event.key === "ArrowUp") {
      snake.ySnakePosition--;
      snakeElement.style.gridArea = `${snake.ySnakePosition}/${snake.xSnakePosition}`;
    }
    if (event.key === "ArrowRight") {
      snake.xSnakePosition++;
      snakeElement.style.gridArea = `${snake.ySnakePosition}/${snake.xSnakePosition}`;
    }
    if (event.key === "ArrowDown") {
      snake.ySnakePosition++;
      snakeElement.style.gridArea = `${snake.ySnakePosition}/${snake.xSnakePosition}`;
    }
    if (event.key === "ArrowLeft") {
      snake.xSnakePosition--;
      snakeElement.style.gridArea = `${snake.ySnakePosition}/${snake.xSnakePosition}`;
    }
  });
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
