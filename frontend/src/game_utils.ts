export const nav = document.querySelector("nav") as HTMLElement;
export const button1 = document.querySelector("button.game") as HTMLButtonElement;
export const button2 = document.querySelector("button.language") as HTMLButtonElement;

export const playerPaddle = document.querySelector(".paddle.left") as HTMLElement;
export const ball = document.querySelector(".ball") as HTMLElement;
export let posY = 0;

export const scoreLeft = document.querySelector(".score") as HTMLElement;
export const scoreRight = document.querySelector(".score.right") as HTMLElement;

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

let animationId : number | null = null;

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
                    
                    // ✅ AJOUTE LE MÊME DÉLAI QUE resetBall()
                    setTimeout(() => {
                        updateBallPosition();
                    }, 1000);
                    
                    resolve ();

                    
                },{ once: true });
            });
        }
    });
}



// Fonction qui met à jour la position en continu
export function updatePaddlePosition() 
{
  if (pause)
     return; // ← stop la boucle si pause activé
    
  if (keys.ArrowDown) {
        posY = Math.min(posY + 8, maxY);
    }
      if (keys.ArrowUp) {
      posY = Math.max(posY - 8, minY);
    }    
    // Mettre à jour la position visuelle
    playerPaddle.style.transform = `translateY(calc(-45px + ${posY}px))`;
    // Répéter à chaque frame
    animationId =  requestAnimationFrame(updatePaddlePosition);
}

export function updateNav() 
{
    button1.style.display= "none";
    button2.style.display= "none";
    nav.appendChild(buttonGamePause);
    nav.appendChild(buttonGameBack);
}

export function handlerBack() 
{
    buttonGameBack.addEventListener("click", () => 
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
            ballAnimationId = null;
        }
        posY = 0; // ✅ AJOUTE ÇA
        ballX = 0;
        ballY = 0;
        ball.style.transform = `translate(0px, 0px)`;
        ball.style.display = "none";
        playerPaddle.style.top = "50%";
        playerPaddle.style.transform = "translateY(-45px)";
    });
}

let pause :boolean = false;

export function handlerPause() 
{
    buttonGamePause.addEventListener("click", () => 
    {
        playerPaddle.classList.remove("blink");
        if (pause == true)
        {
            pause = false;
            updatePaddlePosition();
            
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
                ballAnimationId = null;
            }
        }
    });
}

// ball feature
let ballX = 0;
let ballY = 0;
let ballSpeedX = -3; // ✅ Commence déjà à -3
let ballSpeedY = 3;  // ✅ Commence déjà à 3
let ballAnimationId: number | null = null;

const pongScreen = document.querySelector(".pong-screen") as HTMLElement;

export function updateBallPosition() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  const screenRect = pongScreen.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();
  const leftPaddleRect = playerPaddle.getBoundingClientRect();

  // bottom wall bounce
  if (ballRect.bottom >= screenRect.bottom) {
    ballY -= ballRect.bottom - screenRect.bottom;
    ballSpeedY = -Math.abs(ballSpeedY);
  }

  // top wall bounce
  if (ballRect.top <= screenRect.top) {
    ballY += screenRect.top - ballRect.top;
    ballSpeedY = Math.abs(ballSpeedY);
  }

  // left paddle bounce
  if (
    ballRect.left <= leftPaddleRect.right &&
    ballRect.right >= leftPaddleRect.left &&
    ballRect.top <= leftPaddleRect.bottom &&
    ballRect.bottom >= leftPaddleRect.top
  ) {
    ballX += leftPaddleRect.right - ballRect.left;
    ballSpeedX = Math.abs(ballSpeedX);
  }

  // Balle sort à gauche
  if (ballRect.left <= screenRect.left) {
    const currentRightScore = Number(scoreRight.textContent || "0");
    scoreRight.textContent = String(currentRightScore + 1);
    resetBall();
    return;
  }

  // Balle sort à droite
  if (ballRect.right >= screenRect.right) {
    const currentLeftScore = Number(scoreLeft.textContent || "0");
    scoreLeft.textContent = String(currentLeftScore + 1);
    resetBall();
    return;
  }

  // ✅ Applique le transform AVANT de vérifier les sorties
  ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
  ballAnimationId = requestAnimationFrame(updateBallPosition);
}

export function resetBall() {
  // Arrêter l'animation
  if (ballAnimationId !== null) {
    cancelAnimationFrame(ballAnimationId);
    ballAnimationId = null;
  }

  // Réinitialiser les variables
  ballX = 0;
  ballY = 0;
  ballSpeedX = -3;
  ballSpeedY = 3;

  // ✅ CRUCIAL : Réinitialiser visuellement
  ball.style.transform = `translate(0px, 0px)`;

  // Relancer après 1 seconde
  setTimeout(() => {
    updateBallPosition();
  }, 1000);
}