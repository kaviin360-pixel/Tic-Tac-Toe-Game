const playerX = localStorage.getItem("playerX") || "Player X"
const playerO = localStorage.getItem("playerO") || "Player O"
let scoreX = parseInt(localStorage.getItem("scoreX")) || 0
let scoreO = parseInt(localStorage.getItem("scoreO")) || 0
const title = document.getElementById("title")
const nameX = document.getElementById("xName")
const nameO = document.getElementById("oName")
const statusText = document.getElementById("status")
const seriesEl = document.getElementById("seriesLeader")
const cells = document.querySelectorAll(".cell")
const toggle = document.querySelector(".toggle")
let startingPlayer = localStorage.getItem("startingPlayer") || "X"
let currentPlayer = startingPlayer
let board = Array(9).fill("")
let active = true
const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

title.innerText = `${playerX} vs ${playerO}`
updateScore()
updateSeriesLeader()
statusText.innerText = `${playerX}'s Turn`

cells.forEach((cell, i) => {
  cell.addEventListener("click", () => {
    if (!active || board[i])
      return
    board[i] = currentPlayer
    cell.textContent = currentPlayer
    cell.classList.add(currentPlayer === "X" ? "x" : "o")

    if (wins.some(w => w.every(x => board[x] === currentPlayer))) {
      statusText.innerText =`${currentPlayer === "X" ? playerX : playerO} Wins the game 🎉`
      if (currentPlayer === "X")
        scoreX++
      else
        scoreO++

      saveScores()
      updateScore()
      updateSeriesLeader()
      active = false
      startingPlayer = startingPlayer === "X" ? "O" : "X"
      localStorage.setItem("startingPlayer", startingPlayer)
      return
    }

    if (board.every(v => v)) {
      statusText.innerText = "It's a Draw 🤝"
      active = false
      startingPlayer = startingPlayer === "X" ? "O" : "X"
      localStorage.setItem("startingPlayer", startingPlayer)
      return
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"
    updatePlayerTurn()
  })
})

function updateScore() {
  nameX.innerText = `${playerX} (X): ${scoreX}`
  nameO.innerText = `${playerO} (O): ${scoreO}`
}

function updateSeriesLeader() {
  if (scoreX > scoreO) {
    seriesEl.innerText = `${playerX} is Series Leader 🏆`
  } else if (scoreO > scoreX) {
    seriesEl.innerText = `${playerO} is Series Leader 🏆`
  } else {
    seriesEl.innerText = "Series is Tied ⚖️"
  }
}

function saveScores() {
  localStorage.setItem("scoreX", scoreX)
  localStorage.setItem("scoreO", scoreO)
}

function resetBoard() {
  board.fill("");
  cells.forEach(c => {
    c.textContent = "";
    c.classList.remove("x", "o");
  })

  currentPlayer = startingPlayer
  active = true;
  updatePlayerTurn();
}

function updatePlayerTurn() {
  statusText.innerText =`${currentPlayer === "X" ? playerX : playerO}'s Turn`
}

function resetScores() {
  scoreX = 0
  scoreO = 0
  saveScores()
  updateScore()
  updateSeriesLeader()
  resetBoard()
  localStorage.clear()
}

function goHome() {
  localStorage.clear()
  location.href = "index.html"
}

function applyTheme() {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light")
  }
}

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light")
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark"
    )
  })
}

applyTheme()