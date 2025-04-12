import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Footer(){
  return(
    <>
    <div className="w-full h-auto flex flex-col lg:flex-row bg-black/25 p-4">
      <div className="w-full lg:w-1/3 flex flex-col items-center">
        <img src="/logo.png" className="w-20 h-20" />
        <p className="font-bold">Crystal Beauty Clear</p>
        <p className="font-semibold text-center">Beauty. Elegance. Confidence.</p>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col items-center">
        <h1 className="font-bold text-xl mt-3">Quick Links</h1>
        <Link to="/" className="hover:underline hover:text-primary p-2">Home</Link>
        <Link to="/products" className="hover:underline hover:text-primary p-2">Products</Link>
        <Link to="/about" className="hover:underline hover:text-primary p-2">About Us</Link>
        <Link to="/contact" className="hover:underline hover:text-primary p-2">Contact Us</Link>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col items-center">
        <h1 className="font-bold text-xl mt-3">Contact</h1>
        <p className="p-2">Address: 01st Floor, No.08, Old Kottawa Rd, Nugegoda</p>
        <p className="p-2">Phone: 077 1234567</p>
        <p className="p-2">Email: example@example.com</p>
      </div>
    </div>
    <div className="w-full h-[2px] bg-white"></div>
    <div className="flex items-center justify-center">
      <p className="font-semibold">Copyright &copy; 2025 Crystal beauty clear</p>
    </div>
    </>
  )
}