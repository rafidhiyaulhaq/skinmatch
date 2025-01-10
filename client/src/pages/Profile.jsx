import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, quizService } from '../services/api';

function Profile() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [originalData, setOriginalData] = useState({
    username: '',
    email: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);
  const [historyError, setHistoryError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await authService.getProfile();
        const { username, email } = response;
        setOriginalData({ username, email });
        setUserData({
          username,
          email,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
      } catch (err) {
        setError('Failed to load profile data');
      }
    };

    const loadQuizHistory = async () => {
      try {
        const history = await quizService.getHistory();
        setQuizHistory(history);
      } catch (err) {
        setHistoryError('Gagal memuat riwayat quiz');
      }
    };

    loadUserData();
    loadQuizHistory();
  }, []);

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
    setUserData({
      ...originalData,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
    setError('');
    setSuccess('');
    setIsEditing(false);
  };

  function translateAnswer(answer) {
    const translations = {
      very_oily: 'Sangat berminyak',
      oily_tzone: 'Berminyak di T-zone',
      slightly_oily: 'Sedikit berminyak',
      not_oily: 'Tidak berminyak',
      very_dry: 'Sangat kering',
      somewhat_dry: 'Agak kering',
      rarely_dry: 'Jarang kering',
      never_dry: 'Tidak pernah kering',
      very_sensitive: 'Sangat sensitif',
      sometimes_sensitive: 'Kadang sensitif',
      rarely_sensitive: 'Jarang sensitif',
      not_sensitive: 'Tidak sensitif',
      large_visible: 'Besar dan terlihat',
      medium_visible: 'Terlihat di beberapa area',
      small_visible: 'Kecil dan tidak terlalu terlihat',
      not_visible: 'Hampir tidak terlihat',
      frequent: 'Sangat sering',
      occasional: 'Kadang-kadang',
      rare: 'Jarang',
      never: 'Hampir tidak pernah'
    };
    
    return translations[answer] || answer;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
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
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                value={userData.username}
                onChange={(e) => setUserData({...userData, username: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                disabled={!isEditing || isLoading}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                disabled={!isEditing || isLoading}
              />
            </div>

            {isEditing && (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password Saat Ini
                  </label>
                  <input
                    type="password"
                    value={userData.currentPassword}
                    onChange={(e) => setUserData({...userData, currentPassword: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password Baru (opsional)
                  </label>
                  <input
                    type="password"
                    value={userData.newPassword}
                    onChange={(e) => setUserData({...userData, newPassword: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    value={userData.confirmNewPassword}
                    onChange={(e) => setUserData({...userData, confirmNewPassword: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    disabled={isLoading}
                  />
                </div>
              </>
            )}

            <div className="flex space-x-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-4">
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
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Quiz History Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Quiz History</h2>
          
          {historyError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {historyError}
            </div>
          )}

          {quizHistory.length === 0 ? (
            <p className="text-gray-600">Belum ada riwayat quiz.</p>
          ) : (
            <div className="space-y-4">
              {quizHistory.map((quiz, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Quiz #{quizHistory.length - index}</h3>
                    <span className="text-sm text-gray-600">
                      {new Date(quiz.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="mb-2">
                    <span className="font-medium">Tipe Kulit:</span>{' '}
                    {quiz.skinType.charAt(0).toUpperCase() + quiz.skinType.slice(1)}
                  </p>
                  <div className="mt-2">
                    <p className="font-medium mb-1">Jawaban Quiz:</p>
                    <ul className="text-sm text-gray-600">
                      <li>Tingkat Minyak: {translateAnswer(quiz.answers.oiliness)}</li>
                      <li>Kekeringan: {translateAnswer(quiz.answers.dryness)}</li>
                      <li>Sensitivitas: {translateAnswer(quiz.answers.sensitivity)}</li>
                      <li>Pori-pori: {translateAnswer(quiz.answers.pores)}</li>
                      <li>Jerawat: {translateAnswer(quiz.answers.acne)}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;