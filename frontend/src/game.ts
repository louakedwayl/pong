export const nav = document.querySelector("nav") as HTMLElement;
export const button1 = document.querySelector("button.game") as HTMLButtonElement;
export const playerPaddle = document.querySelector(".paddle.left") as HTMLElement;

export const button2 = document.querySelector("button.language");
export const button3 = document.createElement("button");
export const button4 = document.createElement("button");


export let posY = 0;


// Objet pour tracker l'état des touches
export const keys = {
  ArrowUp: false,
  ArrowDown: false
};

export const maxY = 384; // 40% de la hauteur de l'écran
export const minY = -384; // -40% de la hauteur de l'écran

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
  
  


  async function startGame()
  {
     await  new_game_animation();
    updatePaddlePosition();
  }

  startGame();