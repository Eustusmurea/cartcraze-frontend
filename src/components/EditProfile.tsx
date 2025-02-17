import { useState, useEffect } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const EditProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/profile/');
        setUser(res.data);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
      } catch (err) {
        setError('Failed to fetch profile');
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/auth/profile/', { first_name: firstName, last_name: lastName });
      navigate('/profile');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Last Name"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
