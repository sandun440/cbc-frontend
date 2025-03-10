export default function UserData(props){
    return(
        <>
            <img src = "https://media.istockphoto.com/id/2172317014/photo/happy-hispanic-man-working-on-laptop-at-home.webp?s=2048x2048&w=is&k=20&c=jJPw6z79N7HyqjrQcXravLUlk7JT-uOCoehbXc43Rco="/>
            <span>{props.name}</span>
            <span>{props.status}</span>
        </>
    )
}