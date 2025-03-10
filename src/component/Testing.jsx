import { useState } from "react"

export default function Testing(){
    const[count, setCount] = useState(0)
    const[name , setName] = useState("Student")

    
    function increment(){
        setCount(count +1)
    }
    function decrement(){
        setCount(count -1)
    }
    function changeName(value){
        setName(value)
    }

    return(
        <div>
            
        </div>

    )
}