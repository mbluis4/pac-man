const width = 28;
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
let score = 0;
let squares = [];

// LAYOUT:  28 * 28 = 784

// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];

// create board
let createBoard = () => {
  for (let i = 0; i < layout.length; i++) {
    let square = document.createElement("div");
    //square.innerHTML = i;
    grid.appendChild(square);
    squares.push(square);
    if (layout[i] === 0) {
      square.classList.add("pacdot");
    } else if (layout[i] === 1) {
      square.classList.add("wall");
    } else if (layout[i] === 2) {
      square.classList.add("ghost-lair");
    } else if (layout[i] === 3) {
      square.classList.add("power-pellet");
    } else if (layout[i] === 4) {
      square.classList.add("blank");
    }
  }
};

createBoard();

let pacmanCurrentIndex = 490;

squares[pacmanCurrentIndex].classList.add("pacman");

let control = (e) => {
  squares[pacmanCurrentIndex].classList.remove("pacman");

  switch (e.key) {
    case "ArrowUp":
      if (
        pacmanCurrentIndex - width >= 0 &&
        !squares[pacmanCurrentIndex - width].classList.contains("wall")
      )
        pacmanCurrentIndex -= width;
      break;
    case "ArrowDown":
      if (
        pacmanCurrentIndex + width < width * width &&
        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
        !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
      )
        pacmanCurrentIndex += width;
      break;
    case "ArrowLeft":
      if (
        pacmanCurrentIndex % width !== 0 &&
        !squares[pacmanCurrentIndex - 1].classList.contains("wall")
      )
        pacmanCurrentIndex--;
      if (pacmanCurrentIndex === 364) pacmanCurrentIndex = 391;
      break;
    case "ArrowRight":
      if (
        pacmanCurrentIndex % width < width - 1 &&
        !squares[pacmanCurrentIndex + 1].classList.contains("wall")
      )
        pacmanCurrentIndex++;
      if (pacmanCurrentIndex === 391) pacmanCurrentIndex = 364;
      break;
  }
  pacDotEaten();
  powerPelletEaten()
  checkForWin()
  checkGameOver()

  
  squares[pacmanCurrentIndex].classList.add("pacman");
};

window.document.addEventListener("keydown", control);

// PACDOTS

let pacDotEaten = () => {
  if (squares[pacmanCurrentIndex].classList.contains("pacdot")) {
    squares[pacmanCurrentIndex].classList.remove("pacdot");
    score++;
    scoreDisplay.innerHTML = score;
  }
};

// POWER PELLETS

let powerPelletEaten = () => {
  //if square is in contains a power pellet
  if(squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    score += 10
    //change each of the four ghosts to isScared
    ghosts.forEach(ghost => ghost.isScared = true)
    //clear power-pellet from square
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
    //unScare ghosts after 10 seconds
    setTimeout(() => ghosts.forEach(ghost => ghost.isScared = false
    ), 10000 )

  }
}


// G H O S T S

class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}

const ghosts = [
  new Ghost("blinky", 348, 250),
  new Ghost("pinky", 376, 400),
  new Ghost("inky", 351, 300),
  new Ghost("clyde", 379, 500),
];

ghosts.forEach((ghost) => {
  squares[ghost.currentIndex].classList.add(ghost.className);
  squares[ghost.currentIndex].classList.add("ghost");
});

//move the ghosts

let moveGhost = (ghost) => {
  console.log("moved ghost");
  const directions = [-1, +1, -width, +width];
  let direction = directions[Math.floor(Math.random() * directions.length)];
  
  ghost.timerId = setInterval(() => {
    //if the next square does not contain a wall and a ghost
    if (
      !squares[ghost.currentIndex + direction].classList.contains("wall") &&
      !squares[ghost.currentIndex + direction].classList.contains("ghost")
    ) {
      // remove any ghost
      squares[ghost.currentIndex].classList.remove(ghost.className);
      squares[ghost.currentIndex].classList.remove('ghost', 'scared')

      //add direction to current index
      ghost.currentIndex += direction;
      //add ghost class
      squares[ghost.currentIndex].classList.add(ghost.className);
      squares[ghost.currentIndex].classList.add('ghost');
    } else direction = directions[Math.floor(Math.random() * directions.length)];
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared')
    }
    //if the ghost is current scared and pacman is on it
    if(squares[ghost.currentIndex].classList.contains('pacman') && ghost.isScared) {
      //remove classes
      squares[ghost.currentIndex].classList.remove('ghost', 'scared')
      squares[ghost.currentIndex].classList.remove(ghost.className)
      //return ghost to lair
      ghost.currentIndex = ghost.startIndex
      //add 100 to score
      score += 100
      //readd classnames to ghost
      squares[ghost.currentIndex].classList.add('ghost')
      squares[ghost.currentIndex].classList.add(ghost.className)
    }
    checkGameOver()
    checkForWin()
  }, ghost.speed);
};
ghosts.forEach((ghost) => moveGhost(ghost));

// CHECK FOR GAME OVER
let checkGameOver = () => {
  if(squares[pacmanCurrentIndex].classList.contains('ghost') && 
  !squares[pacmanCurrentIndex].classList.contains('scared')
   ) {
    //stop ghosts
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //remove evenListener
    window.document.removeEventListener('keydown', control)
    //tell user game over
    scoreDisplay.innerHTML = 'You LOSE'
  } 
}

// CHECK FOR WIN
let checkForWin = () => {
  if(score === 274) {
    //stop ghosts
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //remove evenListener
    window.document.removeEventListener('keydown', control)
    //tell user you win
    scoreDisplay.innerHTML = 'You WON'
  }
}