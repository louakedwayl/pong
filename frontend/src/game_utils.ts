import {ball, updateBallPosition, ballAnimationId, setBallX, setBallY, setballAnimationId } from "./ball.js";
import { updateOpponentPosition , setOpponentPosition, opponentPaddle} from "./opponent.js";
import { playerPaddle , setPlayerPaddlePosY , updatePaddlePosition} from "./paddle.js";

export const nav = document.querySelector("nav") as HTMLElement;
export const button1 = document.querySelector("button.game") as HTMLButtonElement;
export const button2 = document.querySelector("button.language") as HTMLButtonElement;


export const scoreLeft = document.querySelector(".score") as HTMLElement;
export const scoreRight = document.querySelector(".score.right") as HTMLElement;

export let pause :boolean = false;

// Key state
export const keys = {
  ArrowUp: false,
  ArrowDown: false
};

export const maxY = 384; // Screen height
export const minY = -384; //

export const buttonGamePause = document.createElement("button") as HTMLButtonElement;
export const buttonGameBack = document.createElement("button") as HTMLButtonElement;
buttonGamePause.classList.add("btn");
buttonGameBack.classList.add("btn");
buttonGamePause.textContent = "PAUSE";
buttonGamePause.style.paddingLeft = "26px";
buttonGamePause.style.paddingRight = "26px";
buttonGameBack.textContent = "BACK";
buttonGameBack.style.paddingLeft = "26px";
buttonGameBack.style.paddingRight = "26px";

export let animationId : number | null = null;

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
                    ball.style.display = "block";
                    
                    setTimeout(() => {
                        updateBallPosition(); 
                    }, 1000);
                    
                    resolve();
                },{ once: true });
            }, {once: true});
        }
    });
}

export function updateNav() 
{
    button1.style.display= "none";
    button2.style.display= "none";
    nav.appendChild(buttonGamePause);
    nav.appendChild(buttonGameBack);
}

export function handlerBack(restartGame: () => Promise<void>) 
{
    buttonGameBack.addEventListener("click", async () => 
    {
        if (pause == true)
            pause = false;
        playerPaddle.classList.remove("blink");
        nav.removeChild(buttonGamePause);
        nav.removeChild(buttonGameBack);
        button1.style.display= "";
        button2.style.display= "";
        // ✅ Réinitialiser les scores
        scoreLeft.textContent = "0";
        scoreRight.textContent = "0";
        if (animationId)
            cancelAnimationFrame(animationId);
        if (ballAnimationId) // ✅ Maintenant ballAnimationId est utilisé
        {
            cancelAnimationFrame(ballAnimationId);
            setballAnimationId(null)
        }
        setPlayerPaddlePosY(0);
        setOpponentPosition(0);
        setBallX(0);
        setBallY(0);
        ball.style.transform = `translate(0px, 0px)`;
        ball.style.display = "none";
        playerPaddle.style.top = "50%";
        playerPaddle.style.transform = "translateY(-45px)";
        opponentPaddle.style.top = "50%";
        opponentPaddle.style.transform = "translateY(-45px)";
        await restartGame();
    });
}


export function handlerPause() 
{
    buttonGamePause.addEventListener("click", () => 
    {
        playerPaddle.classList.remove("blink");
        if (pause == true)
        {
            pause = false;
            updatePaddlePosition();
            updateOpponentPosition();
            
            // Relancer la balle
            if (ballAnimationId === null) {
                updateBallPosition();
            }
        }
        else if (pause == false)
        {
            pause = true;
            
            // Arrêter la raquette
            if (animationId)
            {
              cancelAnimationFrame(animationId);
              animationId = null; // ← ajoute cette ligne ici
            }
            // Arrêter la balle
            if (ballAnimationId !== null) {
                cancelAnimationFrame(ballAnimationId);
                setballAnimationId(null);
            }
        }
    });
}

export function setAnimationId (id : number | null)
{
  animationId = id;
}