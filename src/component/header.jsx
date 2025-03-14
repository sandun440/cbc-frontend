import { Link } from "react-router-dom";

export default function Header() {
    return(
        <header className="bg-white w-full h-[80px] relative flex items-center justify-center">
            <img src="logo.png" className="absolute h-full rounded-full cursor-pointer left-[10px]" />

            <div className="h-full w-[500px]  flex items-center justify-between">
                <Link to="/" className="text-accent font-bold text-xl hover:border-b border-b-accent">Home</Link>
                <Link to="/products" className="text-accent font-bold text-xl hover:border-b border-b-accent">Products</Link>
                <Link to="/about" className="text-accent font-bold text-xl hover:border-b border-b-accent">About Us</Link>
                <Link to="/contact" className="text-accent font-bold text-xl hover:border-b border-b-accent">Contact Us</Link>
            </div>



        </header>
    )
}