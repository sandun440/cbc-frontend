import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import NavSlider from "./navSlider";

export default function Header() {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Fetch user data from the backend
            fetchUserData(token);
        }
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
            <header className="bg-primary w-full h-[100px] relative flex items-center justify-center">
                <img
                    src="/logo.png"
                    className="absolute h-full rounded-full cursor-pointer left-[10px]"
                />
                <RxHamburgerMenu
                    onClick={() => {
                        setIsSliderOpen(true);
                    }}
                    className="text-3xl text-accent absolute right-[10px] cursor-pointer lg:hidden"
                />

                <div className="h-full w-[500px] items-center justify-between hidden lg:flex">
                    <Link
                        to="/"
                        className="text-accent font-bold text-xl hover:border-b border-b-accent"
                    >
                        Home
                    </Link>
                    <Link
                        to="/products"
                        className="text-accent font-bold text-xl hover:border-b border-b-accent"
                    >
                        Products
                    </Link>
                    <Link
                        to="/about"
                        className="text-accent font-bold text-xl hover:border-b border-b-accent"
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contact"
                        className="text-accent font-bold text-xl hover:border-b border-b-accent"
                    >
                        Contact Us
                    </Link>
                </div>

                <div className="absolute w-[300px] h-full flex-row items-center justify-around right-[10px] hidden lg:flex">
                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                className="text-white bg-accent p-2 rounded-xl font-bold text-xl hover:bg-accent-light w-30 text-center"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="text-accent font-bold text-xl border p-2 rounded-xl hover:bg-accent-light w-30 text-center"
                            >
                                Signup
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center space-x-4 cursor-pointer">
                            <img
                                src={user?.profilePicture || "/default-profile.png"}
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                                onClick={() => navigate("/profile")}
                            />
                            <span className="text-accent font-bold text-xl">
                                {user?.firstName || "User"}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-white bg-red-500 p-2 rounded-xl font-bold text-sm hover:bg-red-600"
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