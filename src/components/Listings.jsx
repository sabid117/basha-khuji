import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Listings({ selectedCategory, filters }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("/listings.json")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Failed to load listings:", err));
  }, []);

  // Apply filters
  let filtered = [...listings];

  if (selectedCategory !== "All") {
    filtered = filtered.filter((l) => l.category === selectedCategory);
  }

  if (filters?.location && filters.location !== "All") {
    filtered = filtered.filter((l) => l.location === filters.location);
  }

  if (filters?.rent && filters.rent !== "All") {
    const [min, max] = filters.rent === "30000+" ? [30000, Infinity] : filters.rent.split("-").map(Number);
    filtered = filtered.filter((l) => l.rentValue >= min && l.rentValue <= max);
  }

  if (filters?.area && filters.area !== "All") {
    const [min, max] = filters.area === "1000+" ? [1000, Infinity] : filters.area.split("-").map(Number);
    filtered = filtered.filter((l) => l.areaSqft >= min && l.areaSqft <= max);
  }

  return (
    <section className="py-16 px-6 bg-white dark:bg-base-200">
      <h2 className="text-3xl font-bold text-center mb-10 text-blue-400 dark:text-blue-300">
        Featured Listings
      </h2>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No listings match your filters.</p>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {filtered.map((listing) => (
            <div key={listing.id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={listing.img}
                  alt={listing.title}
                  loading="lazy"
                  className="h-52 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{listing.title}</h3>
                <p className="text-blue-600 font-semibold">{listing.rent}</p>
                <p>{listing.desc}</p>
                <p className="text-sm text-gray-500">
                  📍 {listing.location} | 📐 {listing.areaSqft} sqft
                </p>
                <div className="card-actions justify-end">
                  <Link to={`/listings/${listing.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
