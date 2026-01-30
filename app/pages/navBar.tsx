// app/pages/navBar.tsx

"use client";

import { useState, useEffect } from "react";

const navList = [
  { name: "Main Page", id: "landingpage" },
  { name: "Work", id: "work" },
  { name: "Testimonial", id: "testimonial" },
  { name: "Service", id: "service" },
  { name: "Contact Us", id: "contact" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // changed text
  const fullText = "it's_editor_Ayush";

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }

      if (isDeleting && displayText === "") {
        setTimeout(() => {
          setIsDeleting(false);
          setTypingSpeed(300);
        }, 50);
        return;
      }

      const updatedText = isDeleting
        ? fullText.substring(0, displayText.length - 1)
        : fullText.substring(0, displayText.length + 1);

      setDisplayText(updatedText);

      if (isDeleting) {
        setTypingSpeed(300);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typingSpeed, fullText]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  // split normal part and last 5 italic chars
  const normalPart =
    displayText.length > 5
      ? displayText.slice(0, displayText.length - 5)
      : displayText;

  const italicPart =
    displayText.length > 5
      ? displayText.slice(displayText.length - 5)
      : "";

  return (
    <nav className="w-full flex justify-center pb-1 py-2 sticky top-0 z-50">
      <div className="w-3xl px-4 bg-white/80 backdrop-blur-md shadow-md rounded-2xl relative">
        <div className="flex items-center justify-between py-3">
          {/* Logo - Typing Animation */}
          <div className="font-mono tracking-wide min-h-[30px] flex items-center">
            <span className="text-sm md:text-base font-medium text-gray-800">
              <span className="text-xs md:text-sm font-light text-gray-700">
                {normalPart}
              </span>
              {italicPart && (
                <span className="text-base md:text-lg font-semibold italic text-pink-600">
                  {italicPart}
                </span>
              )}
              {/* Blinking cursor */}
              <span className="inline-block w-[2px] h-5 md:h-6 bg-pink-500 ml-1 animate-pulse"></span>
            </span>
          </div>

          {/* Desktop / Tablet Menu */}
          <div className="hidden md:flex gap-3">
            {navList.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="
                  px-4 py-2 rounded-full text-xs font-medium
                  bg-pink-100 backdrop-blur-md text-pink-600
                  hover:bg-gray-300 hover:text-white
                  transition-all duration-300
                  shadow-sm hover:shadow-md border-b-2 outline-none
                "
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
              md:hidden text-xl
              bg-pink-200 text-pink-800
              w-10 h-10 rounded-full
              flex items-center justify-center
              shadow-md
              transition-transform active:scale-95
            "
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden flex flex-wrap justify-center items-center gap-2 px-2 pb-2
            overflow-hidden transition-all duration-300
            ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          {navList.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="
                px-4 py-3 rounded-xl
                bg-pink-100 text-pink-700 text-sm
                hover:bg-pink-300 hover:text-white
                transition-all duration-300
                shadow-sm
                whitespace-nowrap
              "
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
