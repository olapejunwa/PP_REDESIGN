import React, { useRef, useEffect, useCallback, useMemo } from 'react';

/**
 * Optimized LavaLampBackground Component for Mobile Performance
 * 
 * Key Mobile Optimizations:
 * - Hardware acceleration with transform3d and will-change
 * - Reduced blob count and complexity on mobile
 * - Frame rate throttling (30fps on mobile, 60fps on desktop)
 * - Simplified rendering path for mobile devices
 * - Memory-efficient blob management
 * - Proper pixel density handling for high-DPI screens
 */

interface DeviceCapabilities {
  isMobile: boolean;
  isLowEnd: boolean;
  supportsHardwareAcceleration: boolean;
  devicePixelRatio: number;
  prefersReducedMotion: boolean;
}

const LavaLampBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const lastFrameTimeRef = useRef<number>(0);
  const blobsRef = useRef<Blob[]>([]);

  // Memoized device capabilities detection
  const deviceCapabilities = useMemo((): DeviceCapabilities => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isLowEnd: false,
        supportsHardwareAcceleration: true,
        devicePixelRatio: 1,
        prefersReducedMotion: false
      };
    }

    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = isMobile && (navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    return {
      isMobile,
      isLowEnd,
      supportsHardwareAcceleration: 'transform3d' in document.createElement('div').style,
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 3), // Limit DPR on mobile
      prefersReducedMotion
    };
  }, []);

  // Performance-optimized Blob class with mobile considerations
  class Blob {
    x: number;
    y: number;
    r: number;
    color1: string;
    color2: string;
    vx: number;
    vy: number;
    phase: number;
    morphIntensity: number;

    constructor(x: number, y: number, r: number, color1: string, color2: string) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.color1 = color1;
      this.color2 = color2;
      
      // Reduced velocity on mobile for smoother performance
      const speedMultiplier = deviceCapabilities.isMobile ? 0.8 : 1.2;
      this.vx = (Math.random() - 0.5) * speedMultiplier;
      this.vy = (Math.random() - 0.5) * speedMultiplier;
      
      this.phase = Math.random() * Math.PI * 2;
      // Reduced morphing on mobile to save GPU resources
      this.morphIntensity = deviceCapabilities.isMobile ? 0.05 : 0.1;
    }

    // Optimized drawing with hardware acceleration hints
    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      
      // Use hardware-accelerated transforms
      ctx.translate(this.x, this.y);
      
      // Simplified gradient creation for mobile
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.r);
      gradient.addColorStop(0, this.color1);
      gradient.addColorStop(0.7, this.color1);
      gradient.addColorStop(1, this.color2);
      ctx.fillStyle = gradient;
      
      ctx.beginPath();
      
      if (deviceCapabilities.isMobile || deviceCapabilities.prefersReducedMotion) {
        // Simple circle on mobile for better performance
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
      } else {
        // Morphing blob on desktop
        const morphFactor = Math.sin(this.phase) * this.morphIntensity;
        const radiusX = this.r * (1 + morphFactor);
        const radiusY = this.r * (1 - morphFactor * 0.5);
        
        ctx.scale(radiusX / this.r, radiusY / this.r);
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
      }
      
      ctx.fill();
      ctx.restore();
    }

    // Optimized update with frame-rate independent movement
    update(width: number, height: number, deltaTime: number) {
      // Throttle morphing updates on mobile
      if (!deviceCapabilities.isMobile) {
        this.phase += deltaTime * 0.001;
      }
      
      // Simplified physics on mobile
      const centerX = width / 2;
      const centerY = height / 2;
      const distanceToCenter = Math.sqrt(
        Math.pow(this.x - centerX, 2) + Math.pow(this.y - centerY, 2)
      );
      
      // Gentle center attraction
      if (distanceToCenter > Math.min(width, height) * 0.35) {
        const attractionForce = deviceCapabilities.isMobile ? 0.00005 : 0.0001;
        this.vx += (centerX - this.x) * attractionForce;
        this.vy += (centerY - this.y) * attractionForce;
      }
      
      // Boundary collision with performance-optimized checks
      if (this.x < this.r || this.x > width - this.r) {
        this.vx *= -0.7;
        this.x = Math.max(this.r, Math.min(width - this.r, this.x));
      }
      if (this.y < this.r || this.y > height - this.r) {
        this.vy *= -0.7;
        this.y = Math.max(this.r, Math.min(height - this.r, this.y));
      }
      
      // Apply velocity with frame-rate independent movement
      const normalizedDelta = deltaTime / 16.67; // Normalize to 60fps baseline
      this.vx *= 0.998;
      this.vy *= 0.998;
      this.x += this.vx * normalizedDelta;
      this.y += this.vy * normalizedDelta;
    }
  }

  // Memoized blob creation with mobile optimization
  const createBlobs = useCallback((width: number, height: number) => {
    const baseRadius = Math.min(width, height) * (deviceCapabilities.isMobile ? 0.18 : 0.12);
    const radiusVariation = baseRadius * 0.4;
    
    // High-contrast colors optimized for mobile displays
    const colors = [
      { primary: 'rgba(59, 130, 246, 0.7)', secondary: 'rgba(37, 99, 235, 0.1)' },
      { primary: 'rgba(96, 165, 250, 0.6)', secondary: 'rgba(59, 130, 246, 0.1)' },
      { primary: 'rgba(147, 197, 253, 0.5)', secondary: 'rgba(96, 165, 250, 0.1)' },
      { primary: 'rgba(191, 219, 254, 0.4)', secondary: 'rgba(147, 197, 253, 0.1)' },
    ];
    
    // Reduced blob count on mobile and low-end devices
    if (deviceCapabilities.isLowEnd || deviceCapabilities.prefersReducedMotion) {
      blobsRef.current = [
        new Blob(width * 0.3, height * 0.4, baseRadius, colors[0].primary, colors[0].secondary),
      ];
    } else if (deviceCapabilities.isMobile) {
      blobsRef.current = [
        new Blob(width * 0.25, height * 0.35, baseRadius, colors[0].primary, colors[0].secondary),
        new Blob(width * 0.75, height * 0.65, baseRadius + radiusVariation, colors[1].primary, colors[1].secondary),
      ];
    } else {
      blobsRef.current = [
        new Blob(width * 0.2, height * 0.3, baseRadius, colors[0].primary, colors[0].secondary),
        new Blob(width * 0.8, height * 0.7, baseRadius + radiusVariation, colors[1].primary, colors[1].secondary),
        new Blob(width * 0.5, height * 0.5, baseRadius - radiusVariation * 0.2, colors[2].primary, colors[2].secondary),
        new Blob(width * 0.15, height * 0.8, baseRadius - radiusVariation * 0.4, colors[3].primary, colors[3].secondary),
      ];
    }
  }, [deviceCapabilities]);

  // Frame-rate throttled animation loop
  const animate = useCallback((currentTime: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Frame rate throttling: 30fps on mobile, 60fps on desktop
    const targetFrameRate = deviceCapabilities.isMobile ? 33.33 : 16.67; // ms per frame
    const deltaTime = currentTime - lastFrameTimeRef.current;
    
    if (deltaTime < targetFrameRate) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    
    lastFrameTimeRef.current = currentTime;
    
    // Clear canvas with optimized background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Simplified background gradient for mobile
    if (deviceCapabilities.isMobile) {
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, '#f0f9ff');
      bgGradient.addColorStop(1, '#7dd3fc');
      ctx.fillStyle = bgGradient;
    } else {
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, '#f0f9ff');
      bgGradient.addColorStop(0.3, '#e0f2fe');
      bgGradient.addColorStop(0.7, '#7dd3fc');
      bgGradient.addColorStop(1, '#38bdf8');
      ctx.fillStyle = bgGradient;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw blobs with performance monitoring
    blobsRef.current.forEach(blob => {
      blob.update(canvas.width, canvas.height, deltaTime);
      blob.draw(ctx);
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [deviceCapabilities]);

  // Optimized resize handler with debouncing
  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Optimized pixel ratio handling for mobile
    const dpr = deviceCapabilities.devicePixelRatio;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      
      // Mobile-optimized rendering settings
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = deviceCapabilities.isMobile ? 'low' : 'high';
    }
    
    createBlobs(rect.width, rect.height);
  }, [createBlobs, deviceCapabilities]);

  useEffect(() => {
    // Debounced resize handler for better performance
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, deviceCapabilities.isMobile ? 200 : 100);
    };

    window.addEventListener('resize', debouncedResize, { passive: true });
    handleResize(); // Initial setup
    
    // Start animation with reduced motion check
    if (!deviceCapabilities.prefersReducedMotion) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [handleResize, animate, deviceCapabilities.prefersReducedMotion]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
      style={{
        // Hardware acceleration and performance optimizations
        willChange: 'transform, opacity',
        transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
        backfaceVisibility: 'hidden', // Prevent flickering
        WebkitBackfaceVisibility: 'hidden',
        imageRendering: deviceCapabilities.isMobile ? '-webkit-optimize-contrast' : 'auto',
        touchAction: 'none', // Prevent scroll interference on mobile
        // Anti-aliasing for crisp rendering
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    />
  );
};

export default LavaLampBackground;