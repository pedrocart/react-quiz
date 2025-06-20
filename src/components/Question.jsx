import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';
import { useState } from 'react';
import QUESTIONS from '../questions.js';


export default function Question({ index, onSelectAnswer, onSkipAnswer }) {

   const [answer, setAnswer] = useState({
      selectedAnswer: '',
      isCorrect: null
   });

   let timer = 10000; // 10 seconds in milliseconds

   if (answer.selectedAnswer) {
      timer = 1000; // 1 second to show the selected answer before checking correctness
   }

   if (answer.isCorrect !== null) {
      timer = 2000; // 2 seconds to show the result
   }

   function handleSelectAnswer(answer) {
      setAnswer({
         selectedAnswer: answer,
         isCorrect: null
      });

      setTimeout(() => {
         setAnswer({
            selectedAnswer: answer,
            isCorrect: QUESTIONS[index].answers[0] === answer
         });

         setTimeout(() => {
            onSelectAnswer(answer); // Notify the parent component of the selected answer
         }, 2000);
      }, 1000);
   }

   let answerState = '';

   if (answer.selectedAnswer && answer.isCorrect !== null) {
      answerState = answer.isCorrect ? 'correct' : 'wrong';
   } else if (answer.selectedAnswer) {
      answerState = 'answered';
   }

   return (
      <div id="question">
         <QuestionTimer
            key={timer}
            timeout={timer}
            onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null} // Handle timeout by selecting no answer
            mode={answerState}
         />
         <h2>{QUESTIONS[index].text}</h2>
         <Answers
            answers={QUESTIONS[index].answers}
            selectedAnswer={answer.selectedAnswer}
            answerState={answerState}
            onSelect={handleSelectAnswer}
         />
      </div>
   );
}