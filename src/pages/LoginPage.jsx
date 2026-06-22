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
      if (res.data.user.isBlocked) {
        toast.error("Your account is blocked. Please contact support.");
        return;
      }
      toast.success("Login successful");
      localStorage.setItem("token", res.data.token);
      if (res.data.user.type === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }).catch(() => {
      toast.error("Login failed. Please check your credentials.");
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary via-cream to-[#f5e8d8]">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent-dark/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-accent/10 overflow-hidden">
          {/* Top accent strip */}
          <div className="h-1.5 w-full bg-accent-gradient" />

          <div className="p-8 sm:p-10">
            {/* Brand */}
            <div className="flex flex-col items-center mb-8">
              <img src="/logo.png" className="w-16 h-16 rounded-full object-cover ring-4 ring-accent/20 mb-3" />
              <h1 className="font-playfair text-3xl font-bold text-dark">Welcome Back</h1>
              <p className="text-secondary text-sm mt-1">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1.5">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-primary/40 text-dark placeholder-gray-400 text-sm transition-all duration-200"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1.5">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-primary/40 text-dark placeholder-gray-400 text-sm transition-all duration-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-white font-semibold bg-accent-gradient rounded-xl hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-[1px] bg-gray-200" />
              <span className="text-xs text-secondary">or continue with</span>
              <div className="flex-1 h-[1px] bg-gray-200" />
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={() => googleLogin()}
              className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-200 rounded-xl text-sm font-medium text-dark bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-300"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-secondary">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-accent hover:text-accent-dark transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}