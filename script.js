// Get the canvas element
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 600;

// Define some constants
const PIPE_WIDTH = 80;
const PIPE_GAP = 150;
const BIRD_SIZE = 30;
const GRAVITY = 0.5;
const JUMP_HEIGHT = 15;

// Initialize game variables
let score = 0;
let birdX = canvas.width / 2;
let birdY = canvas.height / 2;
let birdVelocity = 0;
let pipes = [];
let gameOver = false;

// Function to draw the game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the bird
  ctx.fillStyle = 'yellow';
  ctx.fillRect(birdX, birdY, BIRD_SIZE, BIRD_SIZE);

  // Draw the pipes
  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];
    ctx.fillStyle = 'green';
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.y);
    ctx.fillRect(pipe.x, pipe.y + PIPE_GAP, PIPE_WIDTH, canvas.height - (pipe.y + PIPE_GAP));
  }

  // Draw the score
  ctx.font = '24px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Score: ${score}`, 10, 10);

  // Update the game state
  update();
}

// Function to update the game state
function update() {
  // Update the bird's position
  birdY += birdVelocity;
  birdVelocity += GRAVITY;

  // Check for collisions with pipes
  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];
    if (checkCollision(birdX, birdY, pipe.x, pipe.y, pipe.x + PIPE_WIDTH, pipe.y + PIPE_GAP)) {
      gameOver = true;
    }
  }

  // Check if the bird has gone out of bounds
  if (birdY + BIRD_SIZE > canvas.height || birdY < 0) {
    gameOver = true;
  }

  // Generate new pipes
  if (Math.random() < 0.05) {
    pipes.push({
      x: canvas.width,
      y: Math.floor(Math.random() * (canvas.height - PIPE_GAP))
    });
  }

  // Update the score
  if (!gameOver) {
    score++;
  }

  // Request the next frame
  requestAnimationFrame(draw);
}

// Function to check for collisions between the bird and a pipe
function checkCollision(birdX, birdY, pipeX, pipeY, pipeX2, pipeY2) {
  if (birdX + BIRD_SIZE > pipeX && birdX < pipeX2 && (birdY < pipeY || birdY + BIRD_SIZE > pipeY2)) {
    return true;
  }
  return false;
}

// Function to handle user input
function handleInput(event) {
  if (event.key === ' ') {
    birdVelocity = -JUMP_HEIGHT;
  }
}

// Add event listeners
document.addEventListener('keydown', handleInput);

// Start the game
draw();