import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import { getAuth, signOut } from "firebase/auth";

export default function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();
  const auth = getAuth();

  // Profile fields
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("looking"); // "looking" or "renting"
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Renting post fields
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postRent, setPostRent] = useState("");
  const [postLocation, setPostLocation] = useState("");

  useEffect(() => {
    if (photoFile) {
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(photoFile);
    } else {
      setPhotoPreview(null);
    }
  }, [photoFile]);

  // Save profile locally or send to backend
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const profileData = {
      uid: user?.uid,
      displayName,
      phone,
      role,
      // photoPreview is a base64 preview; upload to storage in real app
      photoPreview,
    };
    console.log("Save profile:", profileData);
    alert("Profile saved!");
  };

  // Create a renting post
  const handleCreatePost = (e) => {
    e.preventDefault();
    const post = {
      authorUid: user?.uid,
      title: postTitle,
      description: postDesc,
      rent: postRent,
      location: postLocation,
      createdAt: new Date().toISOString(),
    };
    console.log("New renting post:", post);
    alert("Post created !!");
    // clear form
    setPostTitle("");
    setPostDesc("");
    setPostRent("");
    setPostLocation("");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-neutral-900 text-white">
        <div className="text-center">
          <p className="mb-4">You must be signed in to view your profile.</p>
          <button onClick={() => navigate("/signin")} className="btn btn-primary">
            Sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-neutral-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="bg-neutral-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">My Profile</h2>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center">
                {photoPreview ? (
                  <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm text-neutral-300">No Photo</span>
                )}
              </div>

              <div className="flex-1">
                <label className="block text-sm text-neutral-300 mb-1">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                  className="file-input file-input-ghost w-full text-sm"
                />
                <p className="text-xs text-neutral-400 mt-2">
                  Upload a square photo for best results. Photo is preview only in demo.
                </p>
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text text-neutral-300">Display Name</span>
              </label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="input input-bordered w-full bg-neutral-700 text-white"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-neutral-300">Phone Number</span>
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input input-bordered w-full bg-neutral-700 text-white"
                placeholder="+8801XXXXXXXXX"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-neutral-300">I am</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="select select-bordered w-full bg-neutral-700 text-white"
              >
                <option value="looking">Looking for rent</option>
                <option value="renting">Renting out a house</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* Create Post Card */}
        <div className="bg-neutral-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Post a Renting Listing</h2>

          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text text-neutral-300">Title</span>
              </label>
              <input
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="input input-bordered w-full bg-neutral-700 text-white"
                placeholder="2-bedroom apartment in Dhanmondi"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-neutral-300">Description</span>
              </label>
              <textarea
                value={postDesc}
                onChange={(e) => setPostDesc(e.target.value)}
                className="textarea textarea-bordered w-full bg-neutral-700 text-white"
                placeholder="Short description, amenities, rules..."
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                value={postRent}
                onChange={(e) => setPostRent(e.target.value)}
                className="input input-bordered w-full bg-neutral-700 text-white"
                placeholder="Monthly rent"
                required
              />
              <input
                value={postLocation}
                onChange={(e) => setPostLocation(e.target.value)}
                className="input input-bordered w-full bg-neutral-700 text-white"
                placeholder="Location"
                required
              />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-accent">
                Post Listing
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sign out */}
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <div className="bg-neutral-800 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-300">Signed in as</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <button onClick={handleSignOut} className="btn btn-ghost text-red-400">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
