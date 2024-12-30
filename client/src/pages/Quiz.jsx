import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizService } from '../services/api';

function Quiz() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    oiliness: '',
    dryness: '',
    sensitivity: '',
    acne: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await quizService.submitQuiz({ answers });
      navigate('/results', { state: response.data });
    } catch (err) {
      console.error('Quiz submission failed:', err);
    }
  };

  const questions = [
    {
      id: 'oiliness',
      question: 'How oily is your skin?',
      options: [
        { value: 'very_oily', label: 'Very Oily' },
        { value: 'somewhat_oily', label: 'Somewhat Oily' },
        { value: 'normal', label: 'Normal' },
        { value: 'not_oily', label: 'Not Oily' }
      ]
    },
    {
      id: 'dryness',
      question: 'How dry is your skin?',
      options: [
        { value: 'very_dry', label: 'Very Dry' },
        { value: 'somewhat_dry', label: 'Somewhat Dry' },
        { value: 'normal', label: 'Normal' },
        { value: 'not_dry', label: 'Not Dry' }
      ]
    },
    // Add more questions...
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Skin Type Quiz</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className={currentStep === index + 1 ? 'block' : 'hidden'}>
              <h2 className="text-xl font-semibold mb-4">{q.question}</h2>
              <div className="space-y-2">
                {q.options.map(option => (
                  <label key={option.value} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                    <input
                      type="radio"
                      name={q.id}
                      value={option.value}
                      checked={answers[q.id] === option.value}
                      onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
                      className="text-blue-600"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(step => step - 1)}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
              >
                Previous
              </button>
            )}
            {currentStep < questions.length ? (
              <button
                type="button"
                onClick={() => setCurrentStep(step => step + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Get Results
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Quiz;