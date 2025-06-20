import { useState, useCallback, useRef } from 'react';

import QUESTIONS from '../questions.js';
import QuestionTimer from './QuestionTimer.jsx';
import quizCompleteImg from '../assets/quiz-complete.png';

export default function Quiz() {
   const shuffledAnswers = useRef();
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

   if (!shuffledAnswers.current) {
      // Initialize the shuffled answers only once
      shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
      shuffledAnswers.current.sort(() => Math.random() - 0.5); // Shuffle the answers
   }


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
               {shuffledAnswers.current.map((answer) => {
                  const isSelected = userAnswers[userAnswers.length - 1] === answer;
                  let cssClasses = '';

                  if (answerState === 'answered' && isSelected) {
                     cssClasses = 'selected';
                  }

                  if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                     cssClasses = answerState;
                  }

                  return (
                     <li key={answer} className="answer">
                        <button
                           onClick={() => handleSelectAnswer(answer)}
                           className={cssClasses}>
                           {answer}
                        </button>
                     </li>
                  );
               })}
            </ul>
         </div>
      </div>
   );
}