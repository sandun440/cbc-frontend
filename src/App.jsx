import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AdminHomePage from './pages/AdminHomePage'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'


function App() {

  return (
    <>
      <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <GoogleOAuthProvider
        clientId='201774715224-55rfpuok2fpbi3g50j3tn8miundopar3.apps.googleusercontent.com'
      >

        <Routes path="/*">

          <Route path="/login" element = {<LoginPage/>} />
          <Route path="/signup" element ={<SignupPage/>}/>
          <Route path = "/admin/*" element = {<AdminHomePage/>}/>
          <Route path="/*" element={<HomePage/>} />
        </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
