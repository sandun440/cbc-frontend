import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";
import ProductCard from "../../component/Productcard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaAnglesRight, FaStar } from "react-icons/fa6";
import ReviewCard from "../../component/reviewcard";

export default function HomePageBody() {
    const [products, setProducts] = useState([]);
    const [Reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const images = [
        { url: "https://i.pinimg.com/1200x/65/6e/f2/656ef2cb9e82a5c102e723bf997a4cb2.jpg" },
        { url: "https://i.pinimg.com/1200x/55/9d/62/559d62ebef1bf7d2eda990704eae17ba.jpg" },
        { url: "https://i.pinimg.com/1200x/32/62/39/3262391ce4a1311f7f429ab244ba43ca.jpg" },
        { url: "https://i.pinimg.com/1200x/f7/a6/69/f7a6699c16b50cb4d3b2c78cf0d47a56.jpg" },
        { url: "https://i.pinimg.com/1200x/fb/4c/ec/fb4cecc19ccc549a7b8e3e415c9c2376.jpg" },
    ];
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
            setProducts(res.data);
        }).catch(() => {});

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews").then((res) => {
            setReviews(res.data);
        }).catch(() => {});

        const interval = setInterval(() => nextImage(), 8000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <>
            {/* ── Hero Slider ── */}
            <section className="relative group px-3 pt-4">
                <div className="w-full h-[500px] sm:h-[620px] rounded-3xl overflow-hidden relative shadow-2xl shadow-accent/10">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-opacity duration-700 ${
                                i === activeIndex ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            <img src={img.url} className="w-full h-full object-cover" alt="banner" />
                        </div>
                    ))}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />

                    {/* Hero text */}
                    <div className="absolute bottom-10 left-8 right-8 text-white">
                        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-2 font-semibold">Premium Collection</p>
                        <h1 className="font-playfair text-4xl sm:text-5xl font-bold leading-tight drop-shadow-lg">
                            Beauty. Elegance.<br />Confidence.
                        </h1>
                        <button
                            onClick={() => navigate("/products")}
                            className="mt-4 px-6 py-2.5 bg-accent-gradient text-white text-sm font-semibold rounded-full hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Shop Now →
                        </button>
                    </div>

                    {/* Prev/Next */}
                    <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white/40 transition-all duration-300"
                    >
                        <FaChevronLeft size={16} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white/40 transition-all duration-300"
                    >
                        <FaChevronRight size={16} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`transition-all duration-300 rounded-full ${
                                    i === activeIndex
                                        ? "w-6 h-2 bg-accent"
                                        : "w-2 h-2 bg-white/50 hover:bg-white/80"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Brand Statement ── */}
            <section className="py-14 text-center px-4">
                <p className="text-xs uppercase tracking-[0.4em] text-accent font-semibold mb-3">Our Promise</p>
                <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-dark mb-4">
                    Crystal Beauty Clear
                </h2>
                <p className="text-secondary max-w-xl mx-auto text-base leading-relaxed">
                    Discover a world of luxurious beauty essentials, thoughtfully crafted to enhance your natural radiance.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap justify-center gap-10 mt-10">
                    {[
                        { num: "500+", label: "Happy Customers" },
                        { num: "50+", label: "Products" },
                        { num: "4.9★", label: "Average Rating" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="font-playfair text-3xl font-bold text-accent">{stat.num}</p>
                            <p className="text-sm text-secondary mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Featured Products ── */}
            <section className="pb-14 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-2">Handpicked For You</p>
                            <h2 className="font-playfair text-3xl font-bold text-dark">Featured Products</h2>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        {products.slice(0, 3).map((product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))}
                    </div>

                    <div className="flex justify-center mt-10">
                        <button
                            onClick={() => navigate("/products")}
                            className="flex items-center gap-3 px-8 py-3 bg-white border-2 border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            View All Products <FaAnglesRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Reviews ── */}
            {Reviews.length > 0 && (
                <section className="py-14 bg-gradient-to-br from-cream to-primary px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-10">
                            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-2">Testimonials</p>
                            <h2 className="font-playfair text-3xl font-bold text-dark">What Our Customers Say</h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6">
                            {Reviews.slice(0, 3).map((review, i) => (
                                <ReviewCard key={i} review={review} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}