export default function Productcard(props){
    return(
        <div>
            <h1 className="font-bold text-blue-700">{props.name}</h1>
            <h2>price : {props.price}</h2>
            <button>Add to cart</button>
        </div>
    )
}