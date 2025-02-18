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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        api.get("/user/profile/")
            .then((res) => setProfile(res.data))
            .catch(() => setError("Failed to load profile"))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProfile((prev) => (prev ? { ...prev, [e.target.name]: e.target.value } : null));
    };

    const handleUpdate = async () => {
        try {
            await api.put("/account/userprofile/", profile);
            alert("Profile updated successfully!");
        } catch {
            alert("Failed to update profile.");
        }
    };

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

                <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded mt-4">Update Profile</button>
            </div>
        </div>
    );
};

export default Profile;
