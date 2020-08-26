import { use } from "./use.js"

export function initGlobalApi(Potato) {
  Potato.use = use;
}