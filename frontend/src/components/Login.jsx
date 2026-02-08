import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post("/api/users/login", {
      email,
      password,
    });
    // data is { token, user: {...} }
    localStorage.setItem("token", data.token);
    setUser(data.user); // Focus on the user object here
    navigate("/");
  } catch (error) {
    // This will now show the actual Supabase error (e.g., "Invalid login credentials")
    setError(error.response?.data?.message || "Server error");
  }
};
  // Login.jsx (Apply similar logic to Register.jsx)
return (
  <div className="min-h-[80vh] flex items-center justify-center px-6">
    <div className="w-full max-w-md bg-white border border-[#EAE0D5] p-10 rounded-[40px] shadow-sm">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#2C2C2C]">Welcome Back</h2>
        <p className="text-[#726D6A] mt-2">Pick up where you left off.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full px-6 py-4 bg-[#FDFCF8] border border-[#EAE0D5] rounded-2xl outline-none focus:ring-2 focus:ring-[#D6CCC2] transition-all"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-6 py-4 bg-[#FDFCF8] border border-[#EAE0D5] rounded-2xl outline-none focus:ring-2 focus:ring-[#D6CCC2] transition-all"
          required
        />
        <button className="w-full bg-[#2C2C2C] text-[#FDFCF8] py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all mt-4">
          Sign In
        </button>
      </form>
      
      <p className="mt-8 text-center text-[#726D6A]">
        New here? <Link className="text-[#2C2C2C] font-bold hover:underline" to="/register">Create account</Link>
      </p>
    </div>
  </div>
);
};

export default Login;