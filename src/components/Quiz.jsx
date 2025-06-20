import { useState, useCallback } from 'react';

import QUESTIONS from '../questions.js';
import QuestionTimer from './QuestionTimer.jsx';
import quizCompleteImg from '../assets/quiz-complete.png';

export default function Quiz() {
   // const [] = useState();
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
      return <div id="summary">
         <img src={quizCompleteImg} alt="Trophy Icon" />
         <h2>Quiz Completed!</h2>
      </div>
   };

   const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
   shuffledAnswers.sort(() => Math.random() - 0.5); // Shuffle the answers

   return (
      <div id="quiz">
         <div id="question">
            <QuestionTimer
               key={activeQuestionIndex}
               timeout={10000}
               onTimeout={handleSkipAnswer} // Handle timeout by selecting no answer
            />
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <ul id="answers">
               {shuffledAnswers.map((answer) => (
                  <li key={answer} className="answer">
                     <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
}