import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import SignOutButton from "./SignOut.jsx";

export default function Navbar() {
  const { user } = useUser();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Listings", path: "/listings" },
    { name: "Tenant Requests", path: "/requests" },
    { name: "Chat", path: "/chat" },
  ];

  return (
    <nav className="navbar bg-blue-400 text-white px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
          Basha Khuji
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="flex-none hidden md:block">
        <ul className="menu menu-horizontal px-1 gap-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
          {user ? (
            <li>
              <SignOutButton />
            </li>
          ) : (
            <>
              <li>
                <Link to="/signin">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Dropdown */}
      <div className="dropdown md:hidden">
        <label tabIndex={0} className="btn btn-ghost" aria-label="Open menu">
          ☰
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content right-0 mt-3 z-[1] p-2 shadow bg-blue-400 text-white rounded-box w-52"
        >
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
          {user ? (
            <li>
              <SignOutButton />
            </li>
          ) : (
            <>
              <li>
                <Link to="/signin">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
