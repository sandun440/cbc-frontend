import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';



  export default function LoginPage() {

    const googleLogin = useGoogleLogin({
      onSuccess: (res) => {
        console.log(res);
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/google", {
          token: res.access_token
        }).then(
          (res) => {
            if (res.data.message === "User created") {
              toast.success("Your account is created now you can login via google.");
            } else {
              localStorage.setItem("token", res.data.token);
              if (res.data.user.type === "admin") {
                window.location.href = "/admin";
              } else {
                window.location.href = "/";
              }
            }
          }
        );
      }
    });

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  function login() {
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
      email: email,
      password: password
    }).then((res) => {
      if (res.data.user == null) {
        toast.error(res.data.message);
        return;
      }
      toast.success("Login successful");
      localStorage.setItem("token", res.data.token);
      if (res.data.user.type === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }).catch((error) => {
      toast.error("Login failed. Please check your credentials.");
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md p-8 backdrop-blur-3xl bg-white  rounded-xl shadow-md">
        <div className="flex justify-center mb-6">
          <div className="w-[150px] h-[150px] bg-amber-50 rounded-full flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Center Beauty Club" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-accent hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Login
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <button
            type="button"
            onClick={() => googleLogin()}
            className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Login with Google
          </button>
        </div>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Don't have an account?</span>
          <Link to="/signup" className="ml-1 font-medium text-accent hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}