import { playerPaddle ,scoreLeft, scoreRight} from "./game_utils.js";

export const ball = document.querySelector(".ball") as HTMLElement;
export let ballX = 0;
export let ballY = 0;
export let ballSpeedX = -3; // ✅ Commence déjà à -3
export let ballSpeedY = 3;  // ✅ Commence déjà à 3
export let ballAnimationId: number | null = null;

export const pongScreen = document.querySelector(".pong-screen") as HTMLElement;

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

export function setBallX ( x : number)
{
    ballX = x;
}

export function setBallY ( y : number)
{
    ballY = y;
}

export function setballAnimationId ( id : number | null)
{
    ballAnimationId = id;
}
