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

    // Enhanced Blob class with improved mobile performance
    class Blob {
      x: number;
      y: number;
      r: number;
      color1: string;
      color2: string;
      vx: number;
      vy: number;
      targetX: number;
      targetY: number;
      phase: number;

      constructor(x: number, y: number, r: number, color1: string, color2: string) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color1 = color1;
        this.color2 = color2;
        
        // Enhanced speed for better visual appeal
        const isMobile = window.innerWidth < 768;
        const speedMultiplier = isMobile ? 1.5 : 2.0; // Reduced speed for mobile
        this.vx = (Math.random() - 0.5) * speedMultiplier;
        this.vy = (Math.random() - 0.5) * speedMultiplier;
        
        this.targetX = x;
        this.targetY = y;
        this.phase = Math.random() * Math.PI * 2;
      }

      draw() {
        // Optimized gradient creation for mobile performance
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0, 
          this.x, this.y, this.r
        );
        gradient.addColorStop(0, this.color1);
        gradient.addColorStop(0.6, this.color1);
        gradient.addColorStop(1, this.color2);
        ctx.fillStyle = gradient;
        
        // Simplified blob shape for mobile
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        } else {
            const morphFactor = Math.sin(this.phase) * 0.1;
            const radiusX = this.r * (1 + morphFactor);
            const radiusY = this.r * (1 - morphFactor * 0.5);
            
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(radiusX / this.r, radiusY / this.r);
            ctx.arc(0, 0, this.r, 0, Math.PI * 2);
            ctx.restore();
        }
        ctx.fill();
      }

      update(width: number, height: number, deltaTime: number) {
        // Enhanced movement with smoother transitions
        this.phase += deltaTime * 0.002; // Morphing animation
        
        // Fluid movement with attraction to center
        const centerX = width / 2;
        const centerY = height / 2;
        const distanceToCenter = Math.sqrt(
          Math.pow(this.x - centerX, 2) + Math.pow(this.y - centerY, 2)
        );
        
        // Gentle attraction to center when too far
        if (distanceToCenter > Math.min(width, height) * 0.4) {
          this.vx += (centerX - this.x) * 0.0001;
          this.vy += (centerY - this.y) * 0.0001;
        }
        
        // Enhanced boundary collision with smoother rebounds
        if (this.x < this.r || this.x > width - this.r) {
          this.vx *= -0.8; // Softer bounce
          this.x = Math.max(this.r, Math.min(width - this.r, this.x));
        }
        if (this.y < this.r || this.y > height - this.r) {
          this.vy *= -0.8; // Softer bounce
          this.y = Math.max(this.r, Math.min(height - this.r, this.y));
        }
        
        // Apply velocity with slight damping for smoother movement
        this.vx *= 0.999;
        this.vy *= 0.999;
        this.x += this.vx;
        this.y += this.vy;
      }
    }
    
    // Enhanced blob creation with better mobile optimization
    const createBlobs = (width: number, height: number) => {
      const isMobile = width < 768;
      const isPortrait = height > width;
      
      // Optimized blob sizes for better performance and visual appeal
      const baseRadius = Math.min(width, height) * (isMobile ? 0.2 : 0.15); // Larger blobs on mobile
      const radiusVariation = baseRadius * 0.3;
      
      // Enhanced color palette with better gradients
      const colors = [
        { primary: 'rgba(59, 130, 246, 0.6)', secondary: 'rgba(37, 99, 235, 0)' },
        { primary: 'rgba(96, 165, 250, 0.5)', secondary: 'rgba(59, 130, 246, 0)' },
        { primary: 'rgba(147, 197, 253, 0.4)', secondary: 'rgba(96, 165, 250, 0)' },
        { primary: 'rgba(191, 219, 254, 0.3)', secondary: 'rgba(147, 197, 253, 0)' },
      ];
      
      if (isMobile) {
        // Mobile: fewer, larger blobs
        blobs = [
          new Blob(width * 0.25, height * 0.35, baseRadius, colors[0].primary, colors[0].secondary),
          new Blob(width * 0.75, height * 0.65, baseRadius + radiusVariation, colors[1].primary, colors[1].secondary),
        ];
      } else {
        // Desktop: enhanced layout with more blobs
        blobs = [
          new Blob(width * 0.2, height * 0.3, baseRadius, colors[0].primary, colors[0].secondary),
          new Blob(width * 0.8, height * 0.7, baseRadius + radiusVariation, colors[1].primary, colors[1].secondary),
          new Blob(width * 0.5, height * 0.5, baseRadius - radiusVariation * 0.2, colors[2].primary, colors[2].secondary),
          new Blob(width * 0.15, height * 0.8, baseRadius - radiusVariation * 0.4, colors[3].primary, colors[3].secondary),
        ];
      }
    };

    let lastTime = 0;
    
    // Enhanced animation loop with delta time for consistent performance
    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Clear canvas with enhanced background gradient
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Enhanced background gradient with more depth
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, '#f0f9ff');
      bgGradient.addColorStop(0.3, '#e0f2fe');
      bgGradient.addColorStop(0.7, '#7dd3fc');
      bgGradient.addColorStop(1, '#38bdf8');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw blobs with delta time
      blobs.forEach(blob => {
        blob.update(canvas.width, canvas.height, deltaTime);
        blob.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Enhanced resize handler with better performance
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Limit DPR for mobile performance
      const rect = canvas.getBoundingClientRect();
      
      // Set canvas size with device pixel ratio for crisp rendering
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      // Scale context for high DPI displays
      ctx.scale(dpr, dpr);
      
      // Optimize canvas rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium'; // Use 'medium' for a balance of performance and quality
      
      createBlobs(rect.width, rect.height);
    };

    // Throttled resize handler for better performance
    let resizeTimeout: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150); // Increased throttle time
    };

    window.addEventListener('resize', throttledResize);
    handleResize(); // Initial setup
    animate(0); // Start animation

    return () => {
      window.removeEventListener('resize', throttledResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
      style={{
        // Enhanced mobile optimization
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    />
  );
};

export default LavaLampBackground;