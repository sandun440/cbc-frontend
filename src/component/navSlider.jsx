import { AiFillProduct } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { IoIosContacts, IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavSlider({ closeSlider }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
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
                setUser(null);
                setIsLoggedIn(false);
            }
        } catch (err) {
            console.error("Error fetching user in slider:", err);
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoggedIn(false);
        closeSlider(); // Close slider after logout
        navigate("/");
    };

    return (
        <div className="fixed w-full h-screen bg-[#00000080] z-[100] lg:hidden">
            <div className="bg-white w-full h-[100px] relative flex items-center justify-center">
                <img src="/logo.png" className="absolute h-full rounded-full cursor-pointer left-[10px]" />
                <IoMdClose onClick={closeSlider} className="text-3xl text-accent absolute right-[10px] cursor-pointer" />
            </div>

            <div className="bg-white w-[300px] h-[calc(100vh-100px)] flex flex-col justify-between">
                <div className="h-[200px] flex flex-col ml-2 text-xl text-accent-dark justify-between">
                    <div className="flex flex-row items-center">
                        <FaHome />
                        <Link to="/" onClick={closeSlider} className="text-accent font-bold ml-3 hover:border-b border-b-accent">Home</Link>
                    </div>
                    <div className="flex flex-row items-center">
                        <AiFillProduct />
                        <Link to="/products" onClick={closeSlider} className="text-accent font-bold ml-3 hover:border-b border-b-accent">Products</Link>
                    </div>
                    <div className="flex flex-row items-center">
                        <IoIosContacts />
                        <Link to="/about" onClick={closeSlider} className="text-accent font-bold ml-3 hover:border-b border-b-accent">About Us</Link>
                    </div>
                    <div className="flex flex-row items-center">
                        <IoIosContacts />
                        <Link to="/contact" onClick={closeSlider} className="text-accent font-bold ml-3 hover:border-b border-b-accent">Contact Us</Link>
                    </div>
                </div>

                <div className="w-[280px] h-[100px] flex flex-col justify-between ml-1 mb-[50px]">
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" onClick={closeSlider} className="text-white bg-accent p-2 rounded-xl font-bold text-xl hover:bg-accent-light flex justify-center">Login</Link>
                            <Link to="/signup" onClick={closeSlider} className="text-accent font-bold text-xl border p-2 rounded-xl hover:bg-accent-light flex justify-center">Signup</Link>
                        </>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div onClick={() => { navigate("/profile"); closeSlider(); }} className="flex flex-col items-center cursor-pointer">
                                <img
                                    src={user?.profilePicture || "/default-profile.jpg"}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full mb-2"
                                />
                                <span className="text-accent font-bold text-lg">{user?.firstName || "User"}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="mt-3 text-white bg-red-500 p-2 rounded-xl font-bold text-sm hover:bg-red-600 w-full"
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
