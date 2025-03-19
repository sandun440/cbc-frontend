import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  function handlePasswordOnChange(event) {
    const newPassword = event.target.value;
    setPassword(newPassword);
    // Check if passwords match whenever password changes
    setPasswordsMatch(newPassword === confirmPassword);
  }

  function handleConfirmPasswordOnChange(event) {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    // Check if passwords match whenever confirm password changes
    setPasswordsMatch(password === newConfirmPassword);
  }

  function signUp(){
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/signup", {
      email: email,
      firstName : fname,
      lastName : lname,
      password: password
    }).then((res) => {
      toast.success("User created successfully.");
      if(res.data.message == "User created"){
        navigate("/");
      }
    }).catch((error) => {
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-medium text-center text-gray-800 mb-6">
          Sign Up
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="fname"
              placeholder="Enter your First name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              placeholder="Enter your Last name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={password}
              onChange={handlePasswordOnChange}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={confirmPassword}
              onChange={handleConfirmPasswordOnChange}
            />
            {!passwordsMatch && confirmPassword !== "" && (
              <p className="text-red-500 text-xs mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-accent-light focus:ring-offset-2"
            disabled={!passwordsMatch && confirmPassword !== ""}
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-accent hover:text-accent-light"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
