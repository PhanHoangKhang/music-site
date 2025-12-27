import React, { useState, useEffect } from "react";

const AddSong = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("");
  const [albums, setAlbums] = useState([])
  const [artist, setArtist] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
        const res = await fetch("http://localhost:4000/album");
        const data = await res.json();
        setAlbums(data);
    };

    fetchAlbums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !audio) {
      setMessage("Please select image and audio files");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("album", album);
    formData.append("artist", artist);
    formData.append("image", image);
    formData.append("audio", audio);

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:4000/song/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Song added successfully 🎶");
        setName("");
        setDesc("");
        setAlbum("");
        setArtist("");
        setImage(null);
        setAudio(null);
      } else {
        setMessage(data.message || "Add song failed");
      }
    } catch (error) {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#121212] text-white px-4 mt-15">
      <div className="w-full max-w-4xl bg-[#181818] rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          🎵 Add New Song
        </h2>

        {message && (
          <p className="mb-4 text-center text-sm text-green-400">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Grid info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Song Name */}
            <div>
              <label className="block text-sm mb-1">Song name</label>
              <input
                placeholder="Song name"
                className="w-full rounded-md bg-[#242424] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Artist */}
            <div>
              <label className="block text-sm mb-1">Artist</label>
              <input
                placeholder="Artist"
                className="w-full rounded-md bg-[#242424] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              placeholder="Description"
              rows="3"
              className="w-full rounded-md bg-[#242424] px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>

          {/* Album */}
          <div>
            <label className="block text-sm mb-1">Album</label>
            <select
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                required
                className="w-full rounded-md bg-[#242424] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                <option value="">Select album</option>
                {albums.map((a) => (
                <option key={a._id} value={a._id}>
                    {a.name}
                </option>
                ))}
            </select>
            </div>


          {/* File uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Cover image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
                className="w-full text-sm text-gray-300
                  file:mr-3 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:bg-green-600 file:text-black
                  hover:file:bg-green-700"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Audio file</label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setAudio(e.target.files[0])}
                required
                className="w-full text-sm text-gray-300
                  file:mr-3 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:bg-green-600 file:text-black
                  hover:file:bg-green-700"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 transition-colors text-black font-semibold 
            py-2 rounded-md disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Add Song"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSong;
