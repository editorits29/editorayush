
"use client";

import { useEffect, useState, useRef } from "react";
import api from "../config/axios";

type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
};

export default function Work() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const res = await api.get<Video[]>("/api/videos/");
        setVideos(res.data ?? []);
      } catch (err) {
        console.error(err);
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, []);

  // ensure autoplay when video changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});
    setHasInteracted(false);
  }, [currentIndex]);

  const currentVideo = videos[currentIndex] ?? null;

  const nextVideo = () => {
    if (!videos.length) return;
    setCurrentIndex((i) => (i + 1) % videos.length);
  };

  const prevVideo = () => {
    if (!videos.length) return;
    setCurrentIndex((i) => (i - 1 + videos.length) % videos.length);
  };

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    // first interaction → unmute + play
    if (!hasInteracted) {
      video.muted = false;
      video.play();
      setHasInteracted(true);
      return;
    }

    // later clicks → toggle play/pause
    if (video.paused) video.play();
    else video.pause();
  };

  return (
    <section className="w-full flex flex-col items-center px-2 py-1">
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
            <div className="aspect-video relative">
              <video
                ref={videoRef}
                key={currentVideo.id}
                src={currentVideo.url}
                poster={currentVideo.thumbnail}
                className="w-full h-full object-contain object-center cursor-pointer"
                loop
                muted
                autoPlay
                playsInline
                onClick={handleVideoClick}
              />

              {/* Tap for sound overlay */}
              {!hasInteracted && (
                <div
                  onClick={handleVideoClick}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm md:text-base font-medium backdrop-blur-sm cursor-pointer transition"
                >
                  🔊 Tap for sound
                </div>
              )}
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
	<div className="flex items-center pt-14  gap-2">
            <span className="h-3 w-3 rounded-full bg-pink-600" />
            <p className="text-sm font-medium text-gray-600">
              Process
            </p>
	    <div>
	    <ul>
	    <li><h1>Submit Rquest</h1><p></p></li>
	    <li><h1></h1><p></p></li>
	    <li><h1></h1><p></p></li>
	    </ul>
	    </div>
          </div>
      </div>
    </section>
  );
}
