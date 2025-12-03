// src/pages/ListingPage/ListingPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";

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

  // Contact modal state
  const [contactListing, setContactListing] = useState(null);
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";

  useEffect(() => {
    fetch("/listings.json")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setSearchInput(initialSearch);
      })
      .catch((err) => {
        console.error("Failed to load listings:", err);
      });
  }, [initialSearch]);

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
    if (filters.category !== "All") result = result.filter((l) => l.category === filters.category);
    if (filters.location !== "All") result = result.filter((l) => l.location === filters.location);
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

  const handleFilterChange = (type, value) => setFilters((prev) => ({ ...prev, [type]: value }));

  const openContact = (listing) => {
    // If not signed in, redirect to signup and preserve return path
    if (!user) {
      navigate("/signup", { state: { from: `/listings/${listing.id}` } });
      return;
    }

    setMessage(
      `Hi, I'm interested in your listing "${listing.title}" at ${listing.location}. Is it still available?`
    );
    setContactListing(listing);
  };

  const closeContact = () => {
    setContactListing(null);
    setMessage("");
  };

  const sendMail = () => {
    if (!contactListing) return;
    const to = contactListing.contactEmail || "";
    const subject = `Inquiry: ${contactListing.title}`;
    const body = message;

    if (!to) {
      navigator.clipboard
        .writeText(body)
        .then(() => {
          alert("No landlord email provided. Message copied to clipboard.");
          closeContact();
        })
        .catch(() => {
          alert("No landlord email and clipboard failed. Please try again.");
        });
      return;
    }

    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    closeContact();
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

                <div className="card-actions justify-end gap-2">
                  <Link to={`/listings/${listing.id}`} className="btn btn-primary">
                    View Details
                  </Link>

                  <button
                    onClick={() => openContact(listing)}
                    className="btn bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transition-transform"
                  >
                    ✉️ Contact Landlord
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Modal (requires signed-in user) */}
      {contactListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-base-100 rounded-lg w-full max-w-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">Contact Landlord</h3>
                <p className="text-sm text-gray-500">
                  Listing: <span className="font-medium">{contactListing.title}</span>
                </p>
              </div>
              <button onClick={closeContact} className="text-gray-500 hover:text-gray-700" aria-label="Close">
                ✕
              </button>
            </div>

            <div className="mb-4">
              <label className="label">
                <span className="label-text">To</span>
              </label>
              <input
                type="text"
                readOnly
                value={contactListing.contactEmail || "No email provided"}
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-4">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="textarea textarea-bordered w-full"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={closeContact} className="btn btn-ghost">
                Cancel
              </button>
              <button onClick={sendMail} className="btn bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
