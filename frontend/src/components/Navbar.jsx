import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Navbar = ({ user, setUser }) => {
  const [search, setSearch] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const mobileInputRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    const delay = setTimeout(() => {
      navigate(search.trim() ? `/?search=${encodeURIComponent(search)}` : "/");
    }, 500);
    return () => clearTimeout(delay);
  }, [search, navigate, user]);

  useEffect(() => {
    setSearch("");
    setMobileSearchOpen(false);
  }, [user]);

  useEffect(() => {
    if (mobileSearchOpen && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleMobileSearchClose = () => {
    setMobileSearchOpen(false);
    setSearch("");
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#FDFCF8]/80 backdrop-blur-md border-b border-[#EAE0D5]">
      {/* Main navbar row */}
      <div className="px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight text-[#2C2C2C] shrink-0">
            Tabish's Notes<span className="text-[#A8A29E]">.</span>
          </Link>

          {/* Desktop search — hidden on mobile */}
          {user && (
            <div className="hidden md:flex items-center flex-1 max-w-xl px-10">
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
            <div className="flex items-center space-x-4">
              {/* Mobile search icon */}
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="md:hidden text-[#726D6A] hover:text-[#2C2C2C] transition-colors"
                aria-label="Open search"
              >
                <SearchIcon />
              </button>

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
      </div>

      {/* Mobile search — slides down when open */}
      {user && mobileSearchOpen && (
        <div className="md:hidden px-6 pb-4 animate-[slideDown_0.2s_ease-out]">
          <div className="relative w-full">
            <input
              ref={mobileInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your thoughts..."
              className="w-full px-5 py-2.5 pr-12 bg-[#F5F2ED] text-[#2C2C2C] rounded-full border-none outline-none focus:ring-2 focus:ring-[#D6CCC2] transition-all placeholder:text-[#A8A29E] text-sm"
            />
            <button
              onClick={handleMobileSearchClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#2C2C2C] transition-colors"
              aria-label="Close search"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;