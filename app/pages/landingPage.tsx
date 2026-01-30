// app/pages/services.tsx
"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function LandingPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile for lower quality images
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Only run on client side
    if (typeof window !== 'undefined') {
      checkMobile();
      window.addEventListener('resize', checkMobile);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || isMobile) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card || isMobile) return;

    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
    `;
  };

  return (
    <div className="w-full py-2 pt-1 flex justify-center">
      {/* Main container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-3xl px-8 py-6 shadow-lg border border-white/50 w-full max-w-3xl transition-transform duration-200 ease-out overflow-hidden flex flex-col min-h-[395px] bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900"
      >
        {/* Optimized background image - Fixed */}
        <div className="absolute inset-0 -z-20">
          {/* Fallback background that's always visible */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900" />
          
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/23657879796.webp"
              alt="editor background"
              fill
              className={`object-cover transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              priority
              quality={isMobile ? 75 : 85}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              onLoad={() => {
                console.log("Background image loaded successfully");
                setImageLoaded(true);
              }}
              onError={(e) => {
                console.error("Failed to load background image");
                setImageError(true);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          {/* Gradient overlay for text readability - Now with fixed opacity */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Soft glow overlay - Reduced z-index */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-200/10 via-purple-200/5 to-blue-200/10 blur-xl -z-10" />

        {/* Main content area */}
        <div className="relative z-10 flex flex-col items-start text-left space-y-6 flex-grow">
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center gap-2 text-lg font-medium text-gray-200">
              <span>Every great visual</span>
              {/* Inline SVG to avoid external request */}
              <svg 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="text-yellow-400 drop-shadow-sm"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>

            <p className="text-3xl font-bold text-white">
              Deserves a great editor.
            </p>

            <p className="text-sm text-gray-300">
              Quality over quantity. Always.
            </p>
            
            {/* About me toggle button */}
            <div>
              <button 
                onClick={() => setShowAboutMe(!showAboutMe)}
                className="text-sm text-pink-400 hover:text-pink-300 font-medium underline underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 rounded"
              >
                {showAboutMe ? "Hide About Me" : "Read About Me"}
              </button>
              
              {showAboutMe && (
                <p className="mt-2 text-yellow-500 text-shadow-sm text-shadow-voilet-100 text-lg animate-fadeIn">
                  I'm Ayush Kumar, a professional video editor based in India, working with clients globally. I create high-quality, engaging videos for creators and brands, including short-form content and long-form edits. With a focus on creativity, clear communication, and on-time delivery, I ensure every project meets global standards and client expectations.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Customer section */}
        <div className="relative z-10 mt-auto pt-8">
          <div className="flex gap-3 items-center">
            <div className="flex items-center">
              {/* Optimized profile images with local fallbacks */}
              {[
                "https://cdn.pixabay.com/photo/2024/07/30/12/36/man-8932177_1280.png",
                "https://static.boredpanda.com/blog/wp-content/uploads/2020/08/H-5f4b968056d2c__880.jpg",
                "https://cdn.pixabay.com/photo/2014/09/17/11/47/man-449406_1280.jpg"
              ].map((src, index) => (
                <div 
                  key={index}
                  className="relative h-8 w-8 rounded-full border-2 border-white/80 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900"
                  style={{ marginLeft: index > 0 ? '-0.75rem' : '0' }}
                >
                  <Image
                    src={src}
                    width={32}
                    height={32}
                    alt={`customer ${index + 1}`}
                    className="object-cover"
                    loading="lazy"
                    quality={60}
                    sizes="32px"
                    onError={(e) => {
                      console.error(`Failed to load customer profile ${index + 1}`);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
              <div 
                className="relative h-8 w-8 rounded-full border-2 border-white/80 overflow-hidden bg-gradient-to-br from-pink-600 to-purple-700 flex items-center justify-center"
                style={{ marginLeft: '-0.75rem' }}
              >
                <span className="text-white text-xs font-bold">100+</span>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-300">
                <span className="text-pink-400 font-semibold">100+</span>{" "}
                Happy customers
              </p>
              
              <p className="text-xs text-gray-400">
                Trusted by professionals worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
