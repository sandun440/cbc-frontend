import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import NavSlider from "./navSlider";

export default function Header() {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    return(
        <>
        {isSliderOpen && <NavSlider closeSlider={()=>{setIsSliderOpen(false)}}/>}
        <header className="bg-white w-full h-[100px] relative flex items-center justify-center">

            <img src="/logo.png" className="absolute h-full rounded-full cursor-pointer left-[10px]" />
            <RxHamburgerMenu onClick={()=>{setIsSliderOpen(true)}} className="text-3xl text-accent absolute right-[10px] cursor-pointer lg:hidden" />

            <div className="h-full w-[500px] items-center justify-between hidden lg:flex">
                <Link to="/" className="text-accent font-bold text-xl hover:border-b border-b-accent">Home</Link>
                <Link to="/products" className="text-accent font-bold text-xl hover:border-b border-b-accent">Products</Link>
                <Link to="/about" className="text-accent font-bold text-xl hover:border-b border-b-accent">About Us</Link>
                <Link to="/contact" className="text-accent font-bold text-xl hover:border-b border-b-accent">Contact Us</Link>
                <Link to="/cart" className="text-accent font-bold text-xl hover:border-b border-b-accent">cart</Link>
            </div>
            <div className="absolute w-[200px] h-full flex-row items-center justify-around right-[10px] hidden lg:flex">
                <Link to="/login" className="text-white bg-accent p-2 rounded-xl font-bold text-xl hover:bg-accent-light">Login</Link>
                <Link to="/signup" className="text-accent font-bold text-xl border p-2 rounded-xl hover:bg-accent-light">Signup</Link>

            </div>



        </header>
        </>
    )
}