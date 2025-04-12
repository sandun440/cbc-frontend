import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";
import ProductCard from "../../component/Productcard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaAnglesRight } from "react-icons/fa6";
import ReviewCard from "../../component/reviewcard";

export default function HomePageBody() {
    const [products, setProducts] = useState([]);
    const [Reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const images = [
        {
            url : "https://i.pinimg.com/1200x/65/6e/f2/656ef2cb9e82a5c102e723bf997a4cb2.jpg"
        },
        {
            url : "https://i.pinimg.com/1200x/55/9d/62/559d62ebef1bf7d2eda990704eae17ba.jpg"
        },
        {
            url : "https://i.pinimg.com/1200x/32/62/39/3262391ce4a1311f7f429ab244ba43ca.jpg"
        },
        {
            url : "https://i.pinimg.com/1200x/f7/a6/69/f7a6699c16b50cb4d3b2c78cf0d47a56.jpg"
        },
        {
            url : "https://i.pinimg.com/1200x/fb/4c/ec/fb4cecc19ccc549a7b8e3e415c9c2376.jpg"
        },
    ];
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
            setProducts(res.data);
        }).catch(
            (err) => toast.error("Error loading products")
        );

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews").then((res) => {
            setReviews(res.data);
            // console.log(res.data);
        }).catch(
            (err) => toast.error("Error loading reviews")
        );

        const interval = setInterval(
            () => {
                nextImage();
            }, 8000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    const nextImage = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    function viewMore(){
        navigate("/products");
    }
    function viewMoreReviews(){
        navigate("/reviews");
    }
    
    return(
        <>
        <div className="flex flex-row justify-center mt-5 relative group">
            <div className="w-[98%] h-[750px]  rounded-2xl overflow-hidden  duration-500">
                <img src={images[activeIndex].url} 
                className="w-full h-full bg-cover"/>
            </div>
            <div className="hidden group-hover:block absolute top-[50%] left-5 transform -translate-y-1/2 text-2xl rounded-lg bg-black/20 text-white cursor-pointer p-2">
                <FaChevronLeft onClick={prevImage} size={30}/>
            </div>

            <div className="hidden group-hover:block absolute top-[50%] right-5 transform -translate-y-1/2 text-2xl rounded-lg bg-black/20 text-white cursor-pointer p-2">
                <FaChevronRight onClick={nextImage} size={30}/>
            </div>

            <div className="absolute bottom-4 flex flex-row justify-center gap-2 mt-2">
                {
                    images.map((image, index) => (

                        <div key={index} className="text-2xl cursor-pointer text-white">
                            <RxDotFilled key={index} onClick={() => setActiveIndex(index)}
                            className={index === activeIndex ? "text-accent" : "text-accent-light"}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="w-full h-[200px] flex flex-col items-center justify-center mt-2">
            <h1 className="text-5xl font-bold text-accent">Crystal Beauty Clear</h1>
            <h2 className="text-3xl text-gray-500 font-semibold mt-2">Best Cosmetic</h2>
        </div>
        {/* some product and view more button */}
        <div className="w-full h-auto flex flex-col items-center justify-center ">
            <h1 className="text-3xl font-bold text-gray-800 text-center mt-10">Our Products</h1>
            <div className="w-full h-auto flex flex-wrap justify-center items-center mt-5">
                {products.slice(0,3).map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
            <div className="flex flex-row text-white  w-[250px] h-auto justify-center items-center bg-accent rounded-lg mb-10">
                <button className="bg-accent p-2 text-3xl" onClick={viewMore}> View More</button>
                <FaAnglesRight size={28}/>
            </div>
        </div>
        </>
    )
}