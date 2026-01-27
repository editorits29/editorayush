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
  const [typedText, setTypedText] = useState("");
  const fullText = "It's-EditorAyush.";

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  useEffect(() => {
    let i = 0;
    let isDeleting = false;

    const interval = setInterval(() => {
      if (!isDeleting) {
        // Typing
        setTypedText(fullText.slice(0, i + 1));
        i++;

        if (i === fullText.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 1200); // pause after full typing
        }
      } else {
        // Deleting
        setTypedText(fullText.slice(0, i - 1));
        i--;

        if (i === 0) {
          isDeleting = false;
        }
      }
    }, 100); // speed control

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="w-full flex justify-center pb-1 py-2 sticky top-0 z-50">
      <div className="w-3xl px-4 bg-white/80 backdrop-blur-md shadow-md rounded-2xl relative">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="tracking-wide">
            <p className="font-creative text-xs font-bold text-gray-600">
              {typedText.includes("It's-Editor") && "It's-Editor"}
              <span className="font-serif text-base italic">
                {typedText.replace("It's-Editor", "").replace(".", "")}
              </span>
              {typedText.endsWith(".") && "."}
            </p>
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
