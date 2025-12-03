// src/pages/ListingDetails/ListingDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  // Contact modal state
  const [contactOpen, setContactOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/listings.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((l) => l.id === parseInt(id));
        setListing(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load listing:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (!listing) {
    return <p className="text-center py-20 text-gray-500">Listing not found.</p>;
  }

  const handleContactClick = () => {
    if (!user) {
      navigate("/signup", { state: { from: `/listings/${id}` } });
      return;
    }

    setMessage(
      `Hi, I'm interested in your listing "${listing.title}" at ${listing.location}. Is it still available?`
    );
    setContactOpen(true);
  };

  const closeContact = () => {
    setContactOpen(false);
    setMessage("");
  };

  const sendMail = () => {
    const to = listing.contactEmail || "";
    const subject = `Inquiry: ${listing.title}`;
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
    <section className="py-16 px-6 bg-white dark:bg-base-200">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="card bg-base-100 shadow-xl">
          <figure className="p-4">
            <img
              src={listing.img || "/default-listing.jpg"}
              alt={listing.title}
              className="rounded-xl object-cover h-80 w-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl text-blue-500">{listing.title}</h2>
            <p className="text-base mt-2">{listing.desc}</p>
          </div>
        </div>

        <div className="card bg-blue-100 dark:bg-blue-500 text-blue-900 dark:text-white shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Property Details</h3>
          <ul className="space-y-3">
            <li>
              <span className="font-semibold">📍 Location:</span> {listing.location}
            </li>
            <li>
              <span className="font-semibold">💰 Rent:</span> {listing.rent}
            </li>
            <li>
              <span className="font-semibold">📐 Size:</span> {listing.areaSqft} sqft
            </li>
            <li>
              <span className="font-semibold">🏷️ Category:</span> {listing.category}
            </li>
          </ul>

          <div className="mt-6 flex gap-3">
            <Link to="/" className="btn btn-outline btn-sm">
              ← Back to Listings
            </Link>

            <button
              onClick={handleContactClick}
              className="btn bg-gradient-to-r from-green-500 to-emerald-600 text-white btn-sm hover:scale-105 transition-transform"
            >
              ✉️ Contact Landlord
            </button>
          </div>
        </div>
      </div>

      {contactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-base-100 rounded-lg w-full max-w-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">Message Landlord</h3>
                <p className="text-sm text-gray-500">
                  Listing: <span className="font-medium">{listing.title}</span>
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
                value={listing.contactEmail || "No email provided"}
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
