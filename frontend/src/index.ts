const nav = document.querySelector("nav") as HTMLElement;
const button1 = document.querySelector("button.game") as HTMLButtonElement;
const playerPaddle = document.querySelector(".paddle.left") as HTMLElement;

const button2 = document.querySelector("button.language");
const button3 = document.createElement("button");
const button4 = document.createElement("button");

button3.classList.add("btn");
button4.classList.add("btn");


button3.textContent = "Русский";
button4.textContent = "Français";


if (nav && button1 && button2) {
  button2.addEventListener("click", () => {
    button1.style.display = "none";
    button2.innerHTML = "English";
    nav.appendChild(button3);
    nav.appendChild(button4);
  });
}


// game 


if (nav && button1 && playerPaddle)
{
  button1.addEventListener("click", () => {
    playerPaddle.classList.add("blink");
  });
}

let posY = 0;


// document.addEventListener("keydown", (event) => {
//     let maxY = 384; // 40% de la hauteur de l'écran
//     let minY = -384; // -40% de la hauteur de l'écran
    
//     if (event.key === "ArrowDown") {
//         posY = Math.min(posY + 15, maxY); // incréments plus petits en %
//     }
//     else if (event.key === "ArrowUp") {
//         posY = Math.max(posY - 15, minY);
//     }
//     playerPaddle.style.transform = `translateY(calc(-45px + ${posY}px))`;
  
// });



// Objet pour tracker l'état des touches
const keys = {
    ArrowUp: false,
    ArrowDown: false
};

let maxY = 384; // 40% de la hauteur de l'écran
let minY = -384; // -40% de la hauteur de l'écran

// Écouter quand une touche est pressée
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        keys[event.key] = true;
        event.preventDefault(); // Éviter le scroll de la page
    }
});

// Écouter quand une touche est relâchée
document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        keys[event.key] = false;
        event.preventDefault();
    }
});

// Fonction qui met à jour la position en continu
function updatePaddlePosition() {
    if (keys.ArrowDown) {
        posY = Math.min(posY + 8, maxY); // Mouvement plus fluide avec des incréments plus petits
    }
    if (keys.ArrowUp) {
        posY = Math.max(posY - 8, minY);
    }
    
    // Mettre à jour la position visuelle
    playerPaddle.style.transform = `translateY(calc(-45px + ${posY}px))`;
    
    // Répéter à chaque frame
    requestAnimationFrame(updatePaddlePosition);
}

// Démarrer la boucle de mise à jour
updatePaddlePosition();