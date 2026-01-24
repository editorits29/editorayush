
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "../config/axios";

type Testimonial = {
  id: string;
  title: string;
  url: string;
};

export default function Testimonial() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await api.get<Testimonial[]>("/api/images/");
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const showLoading = loading || data.length === 0;

  return (
    <section className="w-full flex justify-center py-4">
      <div className="bg-gradient-to-b w-3xl from-pink-50/40 to-white">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-pink-600 animate-pulse" />
          <p className="text-sm font-semibold tracking-wide text-gray-600 uppercase">
            Gallery
          </p>
        </div>

        <p className="text-center text-3xl font-extrabold text-gray-900 mb-10 leading-tight">
          Visual work from <br className="hidden sm:block" />
          our recent projects
        </p>

        {/* Content */}
        {showLoading ? (
          <p className="text-center text-gray-500">
            Loading images…
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
                {/* Image */}
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={item.url}
                    alt={item.title}
                    width={52}
                    height={52}
                    className="rounded-full object-cover ring-2 ring-pink-100"
                  />

                  <div>
                    <p className="font-semibold text-gray-900 leading-none">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Cloudinary Asset
                    </p>
                  </div>
                </div>

                {/* Caption */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  This visual asset is part of our curated editing portfolio.
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
