import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const delay = setTimeout(() => {
      navigate(search.trim() ? `/?search=${encodeURIComponent(search)}` : "/");
    }, 500);
    return () => clearTimeout(delay);
  }, [search, navigate, user]);

  useEffect(() => {
    setSearch("");
  }, [user]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Navbar.jsx
return (
  <nav className="sticky top-0 z-40 w-full bg-[#FDFCF8]/80 backdrop-blur-md border-b border-[#EAE0D5] px-6 py-4">
    <div className="container mx-auto flex items-center justify-between">
      <Link to="/" className="text-xl font-bold tracking-tight text-[#2C2C2C]">
        Content Markdown<span className="text-[#A8A29E]">.</span>
      </Link>
      
      {user && (
        <div className="flex items-center space-x-6 flex-1 max-w-xl px-10">
          <div className="relative w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your thoughts..."
              className="w-full px-5 py-2.5 bg-[#F5F2ED] text-[#2C2C2C] rounded-full border-none outline-none focus:ring-2 focus:ring-[#D6CCC2] transition-all placeholder:text-[#A8A29E] text-sm"
            />
          </div>
        </div>
      )}

      {user && (
        <div className="flex items-center space-x-5">
          <span className="text-sm font-medium text-[#726D6A]">@{user.username}</span>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-red-400 hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </nav>
);
};

export default Navbar;