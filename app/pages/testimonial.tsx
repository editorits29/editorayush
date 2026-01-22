
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  message: string;
  imageUrl?: string;
};

export default function Testimonial() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/testimonials")
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res)) {
          setData(res);
        } else {
          setData([]);
        }
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  const showLoading = loading || data.length === 0;

  return (
    <section className="w-full flex justify-center py-4">
      <div className="bg-gradient-to-b w-3xl from-pink-50/40 to-white">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-pink-600 animate-pulse" />
          <p className="text-sm font-semibold tracking-wide text-gray-600 uppercase">
            Testimonials
          </p>
        </div>

        <p className="text-center text-3xl font-extrabold text-gray-900 mb-10 leading-tight">
          What our premium clients <br className="hidden sm:block" />
          say about my work
        </p>

        {/* Content */}
        {showLoading ? (
          <p className="text-center text-gray-500">
            Loading testimonials…
          </p>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
            {data.map((item) => (
              <li
                key={item.id}
                className="
                  group
                  bg-white/80 backdrop-blur
                  border border-gray-100
                  rounded-3xl
                  p-6
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                {/* User */}
                <div className="flex items-center gap-4 mb-4">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={52}
                      height={52}
                      className="rounded-full object-cover ring-2 ring-pink-100"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <div className="h-13 w-13 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {item.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-gray-900 leading-none">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <p className="text-sm text-gray-700 leading-relaxed relative">
                  <span className="text-pink-400 text-xl font-serif mr-1">“</span>
                  {item.message}
                  <span className="text-pink-400 text-xl font-serif ml-1">”</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
