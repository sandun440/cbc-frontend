import { useEffect, useState } from "react";
import { deleteItem, loadCart } from "../../utils/cartFunction";
import CartCard from "../../component/cartCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [labeledTotal, setLabeledTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(
        ()=>{
            setCart(loadCart());
            axios.post(import.meta.env.VITE_BACKEND_URL+"/api/orders/quote", {
                orderedItems : loadCart()
            }).then(
                (res)=>{
                    console.log(res.data);
                    if(res.data.total != null){
                        setTotal(res.data.total);
                        setLabeledTotal(res.data.labeledTotal);
                    }
            })
        }
    ,[]);

    function onOrderCheckoutClick(){
        navigate("/shipping", {
            state : {
                items :loadCart()
            }
        })
    }

    return (
        <div className="w-full h-full overflow-y-scroll flex flex-col items-end">
            <table className="w-full ">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                {
                    cart.map(
                        (item)=>{
                            return(
                                <CartCard key={item.productId} productId={item.productId} qty={item.qty}/>
                            )
                        }
                    )
                }
            </table>
            <div className=" w-[400px] flex flex-col items-center ">
                <h1 className="text-3xl font-bold text-accent">Total: LKR. {labeledTotal.toFixed(2)}</h1>
                <h1 className="text-3xl font-bold text-accent">Discount: LKR. {total.toFixed(2)}</h1>
                <h1 className="text-3xl font-bold text-accent">Grand Total: LKR. {(labeledTotal-total).toFixed(2)}</h1>
                <button onClick={onOrderCheckoutClick} className="bg-accent hover:bg-accent-light hover:text-black text-white p-2 rounded-lg w-[300px]">Checkout</button>
            </div>
        </div>
    )
}