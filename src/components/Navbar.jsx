import React from "react";

export default function Navbar() {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Listings", path: "/listings" },
    { name: "Tenant Requests", path: "/requests" },
    { name: "Chat", path: "/chat" },
    { name: "Login", path: "/login" },
    { name: "Signup", path: "/signup" },
  ];

  return (
    <nav className="navbar bg-blue-400 text-white px-6">
      {/* Brand */}
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-2xl font-bold">
          Basha Khuji
        </a>
      </div>

      {/* Desktop Menu (only on md+) */}
      <div className="flex-none hidden md:block">
        <ul className="menu menu-horizontal px-1 gap-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Dropdown (only on <md) */}
      <div className="dropdown md:hidden">
        <label
          tabIndex={0}
          className="btn btn-ghost"
          aria-label="Open menu"
        >
          ☰
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content right-0 mt-3 z-[1] p-2 shadow bg-blue-400 text-white rounded-box w-52"
        >
          {menuItems.map((item) => (
            <li key={item.path}>
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
