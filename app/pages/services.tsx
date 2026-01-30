// app/pages/services.tsx


"use client";

import { useState } from "react";
import api from "../config/axios";

export default function Services() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    videoType: "",
    budget: "",
    drive: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // HARD validation – no empty shit goes through
    for (const key in formData) {
      if (!(formData as any)[key]) {
        setStatus("❌ Please fill all fields");
        return;
      }
    }

    setLoading(true);
    setStatus("");

    try {
      await api.post("/api/services/", {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        videoType: formData.videoType,
        budgetRange: formData.budget, // backend expects this
        drive: formData.drive,
        message: formData.message,
      });

      setStatus("✨ Submitted successfully!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        videoType: "",
        budget: "",
        drive: "",
        message: "",
      });
    } catch (err) {
      setStatus("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-1">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-3xl space-y-1"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          🎬 Services We Offer
        </h1>

        <div className="flex flex-col items-center space-y-6">
          {[
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Mobile Number", name: "mobile" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col w-full max-w-md">
              <label className="text-sm font-medium text-gray-600">
                {field.label}
              </label>
              <input
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                required
                className="mt-1 rounded-sm text-black border-b-2 px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>
          ))}

          <div className="flex flex-col w-full max-w-md">
            <label className="text-sm font-medium text-gray-600">
              Video Type
            </label>
            <select
              name="videoType"
              value={formData.videoType}
              onChange={handleChange}
              required
              className="mt-1 rounded-lg border px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none text-black bg-white"
            >
              <option value="">Select Video Type</option>
              <option value="short">Short Form</option>
              <option value="long">Long Form</option>
              <option value="motion-graphic">Motion Graphics</option>
              <option value="explainer">Explainer</option>
              <option value="corporate">Corporate</option>
              <option value="social-media">Social Media</option>
            </select>
          </div>

          <div className="flex flex-col w-full max-w-md">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Budget Range
            </label>
            <div className="space-y-2">
              {[
                { value: "budget-friendly", label: "Budget Friendly" },
                { value: "standard", label: "Standard" },
                { value: "premium", label: "Premium" },
                { value: "enterprise", label: "Enterprise" },
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="budget"
                    value={option.value}
                    checked={formData.budget === option.value}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full max-w-md">
            <label className="text-sm font-medium text-gray-600">
              Drive Link
            </label>
            <input
              name="drive"
              value={formData.drive}
              onChange={handleChange}
              required
              className="mt-1 text-black border-b-2 rounded-sm px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          <div className="flex flex-col w-full max-w-md">
            <label className="text-sm font-medium text-gray-600">
              Message about the video
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              required
              className="mt-1 border-2 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          <div className="flex flex-col w-full max-w-md">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-xl transition"
            >
              {loading ? "Sending..." : "Submit 🚀"}
            </button>

            {status && (
              <p className="text-center text-sm font-medium text-gray-700 mt-3">
                {status}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
