import Game from "../../Game";

// 图层数组
let layers = [];

// 检查图层值
export function checkLayer(layer) {
  // 检测图层值是否在数组中
  if (layers.indexOf(layer) > -1) return;
  // 新增图层值
  layers.push(layer);
  // 图层值排序
  layers.sort();
}

// 将精灵排序
export function spritesSort() {
  let newSprites = {};
  // 根据图层值排序
  layers.forEach(layer => {
    for (const key in sprites) {
      const sprite = sprites[key];
      if (sprite.layer === layer) {
        newSprites[sprite.id] = sprite;
      }
    }
  })
  sprites = newSprites;
}

// 添加game和stage属性
export function addProperty(newSprite, stage) {
  // Game和Stage的宽高
  newSprite.game = {
    width: Game.width,
    height: Game.height
  };
  // 全局精灵无法使用stage属性
  if (newSprite.global) return;
  newSprite.stage = {
    width: stage.width,
    height: stage.height
  };
}