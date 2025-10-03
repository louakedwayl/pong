import {handlerBack, handlerPause, new_game_animation, updateBallPosition, updatePaddlePosition} from "./game_utils.js";

async function startGame()
{
    await  new_game_animation();
    updatePaddlePosition();
    updateBallPosition();
}

handlerBack();
handlerPause();
startGame();