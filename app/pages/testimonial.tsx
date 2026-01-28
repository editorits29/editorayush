
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "../config/axios";

type Testimonial = {
  id: string;
  url: string;
};

export default function Testimonial() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await api.get<Testimonial[]>("/api/images/");
        const images = Array.isArray(res.data) ? res.data : [];
        setData(images);
        setActiveIndex(Math.floor(images.length / 2));
      } catch {
        setData([]);
      }
    };
    loadImages();
  }, []);

  return (
    /* FULL WIDTH */
    <section className="w-full py-1 flex justify-center overflow-hidden">
      {/* 3XL CONTAINER */}
      <div className="w-3xl px-8 rounded-3xl bg-gradient-to-b from-white via-pink-50 to-pink-100">
        <div className="relative px-5 py-10">

          {/* Header */}
          <div className="text-center mb-5">
	  <div className="flex gap-3 items-center justify-center">
	  <div className="h-3 w-3 rounded-full bg-pink-600"></div>
            <p className="text-sm font-medium tracking-wide text-pink-500">
              TESTIMONIALS
            </p>
	    </div>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              What premium clients say
            </h2>
          </div>

          {/* Slider */}
          <div className="relative h-[520px] flex items-center justify-center">

            {data.map((item, index) => {
              const offset = index - activeIndex;

              if (Math.abs(offset) > 2) return null;

              const translateX =
                offset === 0
                  ? 0
                  : offset === -1
                  ? -160
                  : offset === 1
                  ? 160
                  : offset < 0
                  ? -280
                  : 280;

              const scale =
                offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.84 : 0.68;

              const opacity =
                offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.9 : 0;

              const isActive = offset === 0;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${isActive ? "cursor-default" : "cursor-pointer"}
                  `}
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    zIndex: 50 - Math.abs(offset) * 10,
                    opacity,
                  }}
                >
                  <article className="w-[360px] h-[480px] bg-white rounded-3xl shadow-2xl p-6 flex flex-col">

                    {/* Image */}
                    <div className="relative w-full h-60 rounded-2xl overflow-hidden">
                      <Image
                        src={item.url}
                        alt="testimonial"
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="mt-6 text-xl font-bold text-slate-900">
                      Focus on the big picture
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-500">
                      Many desktop publishing packages and modern editors
                      prioritize structure and clarity over noise.
                    </p>

                    <span className="mt-auto text-indigo-500 font-medium text-sm">
                      Read more →
                    </span>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
