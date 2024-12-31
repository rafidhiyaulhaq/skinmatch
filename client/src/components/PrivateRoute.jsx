import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redirect ke login jika tidak ada token
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;