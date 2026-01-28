
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await api.get<Testimonial[]>("/api/images/");
        const imgs = Array.isArray(res.data) ? res.data : [];
        setData(imgs);
        setActive(Math.floor(imgs.length / 2));
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-20 flex justify-center">
        <p className="text-slate-500">Loading testimonials…</p>
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <section className="w-full py-20 flex justify-center">
        <p className="text-slate-500">No testimonials found</p>
      </section>
    );
  }

  const total = data.length;
  const wrap = (i: number) => (i + total) % total;

  const visibleItems = [-2, -1, 0, 1, 2].map((offset) => {
    const index = wrap(active + offset);
    return { item: data[index], index, offset };
  });

  return (
    <section className="w-full py-1 flex justify-center">
      {/* BACKGROUND BOUNDARY */}
      <div className="relative w-full max-w-3xl px-6 py-8 rounded-3xl bg-gradient-to-b from-white via-pink-50 to-pink-100 overflow-hidden">
        {/* Header */}
        <div className="text-center mt-5 mb-1">
          <div className="flex gap-3 items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-pink-600" />
            <p className="text-sm font-medium tracking-wide text-pink-500">
              TESTIMONIALS
            </p>
          </div>
          <h2 className="mt-0 text-3xl font-bold text-slate-900">
            What premium clients say
          </h2>
        </div>

        {/* CAROUSEL CLIP ZONE */}
        <div className="relative h-[520px] flex items-center justify-center overflow-hidden">
          {visibleItems.map(({ item, index, offset }) => {
            const style =
              offset === 0
                ? {
                    transform: "translateX(0%) scale(1)",
                    zIndex: 50,
                  }
                : offset === -1
                ? {
                    transform: "translateX(-35%) scale(0.85)",
                    zIndex: 40,
                  }
                : offset === 1
                ? {
                    transform: "translateX(35%) scale(0.85)",
                    zIndex: 40,
                  }
                : offset === -2
                ? {
                    transform: "translateX(-70%) scale(0.7)",
                    zIndex: 30,
                  }
                : {
                    transform: "translateX(70%) scale(0.7)",
                    zIndex: 30,
                  };

            return (
              <div
                key={`${item.id}-${offset}`}
                onClick={() => setActive(index)}
                className="absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
                style={style}
              >
                <div className="w-[260px] sm:w-[300px] h-[420px] bg-white rounded-3xl shadow-2xl p-4 flex items-center justify-center">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src={item.url}
                      alt="testimonial"
                      fill
                      className="object-contain"
                      sizes="(max-width:640px) 260px, 300px"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
