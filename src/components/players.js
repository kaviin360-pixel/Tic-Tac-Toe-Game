const player1El = document.getElementById("p1")
const player2El = document.getElementById("p2")
const startBtn = document.getElementById("start-btn")
const toggle = document.querySelector(".toggle")
if (startBtn) {
  startBtn.addEventListener("click", () => {
    localStorage.setItem("playerX", player1El.value || "Player X")
    localStorage.setItem("playerO", player2El.value || "Player O")
    location.href = "game.html"
  })
}
function applyTheme() {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light")
  }
}

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light")
    localStorage.setItem("theme",document.body.classList.contains("light") ? "light" : "dark"
    )
  })
}

applyTheme()