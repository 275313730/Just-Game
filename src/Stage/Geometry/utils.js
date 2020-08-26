export function getSpriteData(sprite1, sprite2) {
  let { x: x1, y: y1, width: w1, height: h1, scale: s1 } = sprite1;
  x1 *= s1; y1 *= s1; w1 *= s1; h1 *= s1;
  let { x: x2, y: y2, width: w2, height: h2, scale: s2 } = sprite2;
  x2 *= s2; y2 *= s2; w2 *= s2; h2 *= s2;
  return { x1, y1, w1, h1, x2, y2, w2, h2 };
}
