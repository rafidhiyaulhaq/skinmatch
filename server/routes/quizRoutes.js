const express = require('express');
const router = express.Router();
const { submitQuiz, getHistory } = require('../controllers/quizController');
const auth = require('../middleware/auth');

router.post('/submit', auth, submitQuiz);
router.get('/history', auth, getHistory);

module.exports = router;