import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  function handlePasswordOnChange(event) {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordsMatch(newPassword === confirmPassword);
  }

  function handleConfirmPasswordOnChange(event) {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
  }

  function signUp() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/signup", {
        profilePicture: profilePicture,
        email: email,
        firstName: fname,
        lastName: lname,
        password: password,
      })
      .then((res) => {
        toast.success("User created successfully.");
        if (res.data.message == "User created") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("User creation failed.");
      });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!passwordsMatch) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 1) {
      toast.error("Please enter a password.");
      return;
    }

    signUp();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">Sign Up</h1>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="fname" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="fname"
              placeholder="Enter your First name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="lname" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              placeholder="Enter your Last name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              value={password}
              onChange={handlePasswordOnChange}
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              value={confirmPassword}
              onChange={handleConfirmPasswordOnChange}
            />
            {!passwordsMatch && confirmPassword !== "" && (
              <p className="text-red-500 text-xs mt-1 italic">Passwords do not match</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-2 px-4 rounded-lg text-sm font-semibold shadow-md hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!passwordsMatch && confirmPassword !== ""}
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-accent font-medium hover:underline transition">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
