// app/pages/services.tsx

"use client";

import Image from "next/image";
import { useRef } from "react";

export default function LandingPage() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // tilt strength
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
    `;
  };

  return (
    <div className="w-full py-2 pt-1 flex justify-center">
      {/* SAME WIDTH AS NAVBAR */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-white/70 backdrop-blur-md rounded-3xl px-8 py-6 shadow-lg border border-white/50 w-3xl transition-transform duration-200 ease-out"
      >
        {/* soft glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-200/30 via-purple-200/20 to-blue-200/30 blur-xl -z-10" />

        <div className="text-center mt-0 mb-4 space-y-3">
          <p className="text-sm font-semibold text-pink-600 tracking-wide">
            ✨ 3 Spots Available
          </p>

          <div className="flex items-center justify-center gap-2 text-lg font-medium text-gray-700">
            <span>Every great visual</span>
            <Image
              src="/green-star-sparkle-17541.svg"
              width={22}
              height={22}
              alt="rating"
              priority
              style={false ? {
                filter:
                  "brightness(0.5) sepia(1) hue-rotate(-90deg) saturate(7)",
              }:undefined}
              className="drop-shadow-sm"
            />
          </div>

          <p className="text-xl font-bold text-gray-900">
            Deserves a great editor.
          </p>

          <p className="text-xs text-gray-500">
            Quality over quantity. Always.
          </p>
        </div>
        <div className="flex flex-row gap-4 justify-center">
          <div className="flex">
            <Image
              src="green-star-sparkle-17541.svg"
              width={22}
              height={12}
              alt="customer profile"
              priority
            />
            <Image
              src="green-star-sparkle-17541.svg"
              width={22}
              height={12}
              alt="customer profile"
              priority
            />
            <Image
              src="green-star-sparkle-17541.svg"
              width={22}
              height={12}
              alt="customer profile"
              priority
            />
          </div>
          <p className="text-gray-400">
            <span className="text-pink-600">100+</span> Happy customer
          </p>
        </div>
      </div>
    </div>
  );
}
