import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">SkinMatch</Link>
          <div className="space-x-4">
            <Link to="/quiz" className="text-gray-700 hover:text-gray-900">Quiz</Link>
            <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-gray-900">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;