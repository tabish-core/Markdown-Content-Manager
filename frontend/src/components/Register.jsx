import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-[#FDFCF8]">
      <div className="w-full max-w-md bg-white border border-[#EAE0D5] p-10 rounded-[40px] shadow-sm">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#2C2C2C]">Welcome</h2>
          <p className="text-[#726D6A] mt-2">Start capturing your thoughts today.</p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-500 text-sm rounded-xl text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-6 py-4 bg-[#FDFCF8] border border-[#EAE0D5] rounded-2xl outline-none focus:ring-2 focus:ring-[#D6CCC2] transition-all placeholder:text-[#A8A29E]"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-6 py-4 bg-[#FDFCF8] border border-[#EAE0D5] rounded-2xl outline-none focus:ring-2 focus:ring-[#D6CCC2] transition-all placeholder:text-[#A8A29E]"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
            className="w-full px-6 py-4 bg-[#FDFCF8] border border-[#EAE0D5] rounded-2xl outline-none focus:ring-2 focus:ring-[#D6CCC2] transition-all placeholder:text-[#A8A29E]"
            required
          />
          <button className="w-full bg-[#2C2C2C] text-[#FDFCF8] py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all mt-4 active:scale-[0.98]">
            Create Account
          </button>
        </form>
        
        <p className="mt-8 text-center text-[#726D6A]">
          Already have an account?{" "}
          <Link className="text-[#2C2C2C] font-bold hover:underline" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;