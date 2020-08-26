"use strict"
import asset from "./Asset/index.js";
import { init, isMobile } from './init.js';
import event from "../Common/event.js";
import display from "./Display/index.js";

const Game = {};

// 初始化游戏
Game.init = function (options) {
  // 画布
  this.canvas = document.createElement('canvas');
  document.body.appendChild(this.canvas);

  // 画布上下文
  this.context = this.canvas.getContext("2d");

  // 初始化宽度和高度
  if (!options.width || !options.height) throw Error("Width and height is needed");
  this.display.resolution(options.width, options.height);
  this.display.background("white");

  // 键盘状态
  this.key = null;

  // 用户事件
  this.inputEvents = {};

  // 动画间隔帧(每隔n帧绘制下一个关键帧)
  this.animationInterval = options.animationInterval || 16;

  // 测试模式
  this.test = options.test || false;

  // 是否移动端
  this.isMobile = isMobile();

  // 资源路径
  this.asset.setPath(options.path);

  init(this);

  // 禁用右键菜单
  if (!this.test) {
    window.oncontextmenu = function () {
      return false;
    }
  }
}

Game.asset = asset;
Game.display = display;
Game.event = event(Game);

Game.stage = null;

export default Game;