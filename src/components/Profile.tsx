import { useState, useEffect } from 'react';
import { api } from '../api';

interface User {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/auth/profile/');
        setUser(response.data);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      {user && (
        <div className="mt-4 p-4 border rounded shadow">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Full Name:</strong> {user.first_name} {user.last_name}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
