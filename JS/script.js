const currentPlayer = document.querySelector('.current-player');
const changeThemeBtn = document.getElementById('change-theme')

let selected;
let player1 = '<i class="fa-solid fa-xmark fa-2x"></i>';
let player2 = '<i class="fa-solid fa-o fa-2x"></i>';

let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function init() {
    selected = [];
  
    player1 = '<i class="fa-solid fa-xmark fa-2x"></i>';
    player2 = '<i class="fa-solid fa-o fa-2x"></i>';
  
    currentPlayer.innerHTML = `Vez do: ${player1}`;
  
    document.querySelectorAll(".game button").forEach((item) => {
      item.innerHTML = "";
      item.addEventListener("click", newMove);
    });
  }
  

init();

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = player1;
    e.target.removeEventListener("click", newMove);
    selected[index] = player1;
  
    setTimeout(() => {
      check();
    }, [100]);
  
    player1 = player1 === '<i class="fa-solid fa-xmark fa-2x"></i>' ? '<i class="fa-solid fa-o fa-2x"></i>' : '<i class="fa-solid fa-xmark fa-2x"></i>';
    currentPlayer.innerHTML = `Vez do: ${player1}`;
  }
  

function check(){
    let playerLastMove = player1 === '<i class="fa-solid fa-xmark fa-2x"></i>' ? '<i class="fa-solid fa-o fa-2x"></i>' : '<i class="fa-solid fa-xmark fa-2x"></i>';

    const items = selected.map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

    for (pos of positions){
        if (pos.every((item) => items.includes(item))){
            const jogadorVitorioso = (
              playerLastMove == '<i class="fa-solid fa-xmark fa-2x"></i>'
              ? 'X'
              : "O"   
            );

            alert("O Jogador '" + jogadorVitorioso + "' ganhou!");
            init();
            return;
        }
    }

    if (selected.filter((item) => item).length === 9){
        alert("Deu velha!");
        init()
        return;
    }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function loadTheme() {
  const darkMode = localStorage.getItem("dark");

  if (darkMode) {
    toggleDarkMode();
  }
}

loadTheme();

changeThemeBtn.addEventListener("change", function () {
  toggleDarkMode();

  localStorage.removeItem("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark", 1);
  }
});