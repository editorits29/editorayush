"use client";

import { useEffect, useState, useRef } from "react";
import api from "../config/axios";
import Image from "next/image";

type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
};

export default function Work() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const res = await api.get<Video[]>("/api/videos/");
        const data = res.data ?? [];
        setVideos(data);
        if (data.length > 0) {
          setActiveIndex(Math.floor(data.length / 2));
        }
      } catch {
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadVideos();
  }, []);

  const total = videos.length;
  const wrap = (i: number) => (i + total) % total;

  const visibleItems =
    videos.length > 0
      ? [-2, -1, 0, 1, 2].map((offset) => {
          const index = wrap(activeIndex + offset);
          return { item: videos[index], index, offset };
        })
      : [];

  // DRAG LOGIC (mouse + touch)
  const onDragStart = (x: number) => {
    dragStartX.current = x;
  };

  const onDragEnd = (x: number) => {
    if (dragStartX.current === null) return;

    const diff = x - dragStartX.current;
    const threshold = 50;

    if (diff > threshold) {
      setActiveIndex((i) => wrap(i - 1));
    } else if (diff < -threshold) {
      setActiveIndex((i) => wrap(i + 1));
    }

    dragStartX.current = null;
  };

  if (isLoading) {
    return (
      <section className="w-full py-20 flex justify-center">
        <p className="text-slate-500">Loading videos…</p>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section className="w-full py-20 flex justify-center">
        <p className="text-slate-500">No videos found</p>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col items-center px-2 py-1">
      {/* SAME GLOW SYSTEM AS HOME */}
      <div className="relative w-full max-w-3xl px-6 py-8 rounded-3xl bg-white/70 backdrop-blur-md border border-white/50 overflow-hidden">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-200/30 via-purple-200/20 to-blue-200/30 blur-xl -z-10" />

        {/* Header */}
        <div className="text-center">
          <div className="flex gap-3 items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-pink-600" />
            <p className="text-sm font-medium tracking-wide text-pink-500">
              Our Signature Cuts & Creation's
            </p>
          </div>
        </div>

        {/* CAROUSEL  Video Section*/}
        <div
          ref={containerRef}
          className="relative h-[500px] flex items-center justify-center overflow-hidden touch-pan-y"
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
        >
          {visibleItems.map(({ item, index, offset }) => {
            const style =
              offset === 0
                ? { transform: "translateX(0%) scale(1)", zIndex: 45 }
                : offset === -1
                  ? { transform: "translateX(-35%) scale(0.85)", zIndex: 40 }
                  : offset === 1
                    ? { transform: "translateX(35%) scale(0.85)", zIndex: 40 }
                    : offset === -2
                      ? { transform: "translateX(-70%) scale(0.7)", zIndex: 30 }
                      : { transform: "translateX(70%) scale(0.7)", zIndex: 30 };

            return (
              <div
                key={`${item.id}-${offset}`}
                className="absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={style}
              >
                <div className="w-[280px] sm:w-[320px] h-[400px] bg-white rounded-3xl shadow-2xl p-4 flex flex-col">
                  <div className="relative w-full h-[380px] rounded-2xl overflow-hidden">
                    <video
                      src={item.url}
                      poster={item.thumbnail}
                      className="w-full h-full object-contain"
                      controls
                      playsInline
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process section — with scalable arrows */}
        <div className="flex justify-center flex-col items-center gap-2">
          <div className="w-full flex justify-center gap-2 items-center text-center">
            <div className="h-3 w-3 rounded-full bg-pink-600"></div>
            <p className="text-sm font-medium text-gray-600">
              The Blue Print Of Creation
            </p>
          </div>
          <div className="text-lg text-left text-gray-600 w-full">
            <h1 className="text-black font-bold pb-2 text-3xl mb-4 text-center">
              The Creation Loop
            </h1>

            <div className="relative">
              <ul className="flex flex-col gap-2">
                {[
                  {
                    title: "The Brief",
                    desc: "The Raw assets and your vision. We align with your goal.",
                  },
                  {
                    title: "The Grind",
                    desc: "We cut, grade, and refine until the visual hits the mark",
                  },
                  {
                    title: "The Exchange",
                    desc: "Secure global and local gateways.",
                    paymentMethods: {
                      india: {
                        text: "India: UPI(GPay, PhonePe) & Bank Transfer.",
                        icons: [
                          "https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/upi-logo.png",
                          "https://i.pinimg.com/736x/b1/5d/fc/b15dfc9f11992f147703c4b1ff45ea8a.jpg",
                          "https://i.pinimg.com/1200x/ea/4d/f5/ea4df535ef139dc6b904040a8323095f.jpg",
                        ],
                      },
                      global: {
                        text: "Global: Wise & Skydo.",
                        icons: [
                          "https://imgs.search.brave.com/u-fyVrATbWj6I0sTd7fWoEaNLN0AA3esRDSMOiVHqSw/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9leGlt/aXVzdmMuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzEw/L2xvZ28tc2t5ZG8u/d2VicA",
                          "https://i.pinimg.com/1200x/cd/0d/73/cd0d7342f6c4981dc1913e2657f1047b.jpg",
                        ],
                      },
                    },
                  },
                  {
                    title: "The Launch",
                    desc: "Finally render delivered. High quality. Ready to go live.",
                  },
                ].map((item, index, array) => {
                  const isExchangeSection = item.title === "The Exchange";
                  
                  return (
                    <div key={index} className="relative">
                      {isExchangeSection ? (
                        <a 
                          href="https://docs.google.com/forms/d/e/1FAIpQLSfdk8SlmjWLw5Wid3GRWXUfygG6j1XJpNNa44DmongInq1ZnA/viewform?usp=publish-editor" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <li className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-pink-200 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                {/* External link indicator */}
                                <div className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth="2" 
                                    stroke="currentColor" 
                                    className="w-5 h-5 text-pink-500"
                                  >
                                    <path 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round" 
                                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" 
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-3">
                                  <h1 className="text-black text-2xl font-bold">
                                    {item.title}
                                  </h1>
                                  <span className="text-sm text-pink-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Click to learn more →
                                  </span>
                                </div>
                                <p className="text-gray-700 mb-3">{item.desc}</p>

                                {item.paymentMethods && (
                                  <div className="space-y-4 mt-4">
                                    <div>
                                      <p className="text-gray-700 mb-2">
                                        {item.paymentMethods.india.text}
                                      </p>
                                      <div className="flex gap-3">
                                        {item.paymentMethods.india.icons.map(
                                          (icon, i) => (
                                            <Image
                                              key={i}
                                              className="object-contain"
                                              src={icon}
                                              height={40}
                                              width={40}
                                              alt="payment logo"
                                            />
                                          ),
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-gray-700 mb-2">
                                        {item.paymentMethods.global.text}
                                      </p>
                                      <div className="flex gap-3">
                                        {item.paymentMethods.global.icons.map(
                                          (icon, i) => (
                                            <Image
                                              key={i}
                                              className="object-contain"
                                              src={icon}
                                              height={40}
                                              width={40}
                                              alt="payment logo"
                                            />
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </li>
                        </a>
                      ) : (
                        <li className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0"></div>
                            <div className="flex-1">
                              <h1 className="text-black text-2xl font-bold mb-3">
                                {item.title}
                              </h1>
                              <p className="text-gray-700 mb-3">{item.desc}</p>
                            </div>
                          </div>
                        </li>
                      )}

                      {/* Arrow between items */}
                      {index < array.length - 1 && (
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                          <div className="relative">
                            {/* Arrow line */}
                            <div className="w-[2px] h-4 bg-gradient-to-b from-purple-500 to-pink-500 mx-auto"></div>

                            {/* Arrow head */}
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                              <div className="w-4 h-4">
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  className="w-full h-full"
                                >
                                  <path
                                    d="M12 5L12 19M12 19L19 12M12 19L5 12"
                                    stroke="url(#arrow-gradient)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <defs>
                                    <linearGradient
                                      id="arrow-gradient"
                                      x1="12"
                                      y1="5"
                                      x2="12"
                                      y2="19"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#EC4899" />
                                      <stop offset="1" stopColor="#8B5CF6" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
