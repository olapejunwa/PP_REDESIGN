import React, { useRef, useEffect, useCallback, useMemo } from 'react';

/**
 * FIXED LAVA LAMP BACKGROUND - Mobile Optimized
 * 
 * Key Fixes Applied:
 * 1. Simplified device detection that actually works
 * 2. Proper blob physics to prevent sinking
 * 3. Scroll isolation to prevent jank
 * 4. Performance optimization for iPhone 12 Pro Max
 */

// Simplified performance tiers
type PerformanceTier = 'low' | 'medium' | 'high';

interface DeviceCapabilities {
  tier: PerformanceTier;
  prefersReducedMotion: boolean;
  dpr: number;
  isMobile: boolean;
}

/**
 * WORKING device performance detection
 */
const useDevicePerformance = (): DeviceCapabilities => {
  const capabilities = useMemo((): DeviceCapabilities => {
    if (typeof window === 'undefined') {
      return {
        tier: 'high',
        prefersReducedMotion: false,
        dpr: 1,
        isMobile: false
      };
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    // Simple mobile detection
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) || 
                     window.innerWidth <= 768;
    
    // Hardware detection
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4;
    
    // Tier classification - iPhone 12 Pro Max should get 'high'
    let tier: PerformanceTier = 'medium';
    
    if (cores <= 2 || memory <= 2) {
      tier = 'low';
    } else if (cores >= 6 || memory >= 4) {
      tier = 'high'; // iPhone 12 Pro Max falls here
    }

    return {
      tier,
      prefersReducedMotion,
      dpr,
      isMobile
    };
  }, []);

  return capabilities;
};

// Performance settings
const performanceSettings = {
  low: { 
    blobCount: 2, 
    targetFPS: 30,
    blurRadius: 15,
    useMorphing: false
  },
  medium: { 
    blobCount: 3, 
    targetFPS: 45,
    blurRadius: 20,
    useMorphing: false
  },
  high: { 
    blobCount: 4, 
    targetFPS: 60,
    blurRadius: 25,
    useMorphing: true
  }
};

/**
 * FIXED Blob class with proper physics
 */
class Blob {
  x: number;
  y: number;
  r: number;
  color: string;
  vx: number;
  vy: number;
  centerX: number;
  centerY: number;
  orbitRadius: number;
  orbitSpeed: number;
  phase: number;

  constructor(x: number, y: number, r: number, color: string, canvasWidth: number, canvasHeight: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    
    // FIXED: Better initial velocity to prevent sinking
    const speed = 0.5 + Math.random() * 0.5;
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 0.2; // Upward bias
    
    // Orbital motion properties
    this.centerX = canvasWidth * (0.3 + Math.random() * 0.4);
    this.centerY = canvasHeight * (0.3 + Math.random() * 0.4);
    this.orbitRadius = 30 + Math.random() * 60;
    this.orbitSpeed = 0.002 + Math.random() * 0.003;
    this.phase = Math.random() * Math.PI * 2;
  }

  update(width: number, height: number, deltaTime: number) {
    const normalizedDelta = Math.min(deltaTime / 16.67, 2);
    
    // FIXED: Orbital motion prevents sinking
    this.phase += this.orbitSpeed * normalizedDelta;
    const orbitX = Math.cos(this.phase) * this.orbitRadius * 0.3;
    const orbitY = Math.sin(this.phase * 0.7) * this.orbitRadius * 0.2;
    
    const targetX = this.centerX + orbitX;
    const targetY = this.centerY + orbitY;
    
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 5) {
      const force = 0.003 * normalizedDelta;
      this.vx += (dx / distance) * force;
      this.vy += (dy / distance) * force;
    }
    
    // Add random motion
    this.vx += (Math.random() - 0.5) * 0.02 * normalizedDelta;
    this.vy += (Math.random() - 0.5) * 0.02 * normalizedDelta;
    
    // Damping
    this.vx *= 0.995;
    this.vy *= 0.995;
    
    // Apply velocity
    this.x += this.vx * normalizedDelta;
    this.y += this.vy * normalizedDelta;
    
    // FIXED: Better boundary handling
    const margin = this.r;
    if (this.x < margin) {
      this.x = margin;
      this.vx = Math.abs(this.vx) * 0.8;
    } else if (this.x > width - margin) {
      this.x = width - margin;
      this.vx = -Math.abs(this.vx) * 0.8;
    }
    
