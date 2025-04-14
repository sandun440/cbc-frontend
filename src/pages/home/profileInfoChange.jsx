import { useState } from "react";

export default function ProfileInfoChange() {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const defaultImage = "/default-Profile.jpg"; // Place this image in your /public folder

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      profilePicture: image,
      firstName : firstName,
      lastName : lastName,
    };

    console.log("Updated user:", newUser);
    // Implement save logic here
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md m-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Profile</h1>

        {/* Image Preview */}
        <div className="mb-4 flex justify-center">
          <img
            src={imagePreview || defaultImage}
            alt="Profile Preview"
            className="w-32 h-32 object-cover rounded-full border"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded mb-4"
            onChange={handleImageChange}
          />
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-accent text-white p-2 rounded hover:bg-accent-dark transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
