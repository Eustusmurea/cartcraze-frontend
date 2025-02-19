import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Profile</h1>
            <p className="mt-4">Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => { logout(); navigate("/login"); }} className="bg-red-500 text-white p-2 mt-4 rounded">Logout          
            </button>
        </div>
    );
};

export default Profile;