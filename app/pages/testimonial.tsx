
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import api from "../config/axios";

type Testimonial = {
  id: string;
  url: string;
};

type ImageItemProps = {
  item: Testimonial;
  index: number;
  total: number;
  scrollYProgress: any;
};

function ImageItem({ item, index, total, scrollYProgress }: ImageItemProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const center = (start + end) / 2;

  // Cute, gentle motion
  const scale = useTransform(
    scrollYProgress,
    [start, center, end],
    [0.92, 1.02, 0.92]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, center, end],
    [0.6, 1, 0.6]
  );

  const y = useTransform(
    scrollYProgress,
    [start, center, end],
    [30, 0, -30]
  );

  return (
    <div className="h-screen flex items-center justify-center snap-center">
      <motion.div
        style={{ scale, opacity, y }}
        className="
          mx-auto
          rounded-3xl
          overflow-hidden
          relative
          will-change-transform
        "
      >
        <Image
          src={item.url}
          alt="Gallery image"
          width={1000}
          height={1000}
          className="
            w-auto
            h-auto
            max-h-[80vh]
            max-w-[90vw]
            object-contain
          "
          priority={index === 0}
        />
      </motion.div>
    </div>
  );
}

export default function Testimonial() {
  const [data, setData] = useState<Testimonial[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await api.get<Testimonial[]>("/api/images/");
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        setData([]);
      }
    };
    loadImages();
  }, []);

  return (
    <section className="w-full flex justify-center py-8">
      <div
        className="
          w-3xl
          bg-gradient-to-b
          from-gray-100
          via-pink-50
          to-pink-100
          rounded-3xl
          flex
          flex-col
          items-center
          pt-6
        "
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-4 text-center">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-pink-500" />
            <p className="text-sm font-medium text-gray-600">
              Testimonial
            </p>
          </div>

          <h2 className="text-2xl font-bold text-black max-w-md">
            What our premium clients
            <br />
            are saying about us
          </h2>
        </div>

        {/* Page scroll snap area (NO inner scroll) */}
        <div
          ref={containerRef}
          className="
            w-full
            flex
            flex-col
            snap-y
            snap-mandatory
          "
        >
          {data.map((item, index) => (
            <ImageItem
              key={item.id}
              item={item}
              index={index}
              total={data.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
