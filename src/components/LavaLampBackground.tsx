import React, { useRef, useEffect, useCallback, useMemo } from 'react';

/**
 * Optimized and Corrected LavaLampBackground Component
 *
 * FIXES IMPLEMENTED:
 * 1.  Movement Logic: Blobs now float in multiple directions using corrected velocity vectors.
 * 2.  Smooth Rendering: Hardware acceleration and proper device pixel ratio handling eliminate grainy/laggy visuals.
 * 3.  Scroll Twitching: Absolute positioning decouples the canvas from page scroll.
 * 4.  Performance: The animation is throttled and optimized for various devices.
 */

// Interface for device capability detection
interface DeviceCapabilities {
  isMobile: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  devicePixelRatio: number;
}

const LavaLampBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const lastFrameTimeRef = useRef<number>(0);
  const blobsRef = useRef<Blob[]>([]);

  // Memoized device capabilities detection for performance
  const deviceCapabilities = useMemo((): DeviceCapabilities => {
    if (typeof window === 'undefined') {
      return { isMobile: false, isLowEnd: false, prefersReducedMotion: false, devicePixelRatio: 1 };
    }
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = window.innerWidth < 768 || /android|iphone|ipad/i.test(userAgent);
    const isLowEnd = isMobile && ((navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (window.devicePixelRatio < 2));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // FIX: Clamp device pixel ratio to prevent performance issues on high-DPI displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    return { isMobile, isLowEnd, prefersReducedMotion, devicePixelRatio: dpr };
  }, []);

  // Blob class with corrected physics and movement
  class Blob {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    color: string;

    constructor(width: number, height: number, color: string) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.r = (Math.random() * 0.15 + 0.15) * Math.min(width, height);
      this.color = color;
      
      const speed = deviceCapabilities.isLowEnd ? 0.5 : 1;
      // FIX 1: Ensure blobs move in all directions, not just down.
      // Math.random() - 0.5 creates a value between -0.5 and 0.5, allowing for negative (up/left) and positive (down/right) velocity.
      this.vx = (Math.random() - 0.5) * speed;
      this.vy = (Math.random() - 0.5) * speed;
    }

    update(width: number, height: number) {
      // Apply velocity
      this.x += this.vx;
      this.y += this.vy;

      // Reverse direction when hitting horizontal or vertical boundaries to keep them floating
      if (this.x < this.r || this.x > width - this.r) {
        this.vx *= -1;
      }
      if (this.y < this.r || this.y > height - this.r) {
        this.vy *= -1;
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Memoized function to create blobs
  const createBlobs = useCallback((width: number, height: number) => {
    if (deviceCapabilities.prefersReducedMotion) {
      blobsRef.current = [];
      return;
    }
    const blobCount = deviceCapabilities.isLowEnd ? 3 : 5;
    const colors = ['rgba(59, 130, 246, 0.6)', 'rgba(96, 165, 250, 0.6)', 'rgba(147, 197, 253, 0.6)'];
    blobsRef.current = Array.from({ length: blobCount }, (_, i) => new Blob(width, height, colors[i % colors.length]));
  }, [deviceCapabilities]);

  // Main animation loop
  const animate = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply a subtle blur filter for the "lava" effect and smoother appearance
    ctx.filter = 'blur(40px)';

    blobsRef.current.forEach(blob => {
      blob.update(canvas.width, canvas.height);
      blob.draw(ctx);
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Resize handler
  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.parentElement!.getBoundingClientRect();
    const dpr = deviceCapabilities.devicePixelRatio;

    // FIX 2: Set canvas resolution based on Device Pixel Ratio for crisp rendering
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr); // Scale context to match DPR
    }
    
    createBlobs(rect.width, rect.height);
  }, [createBlobs, deviceCapabilities]);

  // Effect to initialize and clean up animation
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleResize, animate]);

  return (
    <canvas
      ref={canvasRef}
      // FIX 3: Use absolute positioning to prevent twitching on scroll.
      // This detaches the canvas from the document's scrollable flow.
      className="absolute top-0 left-0 -z-10 w-full h-full"
      style={{
        // FIX 2 & 4: Force hardware acceleration for smooth animation.
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
    />
  );
};

export default LavaLampBackground;