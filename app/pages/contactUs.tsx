"use client";

import { useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiCalendly } from "react-icons/si";
const faqs = [
  {
    question: "What is the editing process?",
    answer:
      "Our editing process includes four phases: Discovery & Research, Storyboarding, Editing, and Finalisation & Delivery.",
  },
  {
    question: "How will I send the video?",
    answer:
      "You can share your footage using WeTransfer, Google Drive, Dropbox, TeraBox, or even WhatsApp.",
  },
  {
    question: "What if I'm not satisfied?",
    answer:
      "I’ll figure out what went wrong and provide UNLIMITED revisions. Your satisfaction is my top priority.",
  },
  {
    question: "I need this video ASAP. Can you deliver in 24 hours?",
    answer:
      "Usually yes, but it depends on the video complexity and your budget. Rush delivery is available at an additional cost.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply contact us to schedule an initial consultation. We’ll discuss your needs, preferences, and any specific requirements for your video.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, PayPal, and bank transfers. Full payment details will be shared during the consultation.",
  },
];

export default function ContactUs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full mt-0 mb-2 p-1 flex justify-center">
      <div className="bg-white/80 backdrop-blur-lg w-full max-w-3xl rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center py-2 justify-center space-x-2">
          <div className="bg-pink-600 rounded-full flex justify-center h-4 w-4 outline-none"></div>
          <p className="text-sm font-medium text-gray-600">FAQ & Contact-Us</p>
        </div>

        <div className="border border-gray-200 bg-pink-600/20 backdrop-blur-sm m-2 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 text-center sm:text-left">
              Have a question? Let's discuss it now!
            </h2>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-3">
              {/* Primary CTA */}
              <a
                href="/book-appointment"
                className="flex items-center justify-center px-3 py-3 m-1 rounded-full
        bg-black text-white text-base font-semibold
        hover:bg-gray-800 transition"
              >
                <SiCalendly className="text-lg w-8 h-8 mr-3 p-1 " />   Book an Appointment
              </a>

              {/* Social buttons */}
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/its_editor_746080/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full
          bg-gray-400 text-white text-sm font-semibold shadow-md
          hover:scale-105 transition-transform"
                >
                  <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                    <FaInstagram className="text-lg" />
                  </div>
                  Instagram
                </a>

                <a
                  href="/404"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-2 py-2 rounded-full
          bg-gray-400 text-white text-sm font-semibold shadow-md
          hover:scale-105 transition-transform"
                >
                  <FaWhatsapp className="bg-green-600 h-7 w-7 rounded-full text-lg p-1" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <ul className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <li
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-4 py-3 flex justify-between items-center font-semibold text-gray-900 hover:bg-gray-50 transition"
                >
                  <span>{faq.question}</span>
                  <span className="text-xl">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <p className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
