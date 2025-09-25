import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Categories from "./components/Categories.jsx";
import Listings from "./components/Listings.jsx";
import CTA from "./components/CTA.jsx";
import Footer from "./components/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import ListingDetails from "./pages/ListingDetails/ListingDetails.jsx";
import ListingPage from "./pages/ListingDetails/ListingPage/ListingPage.jsx";
import Chat from "./pages/ListingDetails/Chat/Chat.jsx";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [filters, setFilters] = useState({
    location: "All",
    rent: "All",
    area: "All",
  });

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="font-sans">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Categories
                onSelectCategory={setSelectedCategory}
                onFilterChange={handleFilterChange}
              />
              <Listings selectedCategory={selectedCategory} filters={filters} />
              <CTA />
              <Footer />
            </>
          }
        />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/listings" element={<ListingPage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}
