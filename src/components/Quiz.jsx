import { useState, useCallback } from 'react';

import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import quizCompleteImg from '../assets/quiz-complete.png';

export default function Quiz() {
   const [answerState, setAnswerState] = useState('');
   const [userAnswers, setUserAnswers] = useState([]);

   // This state will hold the user's next question index
   const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
   const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

   const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
      setAnswerState('answered');
      setUserAnswers((prevUserAnswers) => {
         // Create a new array with the user's answers
         return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
         if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
            setAnswerState('correct');
         } else {
            setAnswerState('wrong');
         }

         setTimeout(() => {
            setAnswerState(''); // Reset the answer state after showing the result
         }, 2000);
      }, 1000);
   }, [activeQuestionIndex]);

   const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

   if (quizIsComplete) {
      return <div id="summary">
         <img src={quizCompleteImg} alt="Trophy Icon" />
         <h2>Quiz Completed!</h2>
      </div>
   };



   return (
      <div id="quiz">
         <Question
            key={activeQuestionIndex}
            questionText={QUESTIONS[activeQuestionIndex].text}
            answers={QUESTIONS[activeQuestionIndex].answers}
            answerState={answerState}
            selectedAnswer={userAnswers[userAnswers.length - 1]}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}
         />
      </div>
   );
}