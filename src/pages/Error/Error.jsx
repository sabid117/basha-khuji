import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-center px-4 text-white">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-300 mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-400 text-white rounded hover:bg-blue-700 transition"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
