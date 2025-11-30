import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Lottie from "lottie-react";
import loginAnim from "../../assets/lottie/login.json";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200 text-white">
      <div className="w-full max-w-md bg-base-100 p-8 rounded shadow">
        <Lottie animationData={loginAnim} loop className="h-40 mb-4" />
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-600 rounded bg-base-200 text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-600 rounded bg-base-200 text-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-semibold rounded hover:scale-105 transition-transform"
          >
            🔐 Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
