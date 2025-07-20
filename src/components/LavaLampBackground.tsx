import React, { useRef, useEffect } from 'react';

const LavaLampBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let blobs: Blob[] = [];
    let animationFrameId: number;

    // This class defines the properties and behavior of each lava blob.
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
        const speedMultiplier = window.innerWidth < 768 ? 0.3 : 0.6;
        this.vx = (Math.random() - 0.5) * speedMultiplier;
        this.vy = (Math.random() - 0.5) * speedMultiplier;
      }

      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        gradient.addColorStop(0, this.color1);
        gradient.addColorStop(0.7, this.color1);
        gradient.addColorStop(1, this.color2);
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }

      update(width: number, height: number) {
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
    
    // This function creates the blobs based on the current screen size.
    const createBlobs = (width: number, height: number) => {
        const radiusMultiplier = width < 768 ? 0.25 : 0.18;
        blobs = [
            new Blob(width * 0.2, height * 0.3, width * radiusMultiplier, 'rgba(59, 130, 246, 0.6)', 'rgba(37, 99, 235, 0)'),
            new Blob(width * 0.8, height * 0.7, width * (radiusMultiplier + 0.05), 'rgba(96, 165, 250, 0.6)', 'rgba(59, 130, 246, 0)'),
            new Blob(width * 0.5, height * 0.5, width * (radiusMultiplier - 0.05), 'rgba(147, 197, 253, 0.6)', 'rgba(96, 165, 250, 0)'),
        ];
    }

    // The main animation loop.
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#eff6ff');
      bgGradient.addColorStop(1, '#60a5fa');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      blobs.forEach(blob => {
        blob.update(canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
        blob.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    // This function handles resizing of the canvas to prevent graininess and re-initializes blobs.
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2 for performance
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      createBlobs(canvas.width / dpr, canvas.height / dpr);
    };

    // Throttled resize handler to improve performance
    let resizeTimeout: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', throttledResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(handleResize, 100); // Delay to ensure orientation change is complete
    });
    handleResize(); // Initial setup
    animate();

    return () => {
      window.removeEventListener('resize', throttledResize);
      window.removeEventListener('orientationchange', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Using position: fixed and z-[-1] to ensure the background stays put and behind all content.
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full z-[-1]" 
      style={{ 
        imageRendering: 'auto',
        willChange: 'transform'
      }}
    />
  );
};

export default LavaLampBackground;
