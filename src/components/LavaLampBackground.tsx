import React, { useRef, useEffect, useCallback, useMemo } from 'react';

/**
 * COMPREHENSIVE MOBILE-OPTIMIZED BLOB ANIMATION FIX
 * 
 * Key Issues Addressed:
 * 1. Downward sinking behavior → Multi-directional floating with proper physics
 * 2. Performance degradation → Device-specific optimizations and efficient rendering
 * 3. Scroll-induced twitching → Scroll isolation and viewport-aware animation
 * 4. Device performance disparity → Tiered performance system with graceful degradation
 */

// Enhanced performance tier system with more granular device detection
type PerformanceTier = 'low' | 'medium' | 'high' | 'ultra';

interface DeviceCapabilities {
  tier: PerformanceTier;
  prefersReducedMotion: boolean;
  dpr: number;
  supportsHardwareAcceleration: boolean;
  isHighRefreshRate: boolean;
  memoryLevel: 'low' | 'medium' | 'high';
}

/**
 * Enhanced device performance detection with specific iPhone 12 Pro Max optimizations
 */
const useDevicePerformance = (): DeviceCapabilities => {
  const capabilities = useMemo((): DeviceCapabilities => {
    if (typeof window === 'undefined') {
      return {
        tier: 'high',
        prefersReducedMotion: false,
        dpr: 1,
        supportsHardwareAcceleration: true,
        isHighRefreshRate: false,
        memoryLevel: 'high'
      };
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance
    
    // Enhanced hardware detection
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4; // GB
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Detect high refresh rate displays (120Hz+)
    const isHighRefreshRate = window.screen && (window.screen as any).refreshRate > 60;
    
    // Hardware acceleration support detection
    const supportsHardwareAcceleration = (() => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    })();

    // Memory level classification
    let memoryLevel: 'low' | 'medium' | 'high' = 'medium';
    if (memory <= 2) memoryLevel = 'low';
    else if (memory >= 6) memoryLevel = 'high';

    // Enhanced device tier classification
    let tier: PerformanceTier = 'medium';
    
    // iPhone 12 Pro Max specific detection and optimization
    const isIPhone12ProMax = /iphone.*os (14|15|16|17)/.test(userAgent) && 
                             window.screen.width >= 390 && window.screen.height >= 844;
    
    if (isIPhone12ProMax) {
      // iPhone 12 Pro Max gets 'high' tier (A14 Bionic is very capable)
      tier = 'high';
    } else if (cores <= 2 || memory <= 2) {
      tier = 'low';
    } else if (cores >= 8 && memory >= 8) {
      tier = 'ultra';
    } else if (cores >= 6 || memory >= 4) {
      tier = 'high';
    }

    return {
      tier,
      prefersReducedMotion,
      dpr,
      supportsHardwareAcceleration,
      isHighRefreshRate,
      memoryLevel
    };
  }, []);

  return capabilities;
};

// Performance settings optimized for each tier
const performanceSettings = {
  low: { 
    blobCount: 2, 
    useMorphing: false, 
    quality: 'low' as ImageSmoothingQuality,
    targetFPS: 30,
    useComplexPhysics: false,
    blurRadius: 15
  },
  medium: { 
    blobCount: 3, 
    useMorphing: false, 
    quality: 'medium' as ImageSmoothingQuality,
    targetFPS: 45,
    useComplexPhysics: true,
    blurRadius: 20
  },
  high: { 
    blobCount: 4, 
    useMorphing: true, 
    quality: 'high' as ImageSmoothingQuality,
    targetFPS: 60,
    useComplexPhysics: true,
    blurRadius: 25
  },
  ultra: { 
    blobCount: 5, 
    useMorphing: true, 
    quality: 'high' as ImageSmoothingQuality,
    targetFPS: 120,
    useComplexPhysics: true,
    blurRadius: 30
  }
};

/**
 * FIXED BLOB CLASS - Addresses sinking behavior and performance issues
 */
class Blob {
  x: number;
  y: number;
  r: number;
  color: string;
  vx: number;
  vy: number;
  
  // FIX 1: Enhanced physics properties for natural floating motion
  centerX: number;
  centerY: number;
  orbitRadius: number;
  orbitSpeed: number;
  floatPhase: number;
  dampening: number;
  
  // FIX 2: Performance optimization properties
  lastUpdateTime: number;
  isVisible: boolean;

