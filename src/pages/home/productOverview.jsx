import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ProductNotFound from "./productNotFound";
import ImageSlider from "../../component/imageSlider";
import { addToCart } from "../../utils/cartFunction";
import toast from "react-hot-toast";

export default function ProductOverview() {
    const params = useParams();
    const productId = params.id;
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/"+productId)
            .then((res)=>{
                console.log(res.data);

                //if null
                if(res.data == null){
                    setStatus("not-found");
                }
                //if product found
                if(res.data != null){
                    setProduct(res.data);
                    setStatus("found");
                }
            })
        }
        ,[])

        function onAddtoCartClick(){
            addToCart(product.productId, 1)
            toast.success(product.productId+" Added to cart")
        }

    return(
        <div className="w-full h-[calc(100vh-100px)]">
            {
                status == "loading" && (
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-2 border-b-4 border-gray-300 border-b-accent">
                        </div>
                    </div>
                )
            }
            {
                status == "not-found" && (
                    <ProductNotFound/>
                )
            }
            {
                status == "found" && (
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[35%] h-full ">
                            <ImageSlider images={product.images}/>
                        </div>
                        <div className="w-[65%] h-full p-4">
                            <h1 className="text-3xl font-bold text-gray-800">{product.productName}</h1>
                            <h1 className="text-3xl font-bold text-gray-500">{product.altNames.join(" | ")}</h1>
                            <p className="text-xl text-gray-600">{
                            (product.price > product.lastPrice)&&
                            <span className="line-through text-red-500">LKR.{product.price}</span>
                            }<span>{"LKR."+product.lastPrice}</span>
                            </p>
                            <p className="text-lg text-gray-600 line-clamp-3">{product.description}</p>
                            <button className="bg-accent text-white p-2 rounded-lg" onClick={onAddtoCartClick}>Add to Cart</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}