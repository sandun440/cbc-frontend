import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function FixedCartIcon() {
  return (
    <Link to="/cart">
      <div className="fixed bottom-8 right-8 z-50 group">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-accent opacity-30 group-hover:opacity-0 animate-ping" />

        <div className="relative w-16 h-16 bg-accent-gradient rounded-full shadow-xl shadow-accent/40 flex items-center justify-center hover:shadow-2xl hover:shadow-accent/50 hover:scale-110 transition-all duration-300">
          <FaCartShopping size={24} color="white" />
        </div>
      </div>
    </Link>
  );
}