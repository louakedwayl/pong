const nav = document.querySelector("nav") as HTMLElement;
const button1 = document.querySelector("button.game") as HTMLButtonElement;
const playerPaddle = document.querySelector(".paddle.left") as HTMLElement;

const button2 = document.querySelector("button.language");
const button3 = document.createElement("button");
const button4 = document.createElement("button");


// Language feature


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


// game //
function new_game_animation()
{
  return new Promise<void>((resolve) => 
  {
    if (nav && button1 && playerPaddle)
    {
      button1.addEventListener("click", () => 
      {
        playerPaddle.classList.add("blink");
        playerPaddle.addEventListener("animationend", () =>
        {
          playerPaddle.classList.remove("blink");
          resolve ();
        }) 
      });
    }
  });
}

new_game_animation();


let posY = 0;


// Objet pour tracker l'état des touches
const keys = {
    ArrowUp: false,
    ArrowDown: false
};

const maxY = 384; // 40% de la hauteur de l'écran
const minY = -384; // -40% de la hauteur de l'écran

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
        posY = Math.min(posY + 8, maxY);
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



// Reste a faire

// Menu des langues
// balle
// depart ball
// reaction ball
// oppenent
// score