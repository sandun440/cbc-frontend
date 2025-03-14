import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

export default function ProductOverview() {
    const params = useParams();
    const productId = params.id;

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/"+productId)
            .then((res)=>{
                console.log(res.data);
            })
        }
        ,[])

    return(
        <div className="w-full h-[calc(100vh-100px)] bg-red-500">
            <h1>ProductOverview</h1>
        </div>
    )
}