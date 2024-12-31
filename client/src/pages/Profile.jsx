import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

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

   loadUserData();
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

 return (
   <div className="min-h-screen bg-gray-50 py-8">
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
     </div>
   </div>
 );
}

export default Profile;