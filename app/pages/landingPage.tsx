// app/pages/landing.tsx

"use client";
import Image from "next/image";
import { useState } from "react";

export default function LandingPage() {
  const [showAboutMe, setShowAboutMe] = useState(false);

  return (
    <div className=" w-full flex items-center justify-center my-1">
      {/* Main container */}
      <div className="w-full max-w-3xl rounded-3xl relative overflow-hidden">
        {/* Background image with overlay */}
        <Image
          src="/23657879796.webp"
          alt="bg image"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Content wrapper */}
        <div className="relative w-full z-10 flex flex-col justify-between p-2 ml-2 sm:p-2 ">
          {/* Top content - Left aligned column */}
          <div className="flex flex-col mt-2">
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <Image
                  className="h-5 w-5"
                  src="/green-star-sparkle-17541.svg"
                  height={20}
                  width={20}
                  alt="star"
                />
                <p className="text-white font-medium text-base sm:text-lg">
                  every Great Visual
                </p>
              </div>

              <div className="flex gap-2 items-center pl-7">
                <p className="text-2xl sm:text-3xl md:text-4xl italic text-white font-bold">
                  deserves a Great Editor
                </p>
                <Image
                  className="h-5 w-5"
                  src="/green-star-sparkle-17541.svg"
                  height={20}
                  width={20}
                  alt="star"
                />
              </div>

              <p className="text-white font-medium text-base sm:text-lg">
                Quality over Quantity. Always!
              </p>
            </div>

            {/* Toggle button */}
            <div className="mt-2">
              <button
                onClick={() => setShowAboutMe(true)}
                className="text-sm h-10 px-5 text-white hover:text-pink-300 font-medium underline underline-offset-2 transition-colors duration-200 rounded-lg backdrop-blur-sm"
              >
                Read About Me
              </button>
            </div>
          </div>

          {/* Bottom customer section */}
          <div className="flex mt-13 items-center md:mt-35 flex-row gap-2 p-1 rounded-xl ">
            <ul className="flex -space-x-3">
              <li>
                <Image
                  className="rounded-full border-2 border-white h-8 w-8"
                  src="https://cdn.pixabay.com/photo/2024/07/30/12/36/man-8932177_1280.png"
                  height={20}
                  width={20}
                  alt="customer"
                />
              </li>
              <li>
                <Image
                  className="rounded-full border-2 border-white h-8 w-8"
                  src="https://i.pinimg.com/736x/77/fd/aa/77fdaac4afd5e8da46936e9490fdad06.jpg"
                  height={20}
                  width={20}
                  alt="customer"
                />
              </li>
              <li>
                <Image
                  className="rounded-full border-2 border-white h-8 w-8"
                  src="https://i.pinimg.com/736x/2e/8f/20/2e8f2057f0e5b8103c3ba49705336ee3.jpg"
                  height={20}
                  width={20}
                  alt="customer"
                />
              </li>
            </ul>

            <div className="flex flex-col">
              <p className="text-lg sm:text-base font-bold text-green-800">
                <span className="text-pink-600">100+</span> Happy customers
              </p>
              <p className="text-sm italic text-gray-600">
                Trusted by professionals worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showAboutMe && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowAboutMe(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowAboutMe(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal content */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                About Me
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-pink-600 to-green-800 rounded-full" />
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                I'm <span className="font-semibold text-pink-600">Ayush Kumar</span>, 
                a professional video editor based in India, working with clients 
                globally. I create high-quality, engaging videos for creators and 
                brands, both short-form and long-form, with clear communication 
                and reliable delivery.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
