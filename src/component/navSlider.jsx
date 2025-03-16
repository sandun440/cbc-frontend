import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

export default function NavSlider(props) {
    const closeSlider = props.closeSlider;
    return(
        <div className="fixed w-full h-screen bg-[#00000080] z-[100] lg:hidden">
            <div className="bg-white w-full h-[100px] relative flex items-center justify-center">
                <img src="/logo.png" className="absolute h-full rounded-full cursor-pointer left-[10px]" />
                <IoMdClose onClick={closeSlider} className="text-3xl text-accent absolute right-[10px] cursor-pointer lg:hidden"/>
            </div>
            <div className="bg-white w-[300px] h-screen flex flex-col ">
                <Link to="/" className="text-accent font-bold text-xl hover:border-b border-b-accent">Home</Link>
                <Link to="/products" className="text-accent font-bold text-xl hover:border-b border-b-accent">Products</Link>
                <Link to="/about" className="text-accent font-bold text-xl hover:border-b border-b-accent">About Us</Link>
                <Link to="/contact" className="text-accent font-bold text-xl hover:border-b border-b-accent">Contact Us</Link>
                <Link to="/cart" className="text-accent font-bold text-xl hover:border-b border-b-accent">cart</Link>
            </div>
        </div>
    )
}