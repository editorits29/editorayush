
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

  return (
    <section className="w-3xl rounded-3xl flex items-center justify-center py-16 bg-gradient-to-b from-pink-50/40 to-white">
      <div className="w-full max-w-3xl px-4">
        {loading ? (
          <p className="text-center text-gray-400">Loading images…</p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="
                  rounded-3xl
                  overflow-hidden
                  bg-white
                  shadow-md
                  border
                  border-gray-100
                "
              >
                <Image
                  src={item.url}
                  alt="Gallery image"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
