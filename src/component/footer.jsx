import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Footer(){
  return(
    <>
    <div className="w-full h-[270px] flex flex-col bg-black/25 ">
      <div className="w-full relative flex flex-row justify-around">
        <div className="w-[150px] h-[150px] flex flex-col items-center">
          <img src="/logo.png" className="cursor-pointer"/>
            <p className="font-bold">Crystal beauty clear</p>
            <p className="font-semibold w-[250px] text-center">Beauty. Elegance. Confidence.</p>
        </div>
        <div className="w-[200px]  flex flex-col items-center">
          <h1 className="font-bold text-3xl mt-3">Quick Links</h1>
          <Link to="/" className="hover:underline hover:text-primary p-3 ">Home</Link>
          <Link to="/products" className="hover:underline hover:text-primary p-3 ">Products</Link>
          <Link to="/About" className="hover:underline hover:text-primary p-3 ">About Us</Link>
          <Link to="/contact" className="hover:underline hover:text-primary p-3 ">Contact Us</Link>

        </div>
        <div className="w-[450px] flex flex-col ">
          <h1 className="font-bold text-3xl mt-3 ml-[100px]">Contact</h1>
          <div className="flex flex-row items-center">
            <FaLocationDot />
            <p className="p-2">Address : 01st Floor, No.08 ,1, 1 Old Kottawa Rd, Nugegoda</p>
          </div>
          <div className="flex flex-row items-center">
            <FaPhoneAlt />
            <p className="p-2">Phone : 077 1234567</p>
          </div>
          <div className="flex flex-row items-center">
            <IoIosMail />
            <p className="p-2">Email : jHsEg@example.com</p>
          </div>
          
        </div>


      </div>
      <div className="w-full h-[2px] bg-white"></div>
      <div className="flex items-center justify-center">
        <p className="font-semibold">Copyright &copy; 2025 Crystal beauty clear</p>
      </div>
      </div>
    </>
  )
}