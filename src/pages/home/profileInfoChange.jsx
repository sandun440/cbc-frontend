import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import uploadMediaToSupabase from "../../utils/mediaUpload";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaUser, FaEnvelope, FaShieldAlt, FaSignOutAlt, FaBoxOpen } from "react-icons/fa";

export default function ProfileInfoChange() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPic, setCurrentPic] = useState("/default-profile.jpg");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // Load current user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const u = res.data;
        setFirstName(u.firstName || "");
        setLastName(u.lastName || "");
        setEmail(u.email || "");
        setCurrentPic(u.profilePicture || "/default-profile.jpg");
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load profile.");
        setIsLoading(false);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName.trim()) { toast.error("First name is required."); return; }

    setIsSaving(true);
    const token = localStorage.getItem("token");

    try {
      let profilePicture = currentPic;
      if (image) {
        profilePicture = await uploadMediaToSupabase(image);
      }

      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/users/" + email,
        { firstName, lastName, profilePicture },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile updated successfully!");
      setCurrentPic(profilePicture);
      setImage(null);
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out successfully.");
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-xl bg-primary/40 text-dark placeholder-gray-400 text-sm transition-all duration-200";
  const labelClass =
    "block text-xs font-semibold text-secondary uppercase tracking-wide mb-1.5 flex items-center gap-1.5";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-cream to-[#f5e8d8] py-10 px-4">
      {/* Decorative blobs */}
      <div className="fixed top-20 right-10 w-72 h-72 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-72 h-72 bg-accent-dark/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-1">Account</p>
          <h1 className="font-playfair text-3xl font-bold text-dark">My Profile</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Left: Profile Card ── */}
          <div className="w-full lg:w-[280px] space-y-4">
            {/* Avatar Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-accent/8 p-6 flex flex-col items-center text-center">
              {/* Profile Picture */}
              <div className="relative mb-4">
                <img
                  src={imagePreview || currentPic}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-accent/20 shadow-lg"
                />
                <label
                  htmlFor="profile-pic-input"
                  className="absolute bottom-0 right-0 w-9 h-9 bg-accent rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-accent-dark transition-colors duration-200"
                >
                  <FaCamera size={14} className="text-white" />
                </label>
                <input
                  id="profile-pic-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              <h2 className="font-playfair text-xl font-bold text-dark">
                {firstName} {lastName}
              </h2>
              <p className="text-secondary text-sm mt-1">{email}</p>

              {imagePreview && (
                <p className="text-xs text-accent mt-2 bg-accent/8 px-3 py-1 rounded-full">
                  New photo selected
                </p>
              )}
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-sm border border-accent/8 overflow-hidden">
              {[
                { label: "My Orders", icon: FaBoxOpen, to: "/orders" },
                { label: "Security", icon: FaShieldAlt, to: null },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => item.to && navigate(item.to)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-secondary hover:bg-primary/60 hover:text-accent transition-all duration-200 text-sm font-medium border-b border-gray-50 last:border-b-0"
                >
                  <item.icon size={15} className="text-accent/60" />
                  {item.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-50 transition-all duration-200 text-sm font-medium"
              >
                <FaSignOutAlt size={15} />
                Logout
              </button>
            </div>
          </div>

          {/* ── Right: Edit Form ── */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-accent/8 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <FaUser className="text-accent" size={13} />
                </div>
                <div>
                  <h2 className="font-playfair text-lg font-bold text-dark">Edit Profile</h2>
                  <p className="text-xs text-secondary mt-0.5">Update your personal information</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      First Name
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email (read-only) */}
                <div>
                  <label className={labelClass}>
                    <FaEnvelope size={10} className="text-accent" /> Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className={inputClass + " opacity-60 cursor-not-allowed bg-gray-100 pr-10"}
                      value={email}
                      disabled
                    />
                    <FaShieldAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                  </div>
                  <p className="text-xs text-secondary/60 mt-1">Email cannot be changed</p>
                </div>

                {/* Profile Photo Upload */}
                <div>
                  <label className={labelClass}>
                    <FaCamera size={10} className="text-accent" /> Profile Photo
                  </label>
                  <label
                    htmlFor="profile-pic-input-2"
                    className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-accent/40 hover:bg-accent/4 transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-100 flex-shrink-0">
                      <img
                        src={imagePreview || currentPic}
                        className="w-full h-full object-cover"
                        alt="preview"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dark group-hover:text-accent transition-colors">
                        {imagePreview ? "Photo selected ✓" : "Click to upload a new photo"}
                      </p>
                      <p className="text-xs text-secondary/60 mt-0.5">PNG, JPG up to 5MB</p>
                    </div>
                  </label>
                  <input
                    id="profile-pic-input-2"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-gray-100" />

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => { setImage(null); setImagePreview(null); }}
                    className="flex-1 py-3 border border-gray-200 text-secondary font-semibold rounded-xl hover:bg-gray-50 text-sm transition-colors duration-200"
                  >
                    Reset Changes
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-3 bg-accent-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
