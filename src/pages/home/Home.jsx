import React, { useState } from "react";
import Hero from "../../components/Hero.jsx";
import Categories from "../../components/Categories.jsx";
import Listings from "../../components/Listings.jsx";
import CTA from "../../components/CTA.jsx";
import Footer from "../../components/Footer.jsx";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filters, setFilters] = useState({
    location: "All",
    rent: "All",
    area: "All",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Hero onSearch={handleSearchSubmit} />
      <Categories
        onSelectCategory={setSelectedCategory}
        onFilterChange={handleFilterChange}
      />
      <Listings
        selectedCategory={selectedCategory}
        filters={filters}
        searchTerm={searchTerm}
      />
      <CTA />
      <Footer />
    </>
  );
}
