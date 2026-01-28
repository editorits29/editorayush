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
  const [active, setActive] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await api.get<Testimonial[]>("/api/images/");
        const imgs = Array.isArray(res.data) ? res.data : [];
        setData(imgs);
        setActive(Math.floor(imgs.length / 2));
      } catch {
        setData([]);
      }
    };
    loadImages();
  }, []);

  return (
    <section className="w-full py-1 flex justify-center overflow-hidden">
      <div className="w-3xl px-8 rounded-3xl bg-gradient-to-b from-white via-pink-50 to-pink-100">
        {/* Header (unchanged) */}
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

        <div className="relative px-5 py-5">
          <div className="relative h-[520px] flex items-center justify-center">
            {data.map((item, index) => {
              const offset = index - active;

              if (Math.abs(offset) > 1) return null; // ONLY 3 CARDS TOTAL

              const styles =
                offset === 0
                  ? {
                      transform: "translateX(0px) scale(1)",
                      zIndex: 30,
                      opacity: 1,
                    }
                  : offset === -1
                    ? {
                        transform: "translateX(-140px) scale(0.85)",
                        zIndex: 20,
                        opacity: 1,
                      }
                    : {
                        transform: "translateX(140px) scale(0.85)",
                        zIndex: 20,
                        opacity: 1,
                      };

              return (
                <div
                  key={item.id}
                  onClick={() => setActive(index)}
                  className="absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
                  style={styles}
                >
                  <div
                    className="
                      w-[260px]
                      sm:w-[300px]
                      lg:w-[360px]
                      h-[420px]
                      lg:h-[480px]
                      bg-white
                      rounded-3xl
                      shadow-2xl
                      flex
                      items-center
                      justify-center
                      p-4
                    "
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
                      <Image
                        src={item.url}
                        alt="testimonial"
                        fill
                        className="object-contain"
                        sizes="(max-width:640px) 260px, (max-width:1024px) 300px, 360px"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
