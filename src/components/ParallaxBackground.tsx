import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef } from "react";

import dnaImage from "../assets/dna.png";
import proteinImage from "../assets/protein.png";

type BiomarkerShape = {
  id: number;
  type: "dna" | "protein";
  x: number; // percent
  y: number; // percent
  scale: number;
  rotation: number;
  opacity: number;
  depth: number;
  floatX: number;
  floatY: number;
  floatDuration: number;
  floatDelay: number;
  parallax: number;
  dirX: number;
  dirY: number;
};

type BiomarkerStyle = CSSProperties & {
  "--float-x"?: string;
  "--float-y"?: string;
};

export default function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 }); // -0.5..0.5
  const currentRef = useRef({ x: 0, y: 0 });

  const shapes = useMemo(() => {
    const generated: BiomarkerShape[] = [];
    const total = 90;

    for (let i = 0; i < total; i++) {
      const rand = Math.random();
      let x: number;
      let y: number;

      if (rand < 0.45) {
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
          case 0:
            x = Math.random() * 100;
            y = Math.random() * 16;
            break; // top
          case 1:
            x = 82 + Math.random() * 18;
            y = Math.random() * 100;
            break; // right
          case 2:
            x = Math.random() * 100;
            y = 84 + Math.random() * 16;
            break; // bottom
          default:
            x = Math.random() * 18;
            y = Math.random() * 100;
            break; // left
        }
      } else {
        x = Math.random() * 100;
        y = Math.random() * 100;
      }

      const types: BiomarkerShape["type"][] = ["dna", "protein"];
      const dirX = -1 + Math.random() * 2 || 0.4;
      const dirY = -1 + Math.random() * 2 || -0.4;

      generated.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        x,
        y,
        scale: 0.36 + Math.random() * 0.7,
        rotation: Math.random() * 360,
        opacity: 0.12 + Math.random() * 0.20,
        depth: 10 + Math.random() * 16,
        parallax: 0.9 + Math.random() * 0.8,
        dirX,
        dirY,
        floatX: -12 + Math.random() * 24,
        floatY: -14 + Math.random() * 24,
        floatDuration: 12 + Math.random() * 12,
        floatDelay: Math.random() * 5,
      });
    }

    // Add a few centrally biased shapes so the middle isn't too sparse.
    const centerExtras = 10;
    for (let i = 0; i < centerExtras; i++) {
      const baseId = total + i;
      const types: BiomarkerShape["type"][] = ["dna", "protein"];
      const dirX = -1 + Math.random() * 2 || 0.5;
      const dirY = -1 + Math.random() * 2 || -0.5;
      generated.push({
        id: baseId,
        type: types[Math.floor(Math.random() * types.length)],
        x: 35 + Math.random() * 30,
        y: 35 + Math.random() * 30,
        scale: 0.42 + Math.random() * 0.55,
        rotation: Math.random() * 360,
        opacity: 0.14 + Math.random() * 0.18,
        depth: 10 + Math.random() * 12,
        parallax: 1 + Math.random() * 0.7,
        dirX,
        dirY,
        floatX: -10 + Math.random() * 18,
        floatY: -12 + Math.random() * 18,
        floatDuration: 12 + Math.random() * 9,
        floatDelay: Math.random() * 4,
      });
    }

    return generated;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      targetRef.current.x = px - 0.5;
      targetRef.current.y = py - 0.5;
    };

    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;

      // Smooth follow for parallax
      cur.x += (tgt.x - cur.x) * 0.18;
      cur.y += (tgt.y - cur.y) * 0.18;

      el.style.setProperty("--mx", String(cur.x));
      el.style.setProperty("--my", String(cur.y));

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {shapes.map((shape) => {
        const weightX = Math.abs(shape.x - 50) / 50;
        const weightY = Math.abs(shape.y - 50) / 50;
        const parallaxStrength = 1.1;
        const motionBoost = 1.8 + Math.random() * 0.6;
        const floatStyle: BiomarkerStyle = {
          animationDuration: `${shape.floatDuration}s`,
          animationDelay: `${shape.floatDelay}s`,
          opacity: shape.opacity,
          filter:
            "brightness(0) saturate(100%) invert(74%) sepia(22%) saturate(1034%) hue-rotate(173deg) brightness(104%) contrast(88%)",
          transform: "translate(-50%, -50%)",
          "--float-x": `${shape.floatX}px`,
          "--float-y": `${shape.floatY}px`,
          mixBlendMode: "multiply",
        };

        return (
          <div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              transform: `translate(calc(var(--mx, 0) * ${shape.depth * shape.parallax * (1 + weightX * parallaxStrength) * shape.dirX * motionBoost}px), calc(var(--my, 0) * ${shape.depth * shape.parallax * (1 + weightY * parallaxStrength) * shape.dirY * motionBoost}px))`,
            }}
          >
            <div className="biomarker-float will-change-transform" style={floatStyle}>
              <img
                src={shape.type === "dna" ? dnaImage : proteinImage}
                alt=""
                draggable={false}
                className="w-14 h-14 object-contain select-none"
                style={{
                  transform: `scale(${shape.scale}) rotate(${shape.rotation}deg)`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
