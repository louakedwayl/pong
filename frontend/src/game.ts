import {handlerBack, handlerPause, new_game_animation} from "./game_utils.js";
import { updatePaddlePosition } from "./paddle.js";

async function startGame()
{
    await  new_game_animation();
    updatePaddlePosition();
}

handlerBack();
handlerPause();
startGame();