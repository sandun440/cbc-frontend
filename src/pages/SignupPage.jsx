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
      profilePicture: profilePicture,
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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form>
          <input type="email" className="w-full p-2 border rounded mb-4" placeholder="Email" />
          <input type="password" className="w-full p-2 border rounded mb-4" placeholder="Password" />
          <button className="w-full bg-accent text-white p-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
}
