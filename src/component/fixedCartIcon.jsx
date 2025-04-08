import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function FixedCartIcon() { 
  return (
    <>
    <Link to="/cart">
      <div className="fixed bottom-10 right-10 z-50 bg-accent rounded-full p-2 shadow-lg w-20 h-20 flex items-center justify-center transition-transform transform hover:scale-110 hover:border-2 border-accent-light">
          <FaCartShopping size={24} color="white"  />
      </div>
    </Link>
    </>
  )
}