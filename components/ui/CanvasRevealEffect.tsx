"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export const CanvasRevealEffect = ({
  animationSpeed = 3,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize = 3,
  showGradient = true,
}: {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Kare boyutu ve hücre aralığı (orijinal DotMatrix görünümü)
    const squareSize = dotSize ? dotSize + 1 : 4;
    const totalSize = squareSize + 4;

    const hash = (x: number, y: number) => {
      const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
      return h - Math.floor(h);
    };

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / totalSize);
      const rows = Math.ceil(height / totalSize);
      const centerX = cols / 2;
      const centerY = rows / 2;

      const speedFactor = animationSpeed * 0.25;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const dist = Math.hypot(i - centerX, j - centerY);
          const randOffset = hash(i, j);

          // Merkezden dışa doğru kare kare yayılma matematiği
          const introOffset = dist * 0.03 + randOffset * 0.25;
          if (elapsed * speedFactor < introOffset) continue;

          // Karelerin dinamik olarak parlayıp sönmesi (twinkle efekti)
          const freq = 3.5;
          const timeStep = Math.floor(elapsed * freq + randOffset * 10);
          const randOpacityIdx = Math.floor(
            hash(i + timeStep, j * timeStep) * opacities.length
          );
          const alpha = opacities[randOpacityIdx] ?? 0.5;

          const colorIdx = Math.floor(randOffset * colors.length);
          const color = colors[colorIdx] || colors[0] || [0, 255, 255];

          ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
          ctx.fillRect(
            i * totalSize,
            j * totalSize,
            squareSize,
            squareSize
          );
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [animationSpeed, colors, dotSize, opacities]);

  return (
    <div className={cn("h-full relative w-full", containerClassName)}>
      <canvas ref={canvasRef} className="h-full w-full block" />
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%] pointer-events-none" />
      )}
    </div>
  );
};