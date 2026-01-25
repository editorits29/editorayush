
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

function ImageItem({
  item,
  index,
  total,
  scrollYProgress,
}: ImageItemProps) {
  const start = index / total;
  const end = start + 1 / total;

  // ✅ hooks are now legal
  const scale = useTransform(
    scrollYProgress,
    [start, (start + end) / 2, end],
    [0.85, 1, 0.85]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, (start + end) / 2, end],
    [0.6, 1, 0.6]
  );

  return (
    <motion.div
      style={{ scale, opacity }}
      className="
        mx-auto
        rounded-3xl
        overflow-hidden
        bg-white
        shadow-lg
        will-change-transform
      "
    >
      <Image
        src={item.url}
        alt="Gallery image"
        width={900}
        height={600}
        className="w-full h-[70vh] object-contain"
      />
    </motion.div>
  );
}

export default function Testimonial() {
  const [data, setData] = useState<Testimonial[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });

  useEffect(() => {
    const loadImages = async () => {
      const res = await api.get<Testimonial[]>("/api/images/");
      setData(Array.isArray(res.data) ? res.data : []);
    };
    loadImages();
  }, []);

  return (
    <section className="flex justify-center py-24 bg-neutral-50">
      <div
        ref={containerRef}
        className="
          w-full
          max-w-3xl
          rounded-3xl
          bg-gradient-to-b
          from-pink-50/40
          to-white
          px-6
          py-20
          space-y-24
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
    </section>
  );
}
