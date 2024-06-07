import { useState ,useCallback, useRef } from "react";
import QUESTIONS from "../questions";
import quzeComplete from '../assets/quiz-complete.png'
import Question from "./Question";
// import QuestionTimer from "./Timer";
// import Answers  from "./Answers";
export default function Quiz() {
  // const [activQuestionIndex,setActivQuestionIndex]=useState(0)

  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState,setAnswerState] = useState('')
  const activQuestionIndex =answerState=== '' ? userAnswers.length:userAnswers.length-1;

  const quizeIsComplete=activQuestionIndex===QUESTIONS.length;
  const handleSelectedAnswer=useCallback( function handleSelectedAnswer(selectedAnswer) {
    setAnswerState('answered')
    setUserAnswers((pre) => {
      return [...pre, selectedAnswer];
    });
    setTimeout(()=>{
        if(selectedAnswer===QUESTIONS[activQuestionIndex].answers[0]){
            setAnswerState('correct')
        }else{ setAnswerState('wrong')}
       
        setTimeout(() => {
            setAnswerState('')
        }, 2000);
    },1000)
  },[activQuestionIndex])
  const handleSkipAnswer=useCallback(()=>handleSelectedAnswer(null),[handleSelectedAnswer])
  if(quizeIsComplete){
    return <div id='summary'>
        <img src={quzeComplete} alt="quzeComplete" />
       <h2>Quize Completed</h2>
    </div>
  }

  
  return (
    <div id="quiz">

    <Question 
    key={activQuestionIndex}
    onSkipAnswer={handleSkipAnswer}
    selectedAnswer={userAnswers[userAnswers.length-1]}
    answerState={answerState}
    questionText={QUESTIONS[activQuestionIndex].text} 
    answers={QUESTIONS[activQuestionIndex].answers} 
    onSelectAnswer={handleSelectedAnswer} />
    </div>
  );
}
