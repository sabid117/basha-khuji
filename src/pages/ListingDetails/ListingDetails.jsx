import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

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
    return <div className="flex justify-center items-center h-[60vh]"><span className="loading loading-spinner text-primary"></span></div>;
  }

  if (!listing) {
    return <p className="text-center py-20 text-gray-500">Listing not found.</p>;
  }

  return (
    <section className="py-16 px-6 bg-white dark:bg-base-200">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <div className="card bg-base-100 shadow-xl">
          <figure className="p-4">
            <img
              src={listing.img}
              alt={listing.title}
              className="rounded-xl object-cover h-80 w-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl text-blue-500">{listing.title}</h2>
            <p className="text-base mt-2">{listing.desc}</p>
          </div>
        </div>

        {/* Info Panel */}
        <div className="card bg-blue-100 dark:bg-blue-500 text-blue-900 dark:text-white shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Property Details</h3>
          <ul className="space-y-3">
            <li><span className="font-semibold">📍 Location:</span> {listing.location}</li>
            <li><span className="font-semibold">💰 Rent:</span> {listing.rent}</li>
            <li><span className="font-semibold">📐 Size:</span> {listing.areaSqft} sqft</li>
            <li><span className="font-semibold">🏷️ Category:</span> {listing.category}</li>
          </ul>
          <div className="mt-6">
            <Link to="/" className="btn btn-outline btn-sm">← Back to Listings</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
