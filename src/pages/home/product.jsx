import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import Productcard from "../../component/Productcard";

export default function ProductPage() {
    const [products, setProducts] = useState([])
    const [loadingStatus, setLoadingStatus] = useState('loading')


    useEffect(
        ()=>{
            if(loadingStatus === 'loading'){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                    (res)=>{
                    console.log(res.data);
                    setProducts(res.data);
                    setLoadingStatus('loaded')
                }).catch(
                    (err)=>{
                        toast.error("Error loading products")
                        console.log(err);
                    }
                )
            }
            
        }
    ,[])
    return (
        <div className="w-full h-full overflow-y-scroll flex flex-wrap justify-center">
            {
                products.map(
                    (product)=>
                        <Productcard product={product}/>
                )
            }
        </div>
    )
}