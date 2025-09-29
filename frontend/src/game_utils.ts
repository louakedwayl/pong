export const nav = document.querySelector("nav") as HTMLElement;
export const button1 = document.querySelector("button.game") as HTMLButtonElement;
export const button2 = document.querySelector("button.language") as HTMLButtonElement;

export const playerPaddle = document.querySelector(".paddle.left") as HTMLElement;

export let posY = 0;

// Key state
export const keys = {
  ArrowUp: false,
  ArrowDown: false
};

export const maxY = 384; // Screen height
export const minY = -384; //

export const button3 = document.createElement("button") as HTMLButtonElement;
export const button4 = document.createElement("button") as HTMLButtonElement;
button3.classList.add("btn");
button4.classList.add("btn");
button3.textContent = "PAUSE";
button3.style.paddingLeft = "26px";
button3.style.paddingRight = "26px";
button4.textContent = "BACK";
button4.style.paddingLeft = "26px";
button4.style.paddingRight = "26px";

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
                    updateNav();
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

export function updateNav() 
{
        button1.style.display= "none";
        button2.style.display= "none";
        nav.appendChild(button3);
        nav.appendChild(button4);   
}

export function handlerBack() 
{
    button4.addEventListener("click", () => 
    {
            // GERER le retour au menu
    });
}

export function handlerPause() 
{
    button3.addEventListener("click", () => 
    {
        // GERER la pause
    });
}