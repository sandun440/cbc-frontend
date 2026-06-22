import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import NavSlider from "./navSlider";

export default function Header() {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserData(token);
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser(null);
        navigate("/");
    };

    return (
        <>
            {isSliderOpen && <NavSlider closeSlider={() => setIsSliderOpen(false)} />}
            <header
                className={`w-full h-[80px] sticky top-0 z-50 flex items-center justify-between px-6 transition-all duration-300 ${
                    scrolled
                        ? "bg-white/95 backdrop-blur-md shadow-md border-b border-accent/10"
                        : "bg-white shadow-sm border-b border-accent/10"
                }`}
            >
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src="/logo.png"
                        className="h-[60px] w-[60px] rounded-full object-cover ring-2 ring-accent/20 group-hover:ring-accent/60 transition-all duration-300"
                    />
                    <div className="hidden sm:block">
                        <span className="font-playfair text-lg font-bold text-accent leading-tight block">Crystal Beauty</span>
                        <span className="text-xs text-secondary tracking-widest uppercase">Clear</span>
                    </div>
                </Link>

                {/* Hamburger - mobile */}
                <RxHamburgerMenu
                    onClick={() => setIsSliderOpen(true)}
                    className="text-2xl text-accent cursor-pointer lg:hidden hover:text-accent-dark transition-colors"
                />

                {/* Nav Links - desktop */}
                <nav className="hidden lg:flex items-center gap-8">
                    {[
                        { to: "/", label: "Home" },
                        { to: "/products", label: "Products" },
                        { to: "/about", label: "About Us" },
                        { to: "/contact", label: "Contact" },
                    ].map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="relative text-secondary font-medium text-sm tracking-wide group hover:text-accent transition-colors duration-200"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent rounded-full group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                </nav>

                {/* Auth Buttons - desktop */}
                <div className="hidden lg:flex items-center gap-3">
                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                className="px-5 py-2 text-sm font-semibold text-accent border border-accent rounded-full hover:bg-accent hover:text-white transition-all duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-5 py-2 text-sm font-semibold text-white bg-accent-gradient rounded-full hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <div
                                onClick={() => navigate("/profile")}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <img
                                    src={user?.profilePicture || "/default-profile.jpg"}
                                    alt="Profile"
                                    className="w-9 h-9 rounded-full object-cover ring-2 ring-accent/30 group-hover:ring-accent transition-all duration-300"
                                />
                                <span className="text-sm font-semibold text-accent group-hover:text-accent-dark transition-colors">
                                    {user?.firstName || "User"}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-1.5 text-sm font-semibold text-red-600 border border-red-300 rounded-full hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}