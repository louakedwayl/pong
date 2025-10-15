import {handlerBack, handlerPause, new_game_animation} from "./game_utils.js";
import { updatePaddlePosition } from "./paddle.js";
import {updateOpponentPosition} from "./opponent.js";

async function startGame()
{
    await  new_game_animation();
    updatePaddlePosition();
    updateOpponentPosition();
}

handlerBack(startGame);
handlerPause();
startGame();