import { AiFillProduct } from "react-icons/ai";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { IoIosContacts, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

export default function NavSlider(props) {
    const closeSlider = props.closeSlider;
    return(
        <div className="fixed w-full h-screen bg-[#00000080] z-[100] lg:hidden">
            <div className="bg-white w-full h-[100px] relative flex items-center justify-center">
                <img src="/logo.png" className="absolute h-full rounded-full cursor-pointer left-[10px]" />
                <IoMdClose onClick={closeSlider} className="text-3xl text-accent absolute right-[10px] cursor-pointer lg:hidden"/>
            </div>
            <div className="bg-white w-[300px] h-[calc(100vh-100px)] flex flex-col justify-between">
                <div className="h-[200px] flex flex-col ml-2 text-xl text-accent-dark justify-between">
                    <div className="flex flex-row items-center">
                        <FaHome />
                        <Link to="/" className="text-accent font-bold  hover:border-b border-b-accent ml-3" onClick={closeSlider}>Home</Link>
                    </div>
                    <div className="flex flex-row items-center">
                        <AiFillProduct />
                        <Link to="/products" className="text-accent font-bold hover:border-b border-b-accent ml-3" onClick={closeSlider}>Products</Link>
                    </div>
                    <div className="flex flex-row items-center">
                        <IoIosContacts />
                        <Link to="/about" className="text-accent font-bold hover:border-b border-b-accent ml-3" onClick={closeSlider}>About Us</Link>
                    </div>
                    <div className="flex flex-row items-center">
                        <IoIosContacts />
                        <Link to="/contact" className="text-accent font-bold hover:border-b border-b-accent ml-3" onClick={closeSlider}>Contact Us</Link>
                    </div>
                    <div className="flex flex-row items-center">
                        <FaShoppingCart />
                        <Link to="/cart" className="text-accent font-bold hover:border-b border-b-accent ml-3" onClick={closeSlider}>cart</Link>
                    </div>
                    
                </div>
                <div className="w-[280px] h-[100px] flex flex-col justify-between ml-1 mb-[50px]">
                    <Link to="/login" className="text-white bg-accent p-2 rounded-xl font-bold text-xl hover:bg-accent-light flex justify-center">Login</Link>
                    <Link to="/signup" className="text-accent font-bold text-xl border p-2 rounded-xl hover:bg-accent-light flex justify-center">Signup</Link>
                </div>
            </div>
            
        </div>
    )
}