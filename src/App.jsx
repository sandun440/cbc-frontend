import { useState } from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Productcard from './component/Productcard'
import UserData from './component/UserData'
import Testing from './component/Testing'
import HomePage from './pages/Homepage'
import LoginPage from './pages/Loginpage'
import SignupPage from './pages/SignupPage'
import AdminHomePage from './pages/AdminHomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>

        <Routes path="/*">

          <Route path="/" element={<HomePage/>} />

          <Route path="/login" element = {<LoginPage/>} />
          <Route path="/signup" element ={<SignupPage/>}/>

          <Route path = "/admin/*" element = {<AdminHomePage/>}/>

          <Route path="/*" element={<HomePage/>} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
