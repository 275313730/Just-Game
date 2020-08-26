import Game from "./Game/index.js";
import Stage from "./Stage/index.js";
import Sprite from "./Sprite/index.js";
import { initGlobalApi } from "./global-api/index.js"

let Potato = { Game, Stage, Sprite }

initGlobalApi(Potato)

export default Potato;
export { Game, Stage, Sprite };