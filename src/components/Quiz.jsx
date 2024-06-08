import { useState ,useCallback, useRef } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";
// import QuestionTimer from "./Timer";
// import Answers  from "./Answers";
export default function Quiz() {
  // const [activQuestionIndex,setActivQuestionIndex]=useState(0)

  const [userAnswers, setUserAnswers] = useState([]);
  // const [answerState,setAnswerState] = useState('')
  const activQuestionIndex =userAnswers.length;

  const quizeIsComplete=activQuestionIndex===QUESTIONS.length;
  const handleSelectedAnswer=useCallback( function handleSelectedAnswer(selectedAnswer) {
    setUserAnswers((pre) => {
      return [...pre, selectedAnswer];
    });
  },[])
  const handleSkipAnswer=useCallback(()=>handleSelectedAnswer(null),[handleSelectedAnswer])
  if(quizeIsComplete){
    return <Summary userAnswers={userAnswers} />
  }

  
  return (
    <div id="quiz">

    <Question 
    key={activQuestionIndex}
    index={activQuestionIndex}
    onSkipAnswer={handleSkipAnswer}
    // selectedAnswer={userAnswers[userAnswers.length-1]}
    // answerState={answerState}
    // questionText={QUESTIONS[activQuestionIndex].text} 
    answers={QUESTIONS[activQuestionIndex].answers} 
    onSelectAnswer={handleSelectedAnswer} />
    </div>
  );
}
