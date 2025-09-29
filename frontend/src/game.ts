import {new_game_animation, updatePaddlePosition} from "./game_utils.js";

async function startGame()
{
    await  new_game_animation();
    updatePaddlePosition();
}

startGame();