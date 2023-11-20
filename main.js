import "./reset.css";
import "./style.css";

const gridSize = 30;
const playBoardElement = document.querySelector(".play-board");
const gameControlsELements = document.querySelectorAll(".game-controls button");
console.log(gameControlsELements);

let food = { xFoodPosition: null, yFoodPosition: null };
let snake = {
  xSnakePosition: 5,
  ySnakePosition: 15,
  xSnakeVelocity: 1,
  ySnakeVelocity: 0,
  body: [],
};
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let setIntervalId;

startGame();

function startGame() {
  displayScore();
  displayHighScore();
  displayFood();
  initSnake();

  gameControlsELements.forEach((control) => {
    control.addEventListener("click", () =>
      handleKeyPress({ key: control.dataset.control })
    );
  });

  document.addEventListener("keydown", handleKeyPress);

  if (setIntervalId) {
    clearInterval(setIntervalId);
  }

  setTimeout(() => {
    setIntervalId = setInterval(moveSnake, 100);
  }, 2000);
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

  snakeHeadElement.style.gridArea = `${snake.ySnakePosition}/${snake.xSnakePosition}`;

  playBoardElement.appendChild(snakeHeadElement);
}

function moveSnake() {
  // Remove all existing snake elements from the play board
  const snakeElements = document.querySelectorAll(".play-board__snake");
  snakeElements.forEach((element) => {
    element.remove();
  });

  if (
    snake.xSnakePosition <= 1 ||
    snake.xSnakePosition >= gridSize ||
    snake.ySnakePosition <= 1 ||
    snake.ySnakePosition >= gridSize
  ) {
    alert("Game Over!The snake hit the wall!");
    resetGame();
    return;
  }

  // Update the snake's head position based on its velocity
  snake.xSnakePosition += snake.xSnakeVelocity;
  snake.ySnakePosition += snake.ySnakeVelocity;

  // Check if the snake has collided with the food
  if (
    snake.xSnakePosition === food.xFoodPosition &&
    snake.ySnakePosition === food.yFoodPosition
  ) {
    // If so, handle the snake eating the food
    snakeEats();
  }

  // Move each segment of the snake's body to the position of the segment in front of it
  for (let i = snake.body.length - 1; i > 0; i--) {
    snake.body[i] = [...snake.body[i - 1]];
  }

  // Update the position of the snake's head in its body array
  snake.body[0] = [snake.xSnakePosition, snake.ySnakePosition];

  // Create new elements for each segment of the snake's body and append them to the play board
  for (let i = 0; i < snake.body.length; i++) {
    if (
      i !== 0 &&
      snake.body[0][1] === snake.body[i][1] &&
      snake.body[0][0] === snake.body[i][0]
    ) {
      alert("Game Over! The snake ate its own tail!");
      resetGame();
      return;
    }
    const snakeBodyElement = document.createElement("div");
    snakeBodyElement.classList.add("play-board__snake");
    snakeBodyElement.style.gridArea = `${snake.body[i][1]}/${snake.body[i][0]}`;
    playBoardElement.appendChild(snakeBodyElement);
  }
}

function handleKeyPress(event) {
  if (event.key === "ArrowUp" && snake.ySnakeVelocity !== 1) {
    snake.xSnakeVelocity = 0;
    snake.ySnakeVelocity = -1;
  } else if (event.key === "ArrowDown" && snake.ySnakeVelocity !== -1) {
    snake.xSnakeVelocity = 0;
    snake.ySnakeVelocity = 1;
  } else if (event.key === "ArrowLeft" && snake.xSnakeVelocity !== 1) {
    snake.xSnakeVelocity = -1;
    snake.ySnakeVelocity = 0;
  } else if (event.key === "ArrowRight" && snake.xSnakeVelocity !== -1) {
    snake.xSnakeVelocity = 1;
    snake.ySnakeVelocity = 0;
  }
}

function geRandomGridCoordinates(gridSize) {
  const xPosition = Math.floor(Math.random() * (gridSize - 2)) + 1;

  const yPosition = Math.floor(Math.random() * (gridSize - 2)) + 1;

  const randomGridCoordinates = {
    randomXPosition: xPosition,
    randomYPosition: yPosition,
  };

  return randomGridCoordinates;
}

function snakeEats() {
  document.querySelector(".play-board__food").remove();

  score++;
  displayScore();

  snake.body.push([food.xFoodPosition, food.yFoodPosition]);

  displayFood();
}

function resetGame() {
  const snakeElements = document.querySelectorAll(".play-board__snake");
  snakeElements.forEach((element) => {
    element.remove();
  });

  document.querySelector(".play-board__food").remove();

  updateHighScore();

  food = { xFoodPosition: null, yFoodPosition: null };
  snake = {
    xSnakePosition: 5,
    ySnakePosition: 15,
    xSnakeVelocity: 1,
    ySnakeVelocity: 0,
    body: [],
  };
  score = 0;
  highScore = localStorage.getItem("highScore") || 0;

  startGame();
}

function displayScore() {
  const scoreElement = document.querySelector(".game-details__score");
  scoreElement.textContent = `Score : ${score}`;
}

function displayHighScore() {
  const highScoreElement = document.querySelector(".game-details__high-score");
  highScoreElement.textContent = `High Score : ${highScore}`;
}

function updateHighScore() {
  if (highScore === 0 || score > parseInt(highScore)) {
    localStorage.setItem("highScore", score);
  }
}
