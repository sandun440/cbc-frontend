import { AiFillProduct } from "react-icons/ai";
import { FaHome, FaInfoCircle, FaPhoneAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/products", label: "Products", icon: <AiFillProduct /> },
    { to: "/about", label: "About Us", icon: <FaInfoCircle /> },
    { to: "/contact", label: "Contact Us", icon: <FaPhoneAlt /> },
];

export default function NavSlider({ closeSlider }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => setVisible(true), 10);
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        } catch (err) {
            console.error("Error fetching user in slider:", err);
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    const handleClose = () => {
        setVisible(false);
        setTimeout(closeSlider, 280);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoggedIn(false);
        handleClose();
        navigate("/");
    };

    return (
        <div
            className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
                visible ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"
            }`}
            onClick={handleClose}
        >
            <div
                className={`absolute left-0 top-0 h-full w-[300px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
                    visible ? "translate-x-0" : "-translate-x-full"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="h-[80px] flex items-center justify-between px-5 border-b border-accent/15 bg-gradient-to-r from-primary to-cream">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" className="h-12 w-12 rounded-full object-cover ring-2 ring-accent/30" />
                        <div>
                            <p className="font-playfair font-bold text-accent text-sm leading-tight">Crystal Beauty</p>
                            <p className="text-xs text-secondary tracking-widest">CLEAR</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-secondary hover:bg-accent/10 hover:text-accent transition-all duration-200"
                    >
                        <IoMdClose className="text-xl" />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-6 px-4 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={handleClose}
                            className="flex items-center gap-4 px-4 py-3 rounded-xl text-secondary hover:bg-accent/8 hover:text-accent font-medium transition-all duration-200 group"
                        >
                            <span className="text-accent/60 group-hover:text-accent text-lg transition-colors">
                                {link.icon}
                            </span>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Auth Section */}
                <div className="p-5 border-t border-accent/15 space-y-3">
                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                onClick={handleClose}
                                className="block w-full text-center py-2.5 text-accent font-semibold border border-accent rounded-xl hover:bg-accent hover:text-white transition-all duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                onClick={handleClose}
                                className="block w-full text-center py-2.5 text-white font-semibold bg-accent-gradient rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all duration-300"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <div className="space-y-3">
                            <div
                                onClick={() => { navigate("/profile"); handleClose(); }}
                                className="flex items-center gap-3 p-3 rounded-xl bg-accent/6 cursor-pointer hover:bg-accent/12 transition-all duration-200"
                            >
                                <img
                                    src={user?.profilePicture || "/default-profile.jpg"}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-accent/30"
                                />
                                <div>
                                    <p className="font-semibold text-accent">{user?.firstName || "User"}</p>
                                    <p className="text-xs text-secondary">View Profile</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full py-2.5 text-red-600 font-semibold border border-red-300 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
