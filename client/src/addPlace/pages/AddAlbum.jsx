import React, { useState } from "react";

const AddAlbum = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name || !desc || !bgColor || !image) {
      setMessage("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("bgColor", bgColor);
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await fetch("http://localhost:4000/album/create", {
        method: "POST",
        body: formData, 
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage("Album created successfully 🎶");
      setName("");
      setDesc("");
      setBgColor("");
      setImage(null);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#121212] text-white px-4 mt-15">
      <div className="w-full max-w-4xl bg-[#181818] rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Album
        </h2>

        {message && (
          <p className="mb-4 text-center text-sm text-green-400">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Album name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md bg-[#242424] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            placeholder="Description"
            rows="3"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full rounded-md bg-[#242424] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            placeholder="Background color (e.g. #1db954)"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full rounded-md bg-[#242424] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm text-gray-300
                  file:mr-3 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:bg-green-600 file:text-black
                  hover:file:bg-green-700"
          />

          <button
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-md"
          >
            {loading ? "Adding..." : "Add Album"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAlbum;
