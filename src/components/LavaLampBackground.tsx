import React, { useRef, useEffect } from 'react';

const LavaLampBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let blobs: Blob[] = [];

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
        const speedMultiplier = window.innerWidth < 768 ? 1.2 : 1.5;
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
        const isMobile = width < 768;
        const isPortrait = height > width;
        
        // Adjust blob sizes and positions for mobile orientation
        const radiusMultiplier = isMobile ? (isPortrait ? 0.25 : 0.35) : 0.2;
        
        if (isMobile && isPortrait) {
          // Portrait mobile: vertical layout with smaller, more spread out blobs
          blobs = [
            new Blob(width * 0.2, height * 0.2, width * radiusMultiplier, 'rgba(59, 130, 246, 0.6)', 'rgba(37, 99, 235, 0)'),
            new Blob(width * 0.8, height * 0.5, width * (radiusMultiplier + 0.05), 'rgba(96, 165, 250, 0.6)', 'rgba(59, 130, 246, 0)'),
            new Blob(width * 0.3, height * 0.8, width * (radiusMultiplier - 0.03), 'rgba(147, 197, 253, 0.6)', 'rgba(96, 165, 250, 0)'),
            new Blob(width * 0.7, height * 0.3, width * (radiusMultiplier - 0.02), 'rgba(191, 219, 254, 0.5)', 'rgba(147, 197, 253, 0)'),
          ];
        } else if (isMobile && !isPortrait) {
          // Landscape mobile: horizontal layout
          blobs = [
            new Blob(width * 0.15, height * 0.3, width * radiusMultiplier, 'rgba(59, 130, 246, 0.6)', 'rgba(37, 99, 235, 0)'),
            new Blob(width * 0.5, height * 0.7, width * (radiusMultiplier + 0.05), 'rgba(96, 165, 250, 0.6)', 'rgba(59, 130, 246, 0)'),
            new Blob(width * 0.85, height * 0.4, width * (radiusMultiplier - 0.03), 'rgba(147, 197, 253, 0.6)', 'rgba(96, 165, 250, 0)'),
          ];
        } else {
          // Desktop: original layout
          blobs = [
            new Blob(width * 0.2, height * 0.3, width * radiusMultiplier, 'rgba(59, 130, 246, 0.6)', 'rgba(37, 99, 235, 0)'),
            new Blob(width * 0.8, height * 0.7, width * (radiusMultiplier + 0.05), 'rgba(96, 165, 250, 0.6)', 'rgba(59, 130, 246, 0)'),
            new Blob(width * 0.5, height * 0.5, width * (radiusMultiplier - 0.05), 'rgba(147, 197, 253, 0.6)', 'rgba(96, 165, 250, 0)'),
          ];
        }
    }

    let animationFrameId: number;
    
    // The main animation loop.
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#eff6ff');
      bgGradient.addColorStop(1, '#60a5fa');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      blobs.forEach(blob => {
        blob.update(canvas.width, canvas.height);
        blob.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    // This function handles resizing of the canvas to prevent graininess and re-initializes blobs.
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      createBlobs(rect.width, rect.height);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Use absolute positioning to keep the background within its parent (the Hero section).
  // The z-index is removed to ensure it's visible. The Hero component will handle layering.
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />;
};

export default LavaLampBackground;
