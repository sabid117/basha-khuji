import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

export default function Navbar() {
  const { user } = useUser();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Listings", path: "/listings" },
    { name: "Chat", path: "/chat" },
  ];

  return (
    <nav className="navbar bg-blue-400 text-white px-6 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold text-white">
          Basha Khuji
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="flex-none hidden md:flex items-center gap-4">
        <ul className="menu menu-horizontal px-1 gap-4 items-center">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="hover:underline">
                {item.name}
              </Link>
            </li>
          ))}

          {user ? (
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-2 btn btn-ghost hover:bg-white/10 rounded-md px-3 py-2"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "avatar"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
                  </span>
                )}
                <span className="hidden sm:inline">{user.displayName || "My Profile"}</span>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/signin" className="hover:underline">
                  Sign in
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn btn-sm btn-outline text-white border-white/30 hover:bg-white/10">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost text-white" aria-label="Open menu">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-b-400 text-white rounded-box w-52"
          >
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}

            {user ? (
              <>
                <li>
                  <Link to="/profile" className="flex items-center gap-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "avatar"}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
                      </span>
                    )}
                    <span>{user.displayName || "My Profile"}</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signin">Sign in</Link>
                </li>
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
