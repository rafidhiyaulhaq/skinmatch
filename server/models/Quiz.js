import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizService } from '../services/api';

function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const questions = [
    {
      id: 'oiliness',
      question: 'Bagaimana kondisi minyak di wajah Anda setelah 4-5 jam mencuci muka?',
      options: [
        { value: 'very_oily', label: 'Sangat berminyak di seluruh wajah' },
        { value: 'oily_tzone', label: 'Berminyak di area T-zone (dahi, hidung, dagu)' },
        { value: 'slightly_oily', label: 'Sedikit berminyak' },
        { value: 'not_oily', label: 'Tidak berminyak sama sekali' }
      ]
    },
    {
      id: 'dryness',
      question: 'Apakah kulit wajah Anda terasa kering atau tertarik setelah mencuci muka?',
      options: [
        { value: 'very_dry', label: 'Sangat kering dan tertarik' },
        { value: 'somewhat_dry', label: 'Agak kering di beberapa area' },
        { value: 'rarely_dry', label: 'Jarang terasa kering' },
        { value: 'never_dry', label: 'Tidak pernah terasa kering' }
      ]
    },
    {
      id: 'sensitivity',
      question: 'Seberapa sering kulit Anda bereaksi (kemerahan, gatal) terhadap produk skincare?',
      options: [
        { value: 'very_sensitive', label: 'Sangat sering bereaksi' },
        { value: 'sometimes_sensitive', label: 'Kadang-kadang bereaksi' },
        { value: 'rarely_sensitive', label: 'Jarang bereaksi' },
        { value: 'not_sensitive', label: 'Tidak pernah bereaksi' }
      ]
    },
    {
      id: 'pores',
      question: 'Bagaimana kondisi pori-pori di wajah Anda?',
      options: [
        { value: 'large_visible', label: 'Besar dan mudah terlihat' },
        { value: 'medium_visible', label: 'Terlihat di beberapa area' },
        { value: 'small_visible', label: 'Kecil dan tidak terlalu terlihat' },
        { value: 'not_visible', label: 'Hampir tidak terlihat' }
      ]
    },
    {
      id: 'acne',
      question: 'Seberapa sering Anda mengalami jerawat?',
      options: [
        { value: 'frequent', label: 'Sangat sering (hampir selalu ada)' },
        { value: 'occasional', label: 'Kadang-kadang (terutama saat stres atau hormonal)' },
        { value: 'rare', label: 'Jarang sekali' },
        { value: 'never', label: 'Hampir tidak pernah' }
      ]
    }
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await quizService.submitQuiz({ answers });
      navigate('/results', { state: response });
    } catch (error) {
      console.error('Quiz submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const canProceed = currentStep < questions.length - 1 && answers[questions[currentStep].id];
  const canSubmit = currentStep === questions.length - 1 && answers[questions[currentStep].id];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-gray-600">
              Pertanyaan {currentStep + 1} dari {questions.length}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{questions[currentStep].question}</h2>
            <div className="space-y-3">
              {questions[currentStep].options.map((option) => (
                <label
                  key={option.value}
                  className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                    answers[questions[currentStep].id] === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name={questions[currentStep].id}
                      value={option.value}
                      checked={answers[questions[currentStep].id] === option.value}
                      onChange={() => handleAnswer(questions[currentStep].id, option.value)}
                      className="mr-3"
                    />
                    <span>{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(step => step - 1)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Sebelumnya
              </button>
            )}
            {canProceed && (
              <button
                onClick={() => setCurrentStep(step => step + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
              >
                Selanjutnya
              </button>
            )}
            {canSubmit && (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-auto ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Processing...' : 'Lihat Hasil'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;