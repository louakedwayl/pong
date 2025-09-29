export const nav = document.querySelector("nav") as HTMLElement;
export const button1 = document.querySelector("button.game") as HTMLButtonElement;
export const playerPaddle = document.querySelector(".paddle.left") as HTMLElement;

export let posY = 0;

// Key state
export const keys = {
  ArrowUp: false,
  ArrowDown: false
};

export const maxY = 384; // Screen height
export const minY = -384; //

// Listen when a key was pressed
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
}});
        

export function new_game_animation()
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
        } , { once: true });
    }, { once: true });
    }
  });
}



// Fonction qui met à jour la position en continu
export function updatePaddlePosition() 
{
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