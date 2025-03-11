import axios from "axios"
import { use, useState, useEffect } from "react"

export default function AdminProductsPage() {  

    const [products, setProduct] = useState(
        [
            {
                "_id": "67cb499a88e85f012e49fa8c",
                "productId": "B1001",
                "productName": "Hydrating Face Serum",
                "atlNames": [
                    "Moisturizing Serum",
                    "Glow Booster"
                ],
                "images": [
                    "https://example.com/images/serum1.jpg",
                    "https://example.com/images/serum2.jpg"
                ],
                "price": 24.99,
                "lastPrice": 29.99,
                "stock": 100,
                "description": "A lightweight, hydrating face serum infused with vitamin C and hyaluronic acid for a radiant glow.",
                "__v": 0
            },
            {
                "_id": "67cc8613d21e69b0426f478d",
                "productId": "B56789",
                "productName": "Hydrating Face Serum",
                "atlNames": [
                    "Glow Boost Serum",
                    "Vitamin C Serum"
                ],
                "images": [
                    "https://example.com/images/serum1.jpg",
                    "https://example.com/images/serum2.jpg"
                ],
                "price": 29.99,
                "lastPrice": 39.99,
                "stock": 120,
                "description": "A lightweight and fast-absorbing face serum infused with Vitamin C and hyaluronic acid for radiant and hydrated skin.",
                "__v": 0
            }
        ]
    ) 
    useEffect(()=>{
        axios.get("http://localhost:3000/api/products").then(
            (res)=>{
                console.log(res.data)
                setProduct(res.data)
            }
        )
    },[]
)
        



    return(
        <div>
            <h1>Admin Products Page</h1>
            {
                products.map((product, index)=>{
                    return(
                        <div key={product._id}>
                            {index}
                            {product.productName}
                        </div>
                    )
                })
            }
        </div>
    )
}