export const nav = document.querySelector("nav") as HTMLElement;
export const button1 = document.querySelector("button.game") as HTMLButtonElement;
export const button2 = document.querySelector("button.language") as HTMLButtonElement;

export const playerPaddle = document.querySelector(".paddle.left") as HTMLElement;
export const ball = document.querySelector(".ball") as HTMLElement;
export let posY = 0;

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

                if (back == true)
                    updatePaddlePosition();


                playerPaddle.classList.add("blink");
                playerPaddle.addEventListener("animationend", () =>
                {
                    playerPaddle.classList.remove("blink");
                    ball.style.display = "block";
                    updateBallPosition();
                    resolve ();
                },{ once: true });
            },{ once: true });
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
    animationId =  requestAnimationFrame(updatePaddlePosition);
}

export function updateNav() 
{
    button1.style.display= "none";
    button2.style.display= "none";
    nav.appendChild(buttonGamePause);
    nav.appendChild(buttonGameBack);
}

let back :boolean = false;

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
        new_game_animation();
        if (animationId)
            cancelAnimationFrame(animationId);
        if (ballAnimationId) // ✅ Maintenant ballAnimationId est utilisé
        {
            cancelAnimationFrame(ballAnimationId);
            ballAnimationId = null;
        }

        ball.style.display = "none";
        playerPaddle.style.top = "50%";
        playerPaddle.style.transform = "translateY(-45px)";
        back = true;
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
        }
        else if (pause == false)
        {
            pause = true;
            if (animationId)
                cancelAnimationFrame(animationId);
        }
    });
}

// ball feature

let ballX = 0;
let ballY = 0;
let ballSpeedX = -3;
let ballSpeedY = 3;
let ballAnimationId : number | null = null;

export function updateBallPosition() {
  // Déplacement
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // ⭐ VÉRIFIER LES SORTIES GAUCHE/DROITE EN PREMIER
  if (ballX < -400 || ballX > 400) {
    resetBall();
    return;
  }

  // Rebond haut/bas (seulement si la balle n'est pas sortie)
  if (ballY >= 384) {
    ballY = 384;
    ballSpeedY = -Math.abs(ballSpeedY);
  } else if (ballY <= -384) {
    ballY = -384;
    ballSpeedY = Math.abs(ballSpeedY);
  }

  // Collision avec la raquette du joueur (gauche)
  if (ballX <= -350 && ballY >= posY - 50 && ballY <= posY + 50) {
    ballSpeedX = Math.abs(ballSpeedX);
    ballX = -350;
  }

  // Collision avec la raquette adverse (droite) - si vous en avez une
  // if (ballX >= 350 && ballY >= opponentY - 50 && ballY <= opponentY + 50) {
  //   ballSpeedX = -Math.abs(ballSpeedX);
  //   ballX = 350;
  // }

  // Appliquer la position
  ball.style.transform = `translate(${ballX}px, ${ballY}px)`;

  // Continuer
  ballAnimationId = requestAnimationFrame(updateBallPosition);
}

function resetBall() {
  if (ballAnimationId !== null) {
    cancelAnimationFrame(ballAnimationId);
    ballAnimationId = null;
  }

  ballX = 0;
  ballY = 0;
  ballSpeedX = -3;
  ballSpeedY = 3;

  setTimeout(() => {
    updateBallPosition();
  }, 1000);
}