import Phaser from 'phaser';

const HEART = [
  '0110110',
  '1111111',
  '1111111',
  '0111110',
  '0011100',
  '0001000',
];

export function drawHealth(graphics: Phaser.GameObjects.Graphics, health: number, total: number) {
  graphics.clear();
  for (let heart = 0; heart < total; heart++) {
    for (let row = 0; row < HEART.length; row++) {
      for (let col = 0; col < HEART[row].length; col++) {
        if (HEART[row][col] !== '1') continue;
        graphics.fillStyle(0x07152f).fillRect(heart * 28 + col * 3 - 1, row * 3 - 1, 5, 5);
      }
    }
    graphics.fillStyle(heart < health ? 0xff7796 : 0x8498b3);
    HEART.forEach((row, y) => [...row].forEach((pixel, x) => {
      if (pixel === '1') graphics.fillRect(heart * 28 + x * 3, y * 3, 3, 3);
    }));
  }
}

export function drawTimer(graphics: Phaser.GameObjects.Graphics, x: number, y: number, fraction: number, color: number) {
  for (let i = 0; i < 6; i++) {
    graphics.fillStyle(0x07152f).fillRect(x + i * 10, y, 9, 6);
    graphics.fillStyle(i < Math.ceil(fraction * 6) ? color : 0x526789).fillRect(x + i * 10 + 1, y + 1, 7, 4);
  }
}

export function scorePopup(scene: Phaser.Scene, x: number, y: number, points: number) {
  if (scene.cameras.main.scrollX + 80 > x) x = scene.cameras.main.scrollX + 80;
  const popup = scene.add.text(x, y - 23, `+${points}`, {
    fontFamily: 'system-ui, sans-serif',
    fontSize: '24px',
    fontStyle: 'bold',
    color: '#ffe28a',
    stroke: '#07152f',
    strokeThickness: 5,
  }).setOrigin(.5, 1).setDepth(30);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    scene.time.delayedCall(720, () => popup.destroy());
  } else {
    scene.tweens.add({ targets: popup, y: popup.y - 18, alpha: 0, delay: 360, duration: 360, onComplete: () => popup.destroy() });
  }
}