    if (this.y < margin) {
      this.y = margin;
      this.vy = Math.abs(this.vy) * 0.8;
    } else if (this.y > height - margin) {
      this.y = height - margin;
      this.vy = -Math.abs(this.vy) * 0.8;
    }
  }

  draw(ctx: CanvasRenderingContext2D, useMorphing: boolean) {
    ctx.save();
    ctx.translate(this.x, this.y);
    
    if (useMorphing) {
      const morphFactor = Math.sin(this.phase * 2) * 0.1;
      ctx.scale(1 + morphFactor, 1 - morphFactor * 0.5);
    }
    
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    ctx.restore();
  }
}

/**
 * MAIN COMPONENT - Fixed and Working
 */
const LavaLampBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const blobsRef = useRef<Blob[]>([]);
  const lastFrameTimeRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);
  
  const capabilities = useDevicePerformance();
  const settings = performanceSettings[capabilities.tier];

  // FIXED: Scroll handling
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      isScrollingRef.current = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const createBlobs = useCallback((width: number, height: number) => {
    if (capabilities.prefersReducedMotion) {
      blobsRef.current = [];
      return;
    }

    const count = settings.blobCount;
    const colors = [
      'rgba(59, 130, 246, 0.7)',
      'rgba(96, 165, 250, 0.6)',
      'rgba(147, 197, 253, 0.5)',
      'rgba(191, 219, 254, 0.4)'
    ];
    
    const newBlobs: Blob[] = [];
    const baseRadius = Math.min(width, height) * 0.12;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const distance = Math.min(width, height) * 0.15;
      const centerX = width * 0.5 + Math.cos(angle) * distance;
      const centerY = height * 0.5 + Math.sin(angle) * distance;
      
      newBlobs.push(new Blob(
        centerX + (Math.random() - 0.5) * 100,
        centerY + (Math.random() - 0.5) * 100,
        baseRadius * (0.8 + Math.random() * 0.4),
        colors[i % colors.length],
        width,
        height
      ));
    }
    
    blobsRef.current = newBlobs;
  }, [capabilities.prefersReducedMotion, settings.blobCount]);

  const animate = useCallback((currentTime: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Frame rate control
    const targetFrameTime = 1000 / settings.targetFPS;
    const deltaTime = currentTime - lastFrameTimeRef.current;
    
    if (deltaTime < targetFrameTime * 0.9) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    
    lastFrameTimeRef.current = currentTime;
    
    // Skip expensive operations during scrolling on lower-end devices
    if (isScrollingRef.current && capabilities.tier === 'low') {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // FIXED: Always draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f0f9ff');
    gradient.addColorStop(0.3, '#e0f2fe');
    gradient.addColorStop(0.7, '#7dd3fc');
    gradient.addColorStop(1, '#38bdf8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Apply blur for metaball effect
    if (capabilities.tier !== 'low') {
      ctx.filter = `blur(${settings.blurRadius}px)`;
    }
    
    // Draw blobs
    const canvasWidth = canvas.width / capabilities.dpr;
    const canvasHeight = canvas.height / capabilities.dpr;
    
    blobsRef.current.forEach(blob => {
      blob.update(canvasWidth, canvasHeight, deltaTime);
      blob.draw(ctx, settings.useMorphing);
    });
    
    // Reset filter
    ctx.filter = 'none';
    
    // Metaball effect
    if (capabilities.tier !== 'low') {
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [capabilities, settings]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * capabilities.dpr;
      canvas.height = rect.height * capabilities.dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(capabilities.dpr, capabilities.dpr);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
      
      createBlobs(rect.width, rect.height);
    };

    handleResize();
    
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };
    
    window.addEventListener('resize', debouncedResize, { passive: true });

    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationFrameRef.current) {
          lastFrameTimeRef.current = performance.now();
          animationFrameRef.current = requestAnimationFrame(animate);
        } else if (!entry.isIntersecting && animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = undefined;
        }
      },
      { threshold: 0.01 }
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
  }, [animate, createBlobs, capabilities]);

  // FIXED: Fallback for reduced motion
  if (capabilities.prefersReducedMotion) {
    return (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-sky-50 to-sky-200 -z-10" />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full bg-sky-100 -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange: isScrollingRef.current ? 'auto' : 'transform',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default LavaLampBackground;