import {ball, pongScreen} from "./ball.js";
import { pause } from "./game_utils.js";


export const opponentPaddle = document.querySelector(".paddle.right") as HTMLElement;
export let opponentAnimationId: number | null = null;
export let opponentPosY = 0;

const maxY = 384;
const minY = -384;
const opponentSpeed = 4;
const offset = 37;
let reactionDelay = 0;

export function updateOpponentPosition()
{
    if (pause == true)
        return;
    
    const screenRect = pongScreen.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    const paddleRect = opponentPaddle.getBoundingClientRect();
    const screenCenter = screenRect.left + screenRect.width / 2;
    
    if (ballRect.left >= screenCenter) {
        reactionDelay++;
        

            
            if (Math.random() > 0.24) {
                const ballCenterY = ballRect.top + ballRect.height / 2;
                const paddleCenterY = paddleRect.top + paddleRect.height / 2;
                
                if (ballCenterY < paddleCenterY - offset) {
                    opponentPosY = Math.max(opponentPosY - opponentSpeed, minY);
                }
                else if (ballCenterY > paddleCenterY + offset) {
                    opponentPosY = Math.min(opponentPosY + opponentSpeed, maxY);
                }
                opponentPaddle.style.transform = `translateY(calc(-45px + ${opponentPosY}px))`;
            
        }
    }
    opponentAnimationId = requestAnimationFrame(updateOpponentPosition);
}

export function setOpponentAnimationId(id: number | null) {
    opponentAnimationId = id;
}

export function getOpponentAnimationId() {
    return opponentAnimationId;
}

export function setOpponentPosition(y : number)
{
    opponentPosY = y ;
    opponentPaddle.style.transform = `translateY(calc(-45px + ${opponentPosY}px))`;
}