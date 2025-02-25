import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Productcard from './component/Productcard'
import Homepage from './pages/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Productcard name ="Gaming Laptop" price = "$999.99"/>
      <Productcard name = "I phone 16" price = "$599.99"/> */}

      <Homepage/>
    </>
  )
}

export default App
