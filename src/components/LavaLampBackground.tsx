import React, { useRef, useEffect } from 'react';

const LavaLampBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    class Blob {
      constructor(x, y, r, color1, color2) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color1 = color1;
        this.color2 = color2;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, this.r * 0.8, this.x, this.y, this.r);
        gradient.addColorStop(0, this.color1);
        gradient.addColorStop(1, this.color2);
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < this.r || this.x > width - this.r) {
          this.vx *= -1;
        }
        if (this.y < this.r || this.y > height - this.r) {
          this.vy *= -1;
        }
      }
    }

    const blobs = [
      new Blob(width * 0.2, height * 0.3, width * 0.15, 'rgba(59, 130, 246, 0.6)', 'rgba(37, 99, 235, 0)'),
      new Blob(width * 0.8, height * 0.7, width * 0.2, 'rgba(96, 165, 250, 0.6)', 'rgba(59, 130, 246, 0)'),
      new Blob(width * 0.5, height * 0.5, width * 0.1, 'rgba(147, 197, 253, 0.6)', 'rgba(96, 165, 250, 0)'),
      new Blob(width * 0.3, height * 0.8, width * 0.12, 'rgba(30, 64, 175, 0.6)', 'rgba(30, 58, 138, 0)'),
      new Blob(width * 0.7, height * 0.2, width * 0.18, 'rgba(191, 219, 254, 0.6)', 'rgba(147, 197, 253, 0)'),
    ];

    function animate() {
      ctx.clearRect(0, 0, width, height);
      // Main background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, '#bfdbfe'); // blue-200
      bgGradient.addColorStop(1, '#3b82f6'); // blue-500
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);
      
      blobs.forEach(blob => {
        blob.update();
        blob.draw();
      });

      requestAnimationFrame(animate);
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
};

export default LavaLampBackground;
