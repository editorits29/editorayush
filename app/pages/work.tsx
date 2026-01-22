
"use client";

import { useEffect, useState, useRef } from "react";

type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
};

export default function Work() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        setVideos(data ?? []);
      } catch (err) {
        console.error(err);
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, []);

  const currentVideo = videos[currentIndex] ?? null;

  const nextVideo = () =>
    setCurrentIndex((i) => (i + 1) % videos.length);

  const prevVideo = () =>
    setCurrentIndex((i) => (i - 1 + videos.length) % videos.length);

  return (
    <section className="w-full flex flex-col items-center gap-2 px-2 py-1">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl border border-white/40 p-6 md:p-8">
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-pink-200/40 via-purple-200/30 to-blue-200/40 blur-2xl" />

        <p className="text-pink-600 text-center text-2xl md:text-3xl font-semibold mb-6 leading-tight">
          Explore our video editing <br /> work projects.
        </p>

        {isLoading || !currentVideo ? (
          <div className="flex items-center justify-center aspect-video rounded-xl bg-black/10">
            <p className="text-gray-700 text-lg animate-pulse">
              Project is loading…
            </p>
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black">
            <div className="aspect-video">
              <video
                ref={videoRef}
                key={currentVideo.id}
                controls
                preload="metadata"
                poster={currentVideo.thumbnail}
                className="w-full h-full object-cover"
              >
                <source src={currentVideo.url} type="video/mp4" />
              </video>
            </div>

            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
              {currentVideo.title}
            </div>

            <button
              onClick={prevVideo}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-4xl opacity-80 hover:opacity-100 transition"
            >
              ‹
            </button>

            <button
              onClick={nextVideo}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-4xl opacity-80 hover:opacity-100 transition"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
