import type { CSSProperties } from "react";

import nsf from "../assets/logo-nsf.png";
import leapyear from "../assets/logo-leapyear.png";
import characterCapital from "../assets/logo-character-capital.png";

const logos = [
  { id: 1, src: characterCapital, alt: "Character Capital" },
  { id: 2, src: nsf, alt: "NSF" },
  { id: 3, src: leapyear, alt: "Leapyear" },
];

const extended = [...logos, ...logos, ...logos];

export default function LogoRow() {
  const maskStyle: CSSProperties = {
    WebkitMaskImage:
      "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.9) 12%, rgba(0,0,0,0.9) 88%, transparent 100%)",
    maskImage:
      "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.9) 12%, rgba(0,0,0,0.9) 88%, transparent 100%)",
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-10">
      <div className="relative mt-2 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white via-white/95 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white via-white/95 to-transparent" />

        <div className="relative flex items-center gap-12 px-2 py-1" style={maskStyle}>
          <div className="flex min-w-max items-center gap-14 logo-marquee">
            {extended.map((logo, index) => (
              <img
                key={`${logo.id}-${index}`}
                src={logo.src}
                alt={logo.alt}
                className={`object-contain opacity-90 shrink-0 ${
                  logo.id === 4 ? "h-9" : "h-12"
                }`}
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
