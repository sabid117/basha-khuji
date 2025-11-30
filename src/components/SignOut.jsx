import React from "react";
import { useUser } from "../context/UserContext";

export default function SignOutButton() {
  const { logout } = useUser();

  return (
    <button
      onClick={logout}
      className="btn btn-sm bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white hover:scale-105 transition-transform"
    >
      🚪 Sign Out
    </button>
  );
}
