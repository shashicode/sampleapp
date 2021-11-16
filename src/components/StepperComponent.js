import React, {useState, useEffect, useRef} from 'react';
import '../App.css';

export default function StepperComponent(props) {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [questionsPerPage] = useState(2);
  const [answerObj, setAnswerObj] = useState([]);
  const [validationField1, setValidationField1] = useState(false);
  const [validationField2, setValidationField2] = useState(false)
  const [enableBtn, setEnableBtn] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const formRef = useRef();

  // show next set of questions or show answer if end of the step
  const showNextSetOfQuestions = () => {
    if (validationField1 && validationField2) {
      if (currentQuestion < props.steps.length/questionsPerPage) {
        setCurrentQuestion(currentQuestion+1);
        setUIFlags();
      } else {
        setEnableBtn(false);
        setShowAnswer(true);
      }
    }
  }

  // Setting all the required flags
  const setUIFlags = () => {
    setEnableBtn(false);
    setValidationField1(false);
    setValidationField2(false);
    formRef.current.reset();
  }

  // Saving the answers in array of Objects, 
  // again can also be done in validator method if keeping name value pair
  const saveAnswer = (questionStr, userAnswer) => {
    setAnswerObj(prevState => {
      return [...prevState, {q: questionStr, a:userAnswer}]
    });
  }

  // Validator method
  // Typically in production with more feilds than say just two
  // will rather keep every item as name and value pair
  // in the end will check if has value or is empty as Validator.
  const handleChange = (e, fieldNumber) => {
    console.log(e.target.value, fieldNumber);
    if (fieldNumber === 0) {
      e.target.value !== '' ? setValidationField1(true) :  setValidationField1(false);
    }
    if (fieldNumber === 1) {
      e.target.value !== '' ? setValidationField2(true) : setValidationField2(false);
    }
  }

  // Hook used for enabling and disbling CTA based on state change
  useEffect(() => {
    (validationField1 && validationField2) ? 
      setEnableBtn(true) : setEnableBtn(false);
  }, [validationField1, validationField2]);

  // Getting next 2 set of items to show from steps array
  const indexOfLastQuestionSet = currentQuestion * questionsPerPage;
  const indexOfFirstQuestionSet = indexOfLastQuestionSet - questionsPerPage;
  const currentQuestions = props.steps.slice(
      indexOfFirstQuestionSet, indexOfLastQuestionSet);
  
  return (
    <div>
      {/* Question input form, 
        in production onSubmit should be used for large forms instead of onChange */}
      <form ref={formRef}>
        { currentQuestions.map((item, i) => (
          <p key={i}>
            <input type="text"
            onBlur={(e) => saveAnswer(item, e.target.value)} 
            onChange = {(e) => handleChange(e, i)}
            placeholder={item}/>
          </p>
        ))}
      </form>

      {/* Next set of question CTA */}
      <p className={'nextButton' + (!enableBtn ? ' disable' : '')}
        onClick={() => showNextSetOfQuestions()}>Next Set of Questions</p>

      {/* show answer on last step */}
      {showAnswer &&
        <div>
          <section>
            Answers: 
          </section>
          {answerObj.map((keys, index) => (
              <section key={index}>
                <p>Question: {keys.q}</p>
                <p>Your Answer: {keys.a}</p>
              </section>
          ))}
        </div>
      }
    </div>
  )
}
