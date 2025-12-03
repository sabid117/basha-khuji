import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Lottie from "lottie-react";
import signupAnim from "../../assets/lottie/signup.json";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const returnTo = location.state?.from || "/";

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate(returnTo, { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200 text-white">
      <div className="w-full max-w-md bg-base-100 p-8 rounded shadow">
        <Lottie animationData={signupAnim} loop className="h-40 mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-center">Create Your Account</h2>

        <p className="text-sm text-gray-500 mb-4 text-center">
          Already a member?{" "}
          <Link to="/signin" className="text-blue-600 font-medium">
            Sign in
          </Link>
        </p>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSignUp} className="space-y-4">
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
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-semibold rounded hover:scale-105 transition-transform"
          >
            {loading ? "Creating account..." : "🚀 Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
