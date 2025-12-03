import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import Lottie from "lottie-react";
import signinAnim from "../../assets/lottie/signin.json"; // optional animation if you have one

export default function SignIn() {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");
    if (!email) {
      setError("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200 text-white">
      <div className="w-full max-w-md bg-base-100 p-8 rounded shadow">
        {/* Optional animation */}
        {signinAnim && <Lottie animationData={signinAnim} loop className="h-40 mb-4" />}
        <h2 className="text-2xl font-bold mb-2 text-center">Sign In</h2>

        <p className="text-sm text-gray-500 mb-4 text-center">
          Not a member?{" "}
          <Link to="/signup" className="text-blue-600 font-medium">
            Sign up
          </Link>
        </p>

        {error && <p className="text-red-400 mb-4">{error}</p>}
        {message && <p className="text-green-400 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-600 rounded bg-base-200 text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-600 rounded bg-base-200 text-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-semibold rounded hover:scale-105 transition-transform"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-400 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
