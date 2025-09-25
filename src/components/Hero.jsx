import { Button, TextField } from "@mui/material";
import React from "react";

export default function Hero() {
  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("searchTerm"));
  }
  return (
    <div
      className="hero min-h-[70vh] sm:min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-img.jpg')" }}
    >
      <div className="hero-overlay bg-black/50"></div>

      <div className="hero-content text-center text-white px-4">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Find Your Perfect Rental in Dhaka
          </h1>
          <p className="py-4 md:py-6 text-base sm:text-lg">
            Connecting tenants and house owners with ease.
          </p>
          <div className="join flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0">
            <form onSubmit={handleSearch}>
              <TextField
                name="searchTerm"
                label="Search"
                id="outlined-size-small"
                defaultValue="2xl"
                size="small"
                variant="filled"
                color="primary"
                className="bg-white rounded-b-field"
              />
              <Button type="submit" variant="contained" color="primary" size="large">
              Search
            </Button>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}
