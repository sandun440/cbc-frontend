import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../utils/mediaUpload";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
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

  function handleProfilePicChange(e) {
    const file = e.target.files[0];
    setProfilePictureFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  }

  async function signUp() {
    let profilePictureUrl = "";
    if (profilePictureFile) {
      try {
        profilePictureUrl = await uploadMediaToSupabase(profilePictureFile);
      } catch (error) {
        console.log("Profile picture upload failed:", error);
        toast.error("Failed to upload profile picture.");
        return;
      }
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/signup", {
        profilePicture: profilePictureUrl,
        email: email,
        firstName: fname,
        lastName: lname,
        password: password,
      })
      .then((res) => {
        toast.success("User created successfully.");
        if (res.data.message === "User created") {
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

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-xl bg-primary/40 text-dark placeholder-gray-400 text-sm transition-all duration-200";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-primary via-cream to-[#f5e8d8]">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent-dark/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md animate-fade-in-up">
        <div className="bg-white rounded-3xl shadow-2xl shadow-accent/10 overflow-hidden">
          {/* Top accent strip */}
          <div className="h-1.5 w-full bg-accent-gradient" />

          <div className="p-8 sm:p-10">
            {/* Brand */}
            <div className="flex flex-col items-center mb-8">
              <img src="/logo.png" className="w-16 h-16 rounded-full object-cover ring-4 ring-accent/20 mb-3" />
              <h1 className="font-playfair text-3xl font-bold text-dark">Create Account</h1>
              <p className="text-secondary text-sm mt-1">Join the Crystal Beauty family</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Profile Picture */}
              <div className="flex flex-col items-center gap-3 mb-2">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-accent/20 bg-primary flex items-center justify-center">
                    {profilePreview ? (
                      <img src={profilePreview} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl text-accent/40">👤</span>
                    )}
                  </div>
                  <label
                    htmlFor="photo"
                    className="absolute bottom-0 right-0 w-7 h-7 bg-accent rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-accent-dark transition-colors"
                  >
                    <span className="text-white text-xs font-bold">+</span>
                  </label>
                </div>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
                <span className="text-xs text-secondary">Upload Profile Photo</span>
              </div>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1.5">First Name</label>
                  <input
                    type="text"
                    id="fname"
                    placeholder="John"
                    className={inputClass}
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1.5">Last Name</label>
                  <input
                    type="text"
                    id="lname"
                    placeholder="Doe"
                    className={inputClass}
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary mb-1.5">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary mb-1.5">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a strong password"
                  className={inputClass}
                  value={password}
                  onChange={handlePasswordOnChange}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  className={`${inputClass} ${
                    !passwordsMatch && confirmPassword !== ""
                      ? "border-red-400 bg-red-50/50"
                      : ""
                  }`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordOnChange}
                />
                {!passwordsMatch && confirmPassword !== "" && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    ⚠ Passwords do not match
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!passwordsMatch && confirmPassword !== ""}
                className="w-full py-3 text-white font-semibold bg-accent-gradient rounded-xl hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-2"
              >
                Create Account
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-secondary">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-accent hover:text-accent-dark transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
