import React, { useRef, useEffect } from 'react';

const LavaLampBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let blobs: Blob[] = [];

    class Blob {
      x: number;
      y: number;
      r: number;
      color1: string;
      color2: string;
      vx: number;
      vy: number;

      constructor(x: number, y: number, r: number, color1: string, color2: string) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color1 = color1;
        this.color2 = color2;
        // Adjusted blob speed for a smoother mobile experience
        const speedMultiplier = width < 768 ? 0.5 : 1.0;
        this.vx = (Math.random() - 0.5) * speedMultiplier;
        this.vy = (Math.random() - 0.5) * speedMultiplier;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        gradient.addColorStop(0, this.color1);
        gradient.addColorStop(0.7, this.color1); // Adjusted gradient for a softer edge
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
    
    const createBlobs = () => {
        // Use smaller radius multipliers for mobile screens
        const radiusMultiplier = width < 768 ? 0.25 : 0.15;
        blobs = [
            new Blob(width * 0.2, height * 0.3, width * radiusMultiplier, 'rgba(59, 130, 246, 0.7)', 'rgba(37, 99, 235, 0)'),
            new Blob(width * 0.8, height * 0.7, width * (radiusMultiplier + 0.05), 'rgba(96, 165, 250, 0.7)', 'rgba(59, 130, 246, 0)'),
            new Blob(width * 0.5, height * 0.5, width * (radiusMultiplier - 0.05), 'rgba(147, 197, 253, 0.7)', 'rgba(96, 165, 250, 0)'),
            new Blob(width * 0.3, height * 0.8, width * (radiusMultiplier - 0.03), 'rgba(30, 64, 175, 0.7)', 'rgba(30, 58, 138, 0)'),
            new Blob(width * 0.7, height * 0.2, width * (radiusMultiplier + 0.03), 'rgba(191, 219, 254, 0.7)', 'rgba(147, 197, 253, 0)'),
        ];
    }


    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // Main background gradient optimized for mobile
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, '#eff6ff'); // blue-50
      bgGradient.addColorStop(1, '#60a5fa'); // blue-400
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
      createBlobs(); // Re-create blobs on resize to adjust their size and position
    };

    window.addEventListener('resize', handleResize);
    createBlobs();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
};

export default LavaLampBackground;
