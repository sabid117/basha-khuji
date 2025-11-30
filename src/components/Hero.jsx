import React, { useState } from "react";

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.open(`/listings?search=${encodeURIComponent(searchTerm)}`, "_blank");
    }
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="w-full max-w-xl text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            Find Your Perfect Rental in Dhaka
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Connecting tenants and house owners with ease.
          </p>
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              name="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-full h-14 px-4 rounded-l-md bg-white text-black focus:outline-none"
            />
            <button
              type="submit"
              className="h-14 px-6 bg-blue-400 text-white font-semibold rounded-r-md hover:bg-blue-700 transition"
            >
              SEARCH
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
