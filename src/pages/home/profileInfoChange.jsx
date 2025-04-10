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
      <div className="w-[500px] h-[600px] mt-5 mb-5 rounded-2xl bg-primary">
        <h1 className="text-3xl font-bold text-gray-800 m-10">Edit Profile Info</h1>
        <form className="w-full h-full">
          <div className="m-4 flex flex-col items-center">
            <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="w-[100px] h-[100px] border border-gray-300 rounded-full overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <label
              htmlFor="image"
              className="mt-2 text-accent cursor-pointer hover:underline"
            >
              Choose Image
            </label>
          </div>
          <div className="m-4">
            <label htmlFor="fname" className="block text-gray-700 font-semibold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="fname"
              name="name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-accent"
            />
          </div>
          <div className="m-4">
            <label htmlFor="lname" className="block text-gray-700 font-semibold mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              name="name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-accent"
            />
          </div>
          {/* Submit button */}
          <div className="flex justify-center items-center mt-10">
            <button
              className="w-[300px] bg-accent text-white py-2 px-4 rounded-md hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-accent-light focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}