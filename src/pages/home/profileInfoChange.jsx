import { useState } from "react";

export default function ProfileInfoChange() {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const newUser = {
    profilePicture: image,
    firstName: firstName,
    lastName: lastName,
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
        <form>
          <input
            type="file"
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
          <button className="w-full bg-accent text-white p-2 rounded">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}