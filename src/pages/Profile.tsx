import { useState, useEffect } from "react";
import { api } from "../api";

interface UserProfile {
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    gender: "M" | "F" | "O" | "N";
}

const Profile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [originalProfile, setOriginalProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [updateError, setUpdateError] = useState<string>("");

    useEffect(() => {
        api.get("/account/profile/")
            .then((res) => {
                setProfile(res.data);
                setOriginalProfile(res.data); // Store original data for comparison
            })
            .catch(() => setError("Failed to load profile"))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProfile((prev) => (prev ? { ...prev, [e.target.name]: e.target.value } : null));
    };

    const handleUpdate = async () => {
        if (!profile) return;
        try {
            setUpdateError(""); // Clear previous errors
            await api.patch("/account/profile/", profile);
            setOriginalProfile(profile); // Reset comparison state
            alert("Profile updated successfully!");
        } catch {
            setUpdateError("Failed to update profile.");
        }
    };

    const isModified = JSON.stringify(profile) !== JSON.stringify(originalProfile);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            <div className="mt-4">
                <label className="block">First Name:</label>
                <input type="text" name="first_name" value={profile?.first_name || ""} onChange={handleChange} className="border p-2 w-full" />
                
                <label className="block mt-2">Last Name:</label>
                <input type="text" name="last_name" value={profile?.last_name || ""} onChange={handleChange} className="border p-2 w-full" />
                
                <label className="block mt-2">Email:</label>
                <input type="email" name="email" value={profile?.email || ""} disabled className="border p-2 w-full bg-gray-200" />

                <label className="block mt-2">Phone Number:</label>
                <input type="text" name="phone_number" value={profile?.phone_number || ""} onChange={handleChange} className="border p-2 w-full" />

                <label className="block mt-2">Gender:</label>
                <select name="gender" value={profile?.gender || "O"} onChange={handleChange} className="border p-2 w-full">
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                    <option value="N">Prefer not to say</option>
                </select>

                {updateError && <p className="text-red-500 mt-2">{updateError}</p>}

                <button 
                    onClick={handleUpdate} 
                    disabled={!isModified}
                    className={`p-2 rounded mt-4 ${isModified ? "bg-blue-500 text-white" : "bg-gray-400 cursor-not-allowed"}`}
                >
                    Update Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
