import React, { useRef, useEffect, useCallback, useMemo } from 'react';

// Define performance tiers for clarity and easier management
type PerformanceTier = 'low' | 'medium' | 'high';

/**
 * Custom hook for determining device performance tier.
 * This simplifies the logic and makes the main component cleaner.
 */
const useDevicePerformance = (): { tier: PerformanceTier, prefersReducedMotion: boolean, dpr: number } => {
  const performanceInfo = useMemo(() => {
    if (typeof window === 'undefined') {
      return { tier: 'high' as PerformanceTier, prefersReducedMotion: false, dpr: 1 };
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2 for performance

    // Use more reliable hardware metrics over User-Agent sniffing
    const cores = navigator.hardwareConcurrency || 4;

    let tier: PerformanceTier = 'medium';
    if (cores <= 2) {
      tier = 'low';
    } else if (cores >= 6) {
      tier = 'high';
    }

    // On iOS, all modern devices (A12 Bionic+, iPhone XS/XR+) have 6+ cores.
    // This correctly classifies iPhone 12 Pro Max as 'high' tier.

    return { tier, prefersReducedMotion, dpr };
  }, []);

  return performanceInfo;
};


// Define settings for each performance tier
const performanceSettings = {
  low: { blobCount: 2, useMorphing: false, quality: 'low' },
  medium: { blobCount: 3, useMorphing: false, quality: 'medium' },
  high: { blobCount: 4, useMorphing: true, quality: 'high' },
};

/**
 * A highly optimized Blob class for the animation.
 */
class Blob {
  x: number;
  y: number;
  r: number;
  color: string;
  vx: number;
  vy: number;
  // FIX: Added a random nudge to prevent static movement
  nudgeX: number;
  nudgeY: number;

  constructor(x: number, y: number, r: number, color: string) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;

    // FIX: Increased base velocity for a more "floaty" feel instead of sinking
    const baseSpeed = 0.8;
    this.vx = (Math.random() - 0.5) * 2 * baseSpeed; // Range is now -1 to 1 * baseSpeed
    this.vy = (Math.random() - 0.5) * 2 * baseSpeed;

    // Nudge values to add subtle, continuous random motion
    this.nudgeX = (Math.random() - 0.5) * 0.1;
    this.nudgeY = (Math.random() - 0.5) * 0.1;
  }

  update(width: number, height: number, deltaTime: number) {
    // Make movement frame-rate independent by using deltaTime
    const deltaCorrection = deltaTime / 16.67; // Normalize to 60fps baseline

    // Apply velocity and the subtle nudge
    this.x += (this.vx + this.nudgeX) * deltaCorrection;
    this.y += (this.vy + this.nudgeY) * deltaCorrection;

    // FIX: Changed boundary collision to be less "sticky" and more "bouncy"
    // This retains more energy and promotes multi-directional movement.
    if (this.x < this.r || this.x > width - this.r) {
      this.vx *= -0.9; // Was -0.7, now retains 90% of velocity
      this.x = Math.max(this.r, Math.min(width - this.r, this.x));
    }
    if (this.y < this.r || this.y > height - this.r) {
      this.vy *= -0.9; // Was -0.7, now retains 90% of velocity
      this.y = Math.max(this.r, Math.min(height - this.r, this.y));
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

/**
 * Optimized LavaLampBackground Component
 */
const LavaLampBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const blobsRef = useRef<Blob[]>([]);
  const { tier, prefersReducedMotion, dpr } = useDevicePerformance();

  const settings = performanceSettings[tier];

  // Memoized blob creation based on performance tier
  const createBlobs = useCallback((width: number, height: number) => {
    if (prefersReducedMotion) {
      blobsRef.current = [];
      return;
    }
    const count = settings.blobCount;
    const colors = ['rgba(59, 130, 246, 0.6)', 'rgba(96, 165, 250, 0.6)', 'rgba(147, 197, 253, 0.6)', 'rgba(191, 219, 254, 0.6)'];
    const newBlobs: Blob[] = [];
    const baseRadius = Math.min(width, height) * 0.2;

    for (let i = 0; i < count; i++) {
      newBlobs.push(new Blob(
        Math.random() * width,
        Math.random() * height,
        baseRadius * (Math.random() * 0.5 + 0.75), // Random radius
        colors[i % colors.length]
      ));
    }
    blobsRef.current = newBlobs;
  }, [prefersReducedMotion, settings.blobCount]);

  // Main animation loop
  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    // FIX: Removed manual FPS throttling. Let rAF run at the device's max speed.
    // We rely on deltaTime for smooth, frame-rate independent physics.
    const lastTime = animationFrameRef.current ? time - (animationFrameRef.current || 0) : 16.67;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Metaball effect using a global composite operation
    // This is more efficient than drawing complex shapes per-blob
    ctx.filter = `blur(${Math.min(canvas.width, canvas.height) * 0.05}px)`;
    
    // Draw all blobs
    blobsRef.current.forEach(blob => blob.draw(ctx));
    
    // Reset filter to apply the thresholding effect
    ctx.filter = 'none';
    
    // Use alpha threshold to create the sharp "lava" edges from the blurred shapes
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = '#e0f2fe'; // A single color for the final merged shape
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over'; // Reset composite operation

    // Update blob positions for the next frame
    blobsRef.current.forEach(blob => blob.update(canvas.width / dpr, canvas.height / dpr, lastTime));

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [dpr]);

  // Effect for initialization, resizing, and IntersectionObserver
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingQuality = settings.quality;
      }
      createBlobs(rect.width, rect.height);
    };

    handleResize(); // Initial setup
    
    // Debounced resize handler for performance
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };
    window.addEventListener('resize', debouncedResize, { passive: true });

    // FIX: Use IntersectionObserver to stop animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start animation when canvas is visible
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Stop animation when canvas is not visible to save resources
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = undefined;
          }
        }
      },
      { threshold: 0.01 } // Trigger even if 1% is visible
    );

    observer.observe(canvas);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      observer.unobserve(canvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [animate, createBlobs, prefersReducedMotion, dpr, settings.quality]);

  return (
    <div className="absolute inset-0 w-full h-full bg-sky-100 -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          // Use CSS properties to hint for hardware acceleration
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU layer
        }}
      />
    </div>
  );
};

export default LavaLampBackground;