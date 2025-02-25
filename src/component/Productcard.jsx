export default function Productcard(props){
    console.log(props)
    return(
        <div>
            <h1>{props.name}</h1>
            <h2>price : {props.price}</h2>
            <button>Add to cart</button>
        </div>
    )
}