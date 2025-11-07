import React, { useEffect, useRef } from 'react';
import { saveScore } from '../api';

export default function DinoGame(){
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    const groundY = 190; // fixed ground level
    let running = true;
    let score = 0;
    let speed = 4;
    const dino = { x: 50, y: groundY, vy:0, gravity:0.9, jumpStrength:-14, w:40, h:40 };
    const obstacles = [];

    function spawnObstacle(){
      const size = 20 + Math.random()*30;
      const lastOb = obstacles[obstacles.length - 1];
      const minDistance = 200 + Math.random() * 200; // 200-400px apart
      if (!lastOb || lastOb.x < canvas.width - minDistance) {
        obstacles.push({ x: canvas.width + 10, y: groundY, w: size, h: size });
      }
    }

    function update(){
      ctx.clearRect(0,0,canvas.width,canvas.height);

      // ground
      ctx.fillStyle = '#666';
      ctx.fillRect(0, groundY, canvas.width, 10);

      // dino physics
      dino.vy += dino.gravity;
      dino.y += dino.vy;
      if (dino.y > groundY) { dino.y = groundY; dino.vy = 0; }

      // draw dino
      ctx.fillStyle = '#222';
      ctx.fillRect(dino.x, dino.y - dino.h, dino.w, dino.h);

      // obstacles
      for (let i = obstacles.length-1; i >= 0; i--){
        const ob = obstacles[i];
        ob.x -= speed;
        ctx.fillStyle = '#b33';
        ctx.fillRect(ob.x, ob.y - ob.h, ob.w, ob.h);

        // collision
        if (ob.x < dino.x + dino.w && ob.x + ob.w > dino.x &&
            (ob.y - ob.h) < dino.y && ob.y > (dino.y - dino.h)) {
          running = false;
        }

        if (ob.x + ob.w < 0) obstacles.splice(i,1);
      }

      // spawn obstacles
      if (Math.random() < 0.02) spawnObstacle();

      // score & speed
      if (running) {
        score += 1;
        if (score % 100 === 0) speed += 0.2; // increase speed slightly every 100 points
      }

      // draw score
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.fillText(`Score: ${Math.floor(score/10)}`, 680, 20);

      if (running) requestAnimationFrame(update);
      else {
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        ctx.fillText('Game Over! Press R to restart', 260, 100);
        // save score
        saveScore({ name: 'Dino', game: 'dino', score: Math.floor(score/10) }).catch(()=>{});
      }
    }

    function doJump(){
      if (dino.y === groundY) dino.vy = dino.jumpStrength;
    }

    function keyHandler(e){
      if (e.code === 'Space') {
        if (running) doJump();
        e.preventDefault();
      } else if (e.code === 'KeyR'){
        running = true; score = 0; speed = 4; obstacles.length = 0; dino.y = groundY; update();
      }
    }

    canvas.addEventListener('click', doJump);
    window.addEventListener('keydown', keyHandler);

    update(); // start

    return () => {
      canvas.removeEventListener('click', doJump);
      window.removeEventListener('keydown', keyHandler);
    };
  }, []);

  return (
    <div className="game">
      <h2>Dino Runner (click or press Space to jump; R to restart)</h2>
      <canvas ref={canvasRef} style={{border:'1px solid #ccc', width:'100%', maxWidth:800}} />
    </div>
  );
}
