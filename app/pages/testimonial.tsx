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
  
  // Adjusted for smoother, more visible transitions
  const scale = useTransform(
    scrollYProgress,
    [start, center, end],
    [0.85, 1.05, 0.85]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [start, center, end],
    [0.4, 1, 0.4]
  );
  
  const blur = useTransform(
    scrollYProgress,
    [start, center, end],
    ["blur(8px)", "blur(0px)", "blur(8px)"]
  );
  
  const y = useTransform(
    scrollYProgress,
    [start, center, end],
    [100, 0, -100]
  );

  return (
    <div className="w-full h-screen flex items-center justify-center snap-center">
      <motion.div
        style={{ 
          scale, 
          opacity, 
          filter: blur,
          y
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 30
        }}
        className="
          mx-auto
	  w-3xl
          rounded-3xl
          overflow-hidden
          relative
          will-change-transform
          shadow-2xl
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
            max-h-[85vh]
            max-w-[85vw]
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
      } catch (error) {
        console.error("Failed to load images:", error);
        setData([]);
      }
    };
    loadImages();
  }, []);

  return (
    <section className="w-full flex justify-center py-6">
      <div
        className="
          w-full
          max-w-7xl
          bg-gradient-to-b
          from-gray-200
          via-pink-50
          to-pink-100
          rounded-3xl
          flex
          flex-col
          items-center
          pt-5
        "
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mt-4 mb-4 text-center">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-pink-600" />
            <p className="text-sm font-medium text-gray-600">
              Testimonial
            </p>
          </div>
          <h2 className="text-2xl font-bold text-black max-w-lg">
            What our premium clients
            <br />
            are saying about us
          </h2>
        </div>
        
        {/* Scroll Container */}
        <div
          ref={containerRef}
          className="
            w-full
            flex
            flex-col
            snap-y
            snap-mandatory
            overflow-y-auto
            scroll-smooth
          "
          style={{ 
            height: `${data.length * 100}vh`,
            scrollBehavior: 'smooth'
          }}
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
