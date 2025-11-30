import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ListingPage() {
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    location: "All",
    rent: "All",
    area: "All",
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";

  useEffect(() => {
    fetch("/listings.json")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setSearchInput(initialSearch);
      });
  }, []);

  useEffect(() => {
    let result = [...listings];
    const term = searchInput.toLowerCase().trim();
    if (term) {
      result = result.filter((l) =>
        [
          l.title,
          l.desc,
          l.location,
          l.category,
          l.rent,
          l.rentValue?.toString(),
          l.areaSqft?.toString(),
        ]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(term))
      );
    }
    if (filters.category !== "All") {
      result = result.filter((l) => l.category === filters.category);
    }
    if (filters.location !== "All") {
      result = result.filter((l) => l.location === filters.location);
    }
    if (filters.rent !== "All") {
      const [min, max] =
        filters.rent === "30000+" ? [30000, Infinity] : filters.rent.split("-").map(Number);
      result = result.filter((l) => l.rentValue >= min && l.rentValue <= max);
    }
    if (filters.area !== "All") {
      const [min, max] =
        filters.area === "1000+" ? [1000, Infinity] : filters.area.split("-").map(Number);
      result = result.filter((l) => l.areaSqft >= min && l.areaSqft <= max);
    }
    setFiltered(result);
  }, [searchInput, filters, listings]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <section className="py-10 px-6 bg-white dark:bg-base-200">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-500">Browse Listings</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by anything..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        <label className="form-control w-48">
          <span className="label-text font-semibold mb-1">Category</span>
          <select
            className="select select-bordered"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            {["All", "Apartments", "Sublets", "Offices", "Shops"].map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label className="form-control w-48">
          <span className="label-text font-semibold mb-1">Area</span>
          <select
            className="select select-bordered"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          >
            {["All", "Dhanmondi", "Mirpur", "Gulshan", "Banani", "Motijheel", "New Market"].map(
              (loc) => (
                <option key={loc}>{loc}</option>
              )
            )}
          </select>
        </label>
        <label className="form-control w-48">
          <span className="label-text font-semibold mb-1">Rent Range</span>
          <select
            className="select select-bordered"
            value={filters.rent}
            onChange={(e) => handleFilterChange("rent", e.target.value)}
          >
            {["All", "0-10000", "10000-20000", "20000-30000", "30000+"].map((range) => (
              <option key={range}>{range}</option>
            ))}
          </select>
        </label>
        <label className="form-control w-48">
          <span className="label-text font-semibold mb-1">Size (sqft)</span>
          <select
            className="select select-bordered"
            value={filters.area}
            onChange={(e) => handleFilterChange("area", e.target.value)}
          >
            {["All", "0-500", "500-1000", "1000+"].map((range) => (
              <option key={range}>{range}</option>
            ))}
          </select>
        </label>
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No listings match your filters.</p>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {filtered.map((listing) => (
            <div key={listing.id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={listing.img || "/default-listing.jpg"}
                  alt={listing.title}
                  loading="lazy"
                  className="h-52 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{listing.title}</h3>
                <p className="text-blue-600 font-semibold">{listing.rent}</p>
                <p>{listing.desc}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
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
