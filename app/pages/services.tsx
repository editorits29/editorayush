"use client";

import { useState } from "react";

export default function Services() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    videoType: "",
    budget: "",
    driveLink: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("✨ Submitted successfully!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        videoType: "",
        budget: "",
        driveLink: "",
        message: "",
      });
    } catch (err) {
      setStatus("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-3xl space-y-6" // Changed space-y-4 to space-y-6
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          🎬 Services We Offer
        </h1>
        {/* CENTERED CONTAINER - ADDED THIS DIV */}
        <div className="flex flex-col items-center space-y-6">
          {" "}
          {/* Added this wrapper */}
          {[
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Mobile Number", name: "mobile" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col w-full max-w-md">
              {" "}
              {/* Added w-full */}
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
          {/* Video Type Dropdown */}
          <div className="flex flex-col w-full max-w-md">
            {" "}
            {/* Added w-full */}
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
              <option value="short">Short Form (under 1 min)</option>
              <option value="long">Long Form (1-10 mins)</option>
              <option value="motion-graphic">Motion Graphics</option>
              <option value="explainer">Explainer Video</option>
              <option value="corporate">Corporate Video</option>
              <option value="social-media">Social Media Content</option>
            </select>
          </div>
          {/* Budget Radio Buttons */}
          <div className="flex flex-col w-full max-w-md">
            {" "}
            {/* Added w-full */}
            <label className="text-sm font-medium text-gray-600 mb-2">
              Budget Range
            </label>
            <div className="space-y-2">
              {[
                {
                  value: "budget-friendly",
                  label: "Budget Friendly ($50 - $200)",
                },
                { value: "standard", label: "Standard ($200 - $500)" },
                { value: "premium", label: "Premium ($500 - $1000)" },
                { value: "enterprise", label: "Enterprise ($1000+)" },
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={option.value}
                    name="budget"
                    value={option.value}
                    checked={formData.budget === option.value}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300"
                  />
                  <label
                    htmlFor={option.value}
                    className="ml-3 text-sm text-gray-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {[{ label: "Drive Link", name: "driveLink" }].map((field) => (
            <div key={field.name} className="flex flex-col w-full max-w-md">
              {" "}
              {/* Added w-full */}
              <label className="text-sm font-medium text-gray-600">
                {field.label}
              </label>
              <input
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                required
                className="mt-1 text-black border-b-2 rounded-sm px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>
          ))}
          <div className="flex flex-col w-full max-w-md">
            {" "}
            {/* Added w-full */}
            <label className="text-sm font-medium text-gray-600">
              Message about the video
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="mt-1 border-2 text-black rounded-lg border px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
          <div className="flex flex-col w-full max-w-md">
            {" "}
            {/* Added this wrapper for button */}
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
        </div>{" "}
        {/* Closing the centered container */}
      </form>
    </div>
  );
}