  constructor(x: number, y: number, r: number, color: string, canvasWidth: number, canvasHeight: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    
    // FIX 1: Improved velocity system - prevents downward sinking
    // Create more balanced initial velocities with upward bias to counter gravity-like behavior
    const speed = 0.3 + Math.random() * 0.4; // Reduced base speed for smoother motion
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 0.1; // Slight upward bias to prevent sinking
    
    // FIX 1: Orbital motion system for natural floating behavior
    this.centerX = canvasWidth * (0.3 + Math.random() * 0.4); // Center area
    this.centerY = canvasHeight * (0.3 + Math.random() * 0.4);
    this.orbitRadius = 50 + Math.random() * 100; // Orbit around center point
    this.orbitSpeed = 0.001 + Math.random() * 0.002; // Slow orbital motion
    this.floatPhase = Math.random() * Math.PI * 2; // Random starting phase
    this.dampening = 0.995; // Slight dampening to prevent runaway motion
    
    // Performance tracking
    this.lastUpdateTime = 0;
    this.isVisible = true;
  }

  /**
   * FIX 1 & 2: Enhanced update method with multi-directional floating physics
   */
  update(width: number, height: number, deltaTime: number, settings: any) {
    // FIX 2: Frame-rate independent physics
    const normalizedDelta = Math.min(deltaTime / 16.67, 2); // Cap delta to prevent large jumps
    
    if (settings.useComplexPhysics) {
      // FIX 1: Complex physics for natural floating motion
      
      // Orbital motion component - creates gentle circular/elliptical paths
      this.floatPhase += this.orbitSpeed * normalizedDelta;
      const orbitX = Math.cos(this.floatPhase) * this.orbitRadius * 0.3;
      const orbitY = Math.sin(this.floatPhase * 0.7) * this.orbitRadius * 0.2; // Different frequency for Y
      
      // Attraction to center with orbital offset
      const targetX = this.centerX + orbitX;
      const targetY = this.centerY + orbitY;
      
      const dx = targetX - this.x;
      const dy = targetY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Gentle attraction force (prevents aggressive movement)
      if (distance > 5) {
        const force = 0.002 * normalizedDelta;
        this.vx += (dx / distance) * force;
        this.vy += (dy / distance) * force;
      }
      
      // FIX 1: Add subtle random floating motion
      this.vx += (Math.random() - 0.5) * 0.01 * normalizedDelta;
      this.vy += (Math.random() - 0.5) * 0.01 * normalizedDelta;
      
      // Apply dampening to prevent runaway motion
      this.vx *= this.dampening;
      this.vy *= this.dampening;
      
    } else {
      // Simplified physics for low-end devices
      this.vx += (Math.random() - 0.5) * 0.005 * normalizedDelta;
      this.vy += (Math.random() - 0.5) * 0.005 * normalizedDelta;
      this.vx *= 0.998;
      this.vy *= 0.998;
    }
    
    // Apply velocity
    this.x += this.vx * normalizedDelta;
    this.y += this.vy * normalizedDelta;
    
    // FIX 1: Improved boundary handling - bouncy and energy-preserving
    const margin = this.r;
    if (this.x < margin) {
      this.x = margin;
      this.vx = Math.abs(this.vx) * 0.8; // Bounce with energy retention
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
    
    // Update center point occasionally for variety
    if (Math.random() < 0.001) {
      this.centerX += (Math.random() - 0.5) * 20;
      this.centerY += (Math.random() - 0.5) * 20;
      this.centerX = Math.max(width * 0.2, Math.min(width * 0.8, this.centerX));
      this.centerY = Math.max(height * 0.2, Math.min(height * 0.8, this.centerY));
    }
  }

  /**
   * FIX 2: Optimized drawing with hardware acceleration hints
   */
  draw(ctx: CanvasRenderingContext2D, useMorphing: boolean) {
    ctx.save();
    
    // Hardware acceleration hint
    ctx.translate(this.x, this.y);
    
    if (useMorphing) {
      // Morphing effect for high-end devices
      const morphFactor = Math.sin(this.floatPhase * 2) * 0.1;
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
 * MAIN COMPONENT - Optimized LavaLampBackground with comprehensive fixes
 */
const LavaLampBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const blobsRef = useRef<Blob[]>([]);
  const lastFrameTimeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  
  // FIX 3: Scroll position tracking to prevent scroll interference
  const scrollYRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);
  
  const capabilities = useDevicePerformance();
  const settings = performanceSettings[capabilities.tier];

  /**
   * FIX 3: Scroll-aware blob creation and management
   */
  const createBlobs = useCallback((width: number, height: number) => {
    if (capabilities.prefersReducedMotion) {
      blobsRef.current = [];
      return;
    }

    const count = settings.blobCount;
    const colors = [
      'rgba(59, 130, 246, 0.7)',   // Blue
      'rgba(96, 165, 250, 0.6)',   // Light blue  
      'rgba(147, 197, 253, 0.5)',  // Lighter blue
      'rgba(191, 219, 254, 0.4)',  // Very light blue
      'rgba(219, 234, 254, 0.3)'   // Ultra light blue
    ];
    
    const newBlobs: Blob[] = [];
    const baseRadius = Math.min(width, height) * (capabilities.tier === 'low' ? 0.15 : 0.12);

    for (let i = 0; i < count; i++) {
      // Distribute blobs more evenly across the canvas
      const angle = (i / count) * Math.PI * 2;
      const distance = Math.min(width, height) * 0.2;
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
  }, [capabilities.prefersReducedMotion, capabilities.tier, settings.blobCount]);

  /**
   * FIX 2 & 3: Optimized animation loop with scroll isolation
   */
  const animate = useCallback((currentTime: number) => {
    if (!canvasRef.current || !isVisibleRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // FIX 2: Adaptive frame rate control
    const targetFrameTime = 1000 / settings.targetFPS;
    const deltaTime = currentTime - lastFrameTimeRef.current;
    
    if (deltaTime < targetFrameTime * 0.9) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    
    lastFrameTimeRef.current = currentTime;
    
    // FIX 3: Skip expensive operations during scrolling
    if (isScrollingRef.current && capabilities.tier !== 'ultra') {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    
    // Clear canvas with optimized method
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // FIX 2: Optimized background gradient based on device capability
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (capabilities.tier === 'low') {
      // Simple 2-stop gradient for low-end devices
      gradient.addColorStop(0, '#f0f9ff');
      gradient.addColorStop(1, '#7dd3fc');
    } else {
      // Rich gradient for capable devices
      gradient.addColorStop(0, '#f0f9ff');
      gradient.addColorStop(0.3, '#e0f2fe');
      gradient.addColorStop(0.7, '#7dd3fc');
      gradient.addColorStop(1, '#38bdf8');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // FIX 2: Conditional blur effect based on device performance
    if (capabilities.supportsHardwareAcceleration && capabilities.tier !== 'low') {
      ctx.filter = `blur(${settings.blurRadius}px)`;
    }
    
    // Update and draw blobs
    const canvasWidth = canvas.width / capabilities.dpr;
    const canvasHeight = canvas.height / capabilities.dpr;
    
    blobsRef.current.forEach(blob => {
      blob.update(canvasWidth, canvasHeight, deltaTime, settings);
      blob.draw(ctx, settings.useMorphing);
    });
    
    // Reset filter
    if (ctx.filter !== 'none') {
      ctx.filter = 'none';
    }
    
    // FIX 2: Metaball effect for capable devices
    if (capabilities.tier !== 'low') {
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [capabilities, settings]);

  /**
   * FIX 3: Scroll event handling to prevent animation interference
   */
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      isScrollingRef.current = true;
      scrollYRef.current = window.scrollY;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150); // Stop considering "scrolling" after 150ms of no scroll events
    };
    
    // Use passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  /**
   * Main effect for canvas setup and lifecycle management
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || capabilities.prefersReducedMotion) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      
      // FIX 2: Optimized canvas sizing
      canvas.width = rect.width * capabilities.dpr;
      canvas.height = rect.height * capabilities.dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(capabilities.dpr, capabilities.dpr);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = settings.quality;
      }
      
      createBlobs(rect.width, rect.height);
    };

    handleResize();
    
    // FIX 2: Debounced resize with device-specific timing
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      const delay = capabilities.tier === 'low' ? 300 : 150;
      resizeTimeout = setTimeout(handleResize, delay);
    };
    
    window.addEventListener('resize', debouncedResize, { passive: true });

    // FIX 3: Intersection Observer to pause animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        
        if (entry.isIntersecting && !animationFrameRef.current) {
          lastFrameTimeRef.current = performance.now();
          animationFrameRef.current = requestAnimationFrame(animate);
        } else if (!entry.isIntersecting && animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = undefined;
        }
      },
      { 
        threshold: 0.01,
        rootMargin: '50px' // Start animation slightly before visible
      }
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
  }, [animate, createBlobs, capabilities, settings]);

  // Don't render anything if reduced motion is preferred
  if (capabilities.prefersReducedMotion) {
    return (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-sky-50 to-sky-200" />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full bg-sky-100 -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          // FIX 2 & 3: Optimized CSS for hardware acceleration and scroll isolation
          willChange: isScrollingRef.current ? 'auto' : 'transform',
          transform: 'translate3d(0, 0, 0)', // Force GPU layer
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          // Prevent scroll interference
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none', // Prevent interaction interference
          // Anti-aliasing for crisp rendering
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      />
    </div>
  );
};

export default LavaLampBackground;