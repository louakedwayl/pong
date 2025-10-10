import {pause , setAnimationId, keys, maxY, minY } from "./game_utils.js";

export const playerPaddle = document.querySelector(".paddle.left") as HTMLElement;
export let PlayerPaddleposY = 0;

// Fonction qui met à jour la position en continu
export function updatePaddlePosition() 
{
  if (pause)
     return; // ← stop la boucle si pause activé
    
  if (keys.ArrowDown) {
        PlayerPaddleposY = Math.min(PlayerPaddleposY + 8, maxY);
    }
      if (keys.ArrowUp) {
      PlayerPaddleposY = Math.max(PlayerPaddleposY - 8, minY);
    }    
    // Mettre à jour la position visuelle
    playerPaddle.style.transform = `translateY(calc(-45px + ${PlayerPaddleposY}px))`;
    // Répéter à chaque frame
    setAnimationId(  requestAnimationFrame(updatePaddlePosition));
}

export function setPlayerPaddlePosY(y : number)
{
    PlayerPaddleposY= y ;
}