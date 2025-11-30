import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";

export default function App() {
  return (
    <div className="font-sans">
      <RouterProvider router={router} />
    </div>
  );
}
