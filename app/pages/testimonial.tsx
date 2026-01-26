
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
  const end = start + 1 / total;

  const scale = useTransform(
    scrollYProgress,
    [start, (start + end) / 2, end],
    [0.9, 1, 0.9]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, (start + end) / 2, end],
    [0.7, 1, 0.7]
  );

  const boxShadow = useTransform(
    scrollYProgress,
    [start, (start + end) / 2, end],
    [
      "0 10px 25px rgba(0,0,0,0.12)",
      "0 25px 50px rgba(0,0,0,0.28)",
      "0 10px 25px rgba(0,0,0,0.12)",
    ]
  );

  return (
    <motion.div
      style={{ scale, opacity, boxShadow }}
      className="
        mx-auto
        rounded-3xl
        overflow-hidden
        bg-black
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
    <section
      className="
        w-full
        flex
        justify-center
        py-1
      "
    >
      {/* Page container */}
      <div className="w-3xl bg-gradient-to-b
        from-gray-200
        via-pink-50
        to-pink-100
	rounded-3xl
flex flex-col items-center">
        {/* Title */}
        <div className="flex flex-col items-center gap-3 mt-20 mb-16 text-center">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-pink-600" />
            <p className="text-sm font-medium text-gray-600">
              Testimonial
            </p>
          </div>

          <h2 className="text-3xl font-bold text-black max-w-xl">
            What our premium clients<br/> are saying about us
          </h2>
        </div>

        {/* Gallery */}
        <div
          ref={containerRef}
          className="
            w-full
            rounded-3xl
            px-6
            py-5
            space-y-24
            flex
            flex-col
            items-center
            backdrop-blur-sm
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
