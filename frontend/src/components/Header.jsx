import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  User,
  BarChart3,
  Menu,
  X,
  PlusCircle,
  Building2,
  ShoppingBag,
  LogIn,
  UserPlus,
  LogOut,
  Calculator,
} from "lucide-react";
import gsap from "gsap";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { isBuyer, setIsBuyer, isAuthenticated, user, logout } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const drawerRef = useRef(null);
  const overlayRef = useRef(null);

  // Swipe tracking
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Buyer Navigation Items
  const buyerNavItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/search", label: "Search", icon: Search },
    { path: "/ml-calculator", label: "ROI Calculator", icon: Calculator },
  ];

  // Seller Navigation Items
  const sellerNavItems = [
    { path: "/seller/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/seller/my-properties", label: "My Properties", icon: Building2 },
    { path: "/seller/add-property", label: "Add Property", icon: PlusCircle },
  ];

  // Get current nav items based on mode
  const navItems = isAuthenticated
    ? isBuyer
      ? buyerNavItems
      : sellerNavItems
    : buyerNavItems;

  const isActive = (path) => location.pathname === path;

  // Toggle between Buyer and Seller mode
  const handleModeToggle = () => {
    if (!isAuthenticated) {
      // If not logged in, redirect to login
      navigate("/login");
      setIsOpen(false);
      return;
    }

    setIsBuyer(!isBuyer);
    // Redirect to appropriate page
    if (isBuyer) {
      navigate("/seller/dashboard");
    } else {
      navigate("/");
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const NavContent = () => (
    <>
      {navItems.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          onClick={() => setIsOpen(false)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isActive(path) ? "bg-black text-white" : "hover:bg-gray-200"
          }`}
        >
          <Icon size={18} />
          <span>{label}</span>
        </Link>
      ))}
    </>
  );

  /* GSAP animations */
  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: "auto",
      });

      gsap.fromTo(
        drawerRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.45, ease: "power3.out" },
      );
    } else {
      document.body.style.overflow = "";

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: "none",
      });

      gsap.to(drawerRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  /* Swipe handlers */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchEndX.current - touchStartX.current > 80) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b px-2">
        <div className="flex p-2 justify-between items-center">
          <Link to="/" className="font-bold text-xl ">
            <img
              className="w-auto h-18"
              src="\src\assets\TerraPulse.jpeg"
              alt="logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-3">
            <NavContent />
          </div>

          {/* Desktop Right Side */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Mode Toggle Button */}
                <button
                  onClick={handleModeToggle}
                  className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    isBuyer
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {isBuyer ? (
                    <>
                      <Building2 size={18} />
                      <span>Sell Property</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>Buy Property</span>
                    </>
                  )}
                </button>

                {/* Profile */}
                <Link to="/profile">
                  <div className="hidden md:flex h-10 w-10 items-center justify-center hover:bg-gray-200 rounded-full">
                    <User />
                  </div>
                </Link>

                {/* Logout Button - Desktop */}
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link
                  to="/login"
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>

                {/* Register Button */}
                <Link
                  to="/register"
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  <UserPlus size={18} />
                  <span>Register</span>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Menu onClick={() => setIsOpen(true)} />
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] opacity-0 pointer-events-none"
      />

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="fixed top-0 right-0 h-screen w-64 bg-white border-l z-50 overflow-y-auto"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="flex justify-end p-4">
          <X onClick={() => setIsOpen(false)} className="cursor-pointer" />
        </div>

        <div className="flex flex-col gap-4 px-6">
          {/* User Info (if authenticated) */}
          {isAuthenticated && user && (
            <div className="pb-4 border-b">
              <p className="text-sm text-gray-600">Welcome,</p>
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">
                {isBuyer ? "Buyer Mode" : "Seller Mode"}
              </p>
            </div>
          )}

          {/* Navigation Items */}
          <NavContent />

          {isAuthenticated ? (
            <>
              {/* Mode Toggle (Mobile) */}
              <button
                onClick={handleModeToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  isBuyer
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {isBuyer ? (
                  <>
                    <Building2 size={18} />
                    <span>Switch to Seller</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Switch to Buyer</span>
                  </>
                )}
              </button>

              {/* Profile Link */}
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex gap-2 items-center px-4 py-2 hover:bg-gray-200 rounded-lg"
              >
                <User />
                <p>Profile</p>
              </Link>

              {/* Logout Button - Mobile */}
              <button
                onClick={handleLogout}
                className="flex gap-2 items-center px-4 py-2 hover:bg-red-50 rounded-lg text-red-600 border border-red-300"
              >
                <LogOut size={18} />
                <p>Logout</p>
              </button>
            </>
          ) : (
            <>
              {/* Login Link (Mobile) */}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex gap-2 items-center px-4 py-2 hover:bg-gray-200 rounded-lg border border-gray-300"
              >
                <LogIn size={18} />
                <p>Login</p>
              </Link>

              {/* Register Link (Mobile) */}
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="flex gap-2 items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <UserPlus size={18} />
                <p>Register</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
