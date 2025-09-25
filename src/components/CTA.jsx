import React from "react";

export default function CTA() {
  return (
    <section className="text-center bg-blue-400 text-white py-16">
      <h2 className="text-3xl font-bold mb-4">Are you a house owner?</h2>
      <p className="mb-6 px-0.5">
        Post your property and connect with thousands of tenants instantly.
      </p>
      <a href="/post-listing" className="btn btn-warning text-white">
        Post a Listing
      </a>

      {/* Contact Info */}
      <div className="mt-10">
        <p className="text-lg font-semibold">📞 Contact: +880 1234-567890</p>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mt-6 text-2xl">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-blue-200"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-pink-200"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="hover:text-gray-200"
        >
          <i className="fab fa-x-twitter"></i>
        </a>
      </div>
    </section>
  );
}
