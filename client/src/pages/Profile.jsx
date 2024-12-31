import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function Profile() {
  const [originalData, setOriginalData] = useState({
    username: '',
    email: ''
  });
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await authService.getProfile();
      const { username, email } = response;
      setOriginalData({ username, email });
      setUserData(prev => ({
        ...prev,
        username,
        email
      }));
    } catch (err) {
      setError('Failed to load profile data');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (userData.newPassword) {
        if (userData.newPassword !== userData.confirmNewPassword) {
          setError('Password baru tidak cocok');
          setIsLoading(false);
          return;
        }
        if (userData.newPassword.length < 6) {
          setError('Password minimal 6 karakter');
          setIsLoading(false);
          return;
        }
      }

      await authService.updateProfile(userData);
      setSuccess('Profile berhasil diupdate');
      setOriginalData({
        username: userData.username,
        email: userData.email
      });
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setUserData(prev => ({
      ...prev,
      username: originalData.username,
      email: originalData.email,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }));
    setError('');
    setSuccess('');
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Form JSX tetap sama */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {/* Form fields tetap sama */}
            <div className="flex space-x-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={startEditing}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className={`bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;