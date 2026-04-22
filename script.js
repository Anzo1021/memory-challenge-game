let level = 1;
let score = 0;

let container = document.getElementById("game-container");

// Start game
generateLevel();

// Generate each level
function generateLevel() {
  container.innerHTML = ""; // clear previous boxes

  // Increase difficulty (more boxes)
  let totalBoxes = level + 2;

  // Base color
  let baseColor = getRandomColor();

  // Slightly different color
  let oddColor = getSlightlyDifferentColor(baseColor);

  // Random position for odd box
  let oddIndex = Math.floor(Math.random() * totalBoxes);

  for (let i = 0; i < totalBoxes; i++) {
    let box = document.createElement("div");
    box.classList.add("box");

    if (i === oddIndex) {
      box.style.backgroundColor = oddColor;

      // Correct click
      box.addEventListener("click", function () {
        score += 10;
        level++;

        updateUI();
        generateLevel();
      });

    } else {
      box.style.backgroundColor = baseColor;

      // Wrong click
      box.addEventListener("click", function () {
        alert("Wrong! Game Over");
        resetGame();
      });
    }

    container.appendChild(box);
  }
}

// Generate random color
function getRandomColor() {
  let r = Math.floor(Math.random() * 200);
  let g = Math.floor(Math.random() * 200);
  let b = Math.floor(Math.random() * 200);

  return `rgb(${r}, ${g}, ${b})`;
}

// Slight variation of base color
function getSlightlyDifferentColor(color) {
  let nums = color.match(/\d+/g);

  let r = parseInt(nums[0]) + 20;
  let g = parseInt(nums[1]) + 20;
  let b = parseInt(nums[2]) + 20;

  return `rgb(${r}, ${g}, ${b})`;
}

// Update score & level
function updateUI() {
  document.getElementById("level").innerText = level;
  document.getElementById("score").innerText = score;
}

// Reset game
function resetGame() {
  level = 1;
  score = 0;

  updateUI();
  generateLevel();
}

// Restart button
document.getElementById("restart").addEventListener("click", resetGame);