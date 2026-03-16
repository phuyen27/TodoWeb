import React from "react";
import hero from "../assets/images/landing.png";

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-20 items-center">

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={hero}
            alt="landing"
            className="w-full max-w-md"
          />
        </div>

        {/* Content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Welcome to Todo App
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            Organize your tasks and boost your productivity with our intuitive
            and user-friendly todo app. Stay on top of your to-do list, set
            reminders, and achieve your goals efficiently.
          </p>

          <a
            href="/login"
            className="inline-block bg-primary-700 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-primary-600 transition"
          >
            Get Started
          </a>
        </div>

      </div>
      
    </div>
  );
};