import React from "react";

export default function Categories({ onSelectCategory, onFilterChange }) {
  const categories = [
    { name: "All", icon: "🌐" },
    { name: "Apartments", icon: "🏠" },
    { name: "Sublets", icon: "🛏️" },
    { name: "Offices", icon: "🏢" },
    { name: "Shops", icon: "🛒" },
  ];

  const areas = ["All", "Dhanmondi", "Mirpur", "Gulshan", "Banani", "Motijheel", "New Market"];
  const rentRanges = ["All", "0-10000", "10000-20000", "20000-30000", "30000+"];
  const areaRanges = ["All", "0-500", "500-1000", "1000+"];

  return (
    <section className="py-10 text-center">
      <h2 className="text-3xl font-bold mb-6">Browse by Category</h2>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelectCategory(cat.name)}
            className="btn btn-outline btn-lg flex items-center gap-2"
          >
            <span>{cat.icon}</span> {cat.name}
          </button>
        ))}
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* Area Filter */}
        <label className="form-control w-52">
          <span className="label-text mb-1 font-semibold">Area</span>
          <select
            onChange={(e) => onFilterChange("location", e.target.value)}
            className="select select-bordered"
          >
            {areas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </label>

        {/* Rent Filter */}
        <label className="form-control w-52">
          <span className="label-text mb-1 font-semibold">Rent Range</span>
          <select
            onChange={(e) => onFilterChange("rent", e.target.value)}
            className="select select-bordered"
          >
            {rentRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </label>

        {/* Area Sqft Filter */}
        <label className="form-control w-52">
          <span className="label-text mb-1 font-semibold">Size (sqft)</span>
          <select
            onChange={(e) => onFilterChange("area", e.target.value)}
            className="select select-bordered"
          >
            {areaRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
