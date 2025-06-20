import { useState, useCallback } from 'react';

import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';


export default function Quiz() {
   const [userAnswers, setUserAnswers] = useState([]);

   // This state will hold the user's next question index
   const activeQuestionIndex = userAnswers.length;
   const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

   const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
      setUserAnswers((prevUserAnswers) => {
         // Create a new array with the user's answers
         return [...prevUserAnswers, selectedAnswer];
      });
   }, []);

   const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

   if (quizIsComplete) {
      return (
         <Summary userAnswers={userAnswers} />
      );
   };

   return (
      <div id="quiz">
         <Question
            key={activeQuestionIndex}
            index={activeQuestionIndex}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}
         />
      </div>
   );
}