import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to SkinMatch
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Discover your skin type and get personalized product recommendations
        </p>
        <div className="flex justify-center">
          <Link to="/quiz" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Take the Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;