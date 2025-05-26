// app/page.tsx or pages/index.tsx depending on your Next.js structure

"use client";

import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      alert("Login clicked!");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] dark:bg-gradient-to-br from-[#302943] via-slate-900 to-black">
      <div className="w-full md:w-auto flex gap-0 md:gap-4 flex-col md:flex-row items-center justify-center">
        {/* Left Info Section */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="badge badge-outline text-gray-600 dark:text-blue-400">
              Manage all your tasks in one place!
            </span>
            <p className="text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700 dark:text-gray-400">
              <span>Server-based</span>
              <br />
              <span>Task Manager</span>
            </p>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/3 p-4 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="card w-full md:w-[400px] bg-white dark:bg-slate-900 shadow-xl p-10 space-y-6"
          >
            <div>
              <h2 className="text-blue-600 text-3xl font-bold text-center">
                Welcome back!
              </h2>
              <p className="text-center text-base text-gray-700 dark:text-gray-500">
                Keep all your credentials safe!
              </p>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                required
              />
              <label className="label">
                <span className="label-text-alt text-blue-600 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full rounded-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
