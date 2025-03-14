import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AdminHomePage from './pages/AdminHomePage'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

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
