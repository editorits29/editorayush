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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await api.get<Testimonial[]>("/api/images/");
        const imgs = Array.isArray(res.data) ? res.data : [];
        setData(imgs);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    if (data.length <= 1) return;
    
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [activeIndex, data.length]);

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

  return (
    <section className="w-full py-1 flex justify-center">
      <div className="relative w-full max-w-3xl px-6 py-2 rounded-3xl bg-gradient-to-b from-gray-200 via-pink-50 to-pink-100 overflow-hidden">
        {/* Header */}
        <div className="text-center mt-5 mb-8">
          <div className="flex gap-3 items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-pink-600" />
            <p className="text-sm font-medium tracking-wide text-pink-500">
              TESTIMONIALS
            </p>
          </div>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            What premium clients say
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Carousel indicators */}
          {data.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center">
              <div className="flex space-x-2">
                {data.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? "bg-pink-600 w-8" 
                        : "bg-pink-300 w-3 hover:bg-pink-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Carousel items */}
          <div className="relative overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {data.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0 px-8"
                >
                  <div className="flex justify-center">
                    <div className="w-[300px] h-[420px] bg-white rounded-3xl shadow-2xl p-4 flex items-center justify-center">
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
                </div>
              ))}
            </div>
          </div>

          {/* Carousel controls - Previous button */}
          {data.length > 1 && (
            <>
              <button
                onClick={goToPrevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors duration-200 group"
                aria-label="Previous slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-pink-600 group-hover:text-pink-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              {/* Carousel controls - Next button */}
              <button
                onClick={goToNextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors duration-200 group"
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-pink-600 group-hover:text-pink-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Optional: Slide counter */}
        {data.length > 1 && (
          <div className="text-center mt-6 text-sm text-pink-600 font-medium">
            {activeIndex + 1} / {data.length}
          </div>
        )}
      </div>
    </section>
  );
}
