'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

export function GalaxyBackground({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const numStars = 15000; // Increased density

    // Galaxy rotation parameters
    let angle = 0.0008;
    const speed = 0.0003; // Slightly slower for majesty

    const resizeCanvas = () => {
      // Set canvas to match parent size
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        // Create a galaxy disk distribution with more density near center
        // Using exponent to cluster stars
        const r = Math.random() ** 1.5 * Math.max(canvas.width, canvas.height);
        const theta = Math.random() * Math.PI * 2;

        // Add spread in Z for 3D volume, deeper field
        const z = (Math.random() - 0.5) * 2000;

        // More colorful palette: Blues (200-240), Purples (240-280), Pinks (280-320), Cyan (160-200)
        // Occasional white/yellowish
        let hue = Math.random() * 60 + 200; // Default blue-ish
        if (Math.random() > 0.6) hue = Math.random() * 60 + 240; // Purple/Pink
        if (Math.random() > 0.9) hue = Math.random() * 40 + 30; // Gold/Yellow hints

        stars.push({
          x: r * Math.cos(theta),
          y: r * Math.sin(theta),
          z: z,
          size: Math.random() * 1.5,
          color: `hsla(${hue}, 80%, 85%, ${Math.random() * 0.8 + 0.2})`,
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Center
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Rotate the galaxy
      angle += speed;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Simple 3D projection
      const fov = 800;

      stars.forEach((star) => {
        // Rotate around center
        const rx = star.x * cosA - star.y * sinA;
        const ry = star.x * sinA + star.y * cosA;

        const x = cx + rx;
        const y = cy + ry;

        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
          ctx.beginPath();
          ctx.arc(x, y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-20 h-full w-full bg-black"
      />
      {/* Nebula Haze Overlay - 'Milky Way' blur effect */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/20 via-slate-900/80 to-black/90 backdrop-blur-[1px] pointer-events-none" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
