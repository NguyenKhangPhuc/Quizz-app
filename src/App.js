
import './App.css';
import { useState } from 'react';
function App() {
  const [start, setStart] = useState(false)
  let [count, setCount] = useState(0)
  const [active, setActive] = useState(false)
  const [restart, setRestart] = useState(false)
  const [clickAnswer, setClickAnswer] = useState(0)
  const [border, setBorder] = useState('')
  const [border2, setBorder2] = useState('')
  const [answer, setAnswer] = useState(false)
  let [time, setTime] = useState(7)
  let [stop, setStop] = useState(false)
  let [checkNum, setCheckNum] = useState(null)
  let number

  const arrQues = [
    {
      id: '1',
      question: 'What is the capital of France?',
      answer: [
        { answer: " A.London", answer_correct: false },
        { answer: " B.Rome", answer_correct: false },
        { answer: " C.Madrid", answer_correct: false },
        { answer: " D.Paris", answer_correct: true }

      ],
      explanation: 'Paris is the capital of London.'
    },

    {
      id: '2',
      question: 'Who wrote the famous play "Romeo and Juliet"?',
      answer: [
        { answer: " A.William Shakespeare", answer_correct: true },
        { answer: " B.Charles Dickens", answer_correct: false },
        { answer: " C.Jane Austen", answer_correct: false },
        { answer: " D.F. Scott Fitzgerald", answer_correct: false }

      ],
      explanation: 'William Shakespeare wrote the famous play "Romeo and Juliet.'
    },

    {
      id: '3',
      question: 'What is the chemical symbol for water?',
      answer: [
        { answer: " A.Wa", answer_correct: false },
        { answer: " B.Wt", answer_correct: false },
        { answer: " C.H2O", answer_correct: true },
        { answer: " D.Ho", answer_correct: false }

      ],
      explanation: 'H20 is the chemical symbol for water.'
    },

    {
      id: '4',
      question: 'Which planet is known as the "Red Planet"?',
      answer: [
        { answer: " A.Earth", answer_correct: false },
        { answer: " B.Mars", answer_correct: true },
        { answer: " C.Venus", answer_correct: false },
        { answer: " D.Jupiter", answer_correct: false }

      ],
      explanation: 'Mars is known as the "Red Planet.'
    }
  ]
  const timing = () => {
    time = time - 1
    setTime(time)
    console.log(time)
  }
  const handleStart = () => {
    setStart(true)
    setRestart(false)
    setCheckNum(null)
     const timeSetting = setInterval(() => {
        timing()
        if (time == 0) {
          setBorder('#3598f0')
          setBorder2('#ed1a1a')
          setActive(true)
          setAnswer(true)
          console.log(count)
          setTimeout(() => {
            count = count + 1
            setCheckNum(null)
            setCount(count)
            setBorder('')
            setBorder2('')
            setActive(false)
            setAnswer(false)
            time = 7
            if (count == arrQues.length) {
              setRestart(true)
              setStart(false)
              count = 0
              setCount(count)
              clearInterval(timeSetting)
              time = 7
              setTime(time)
            }
          
          }, 3000)
        }
      }, 1000)
  }
  const handleAnswer = (index, correct) => {
    if (answer) return
    setCheckNum(index)
    setAnswer(true)
    if (correct == true) {
      setClickAnswer(clickAnswer + 1)
    }
  }
  const handleRestart = () => {
    setRestart(false)
    setStart(true)
    setCheckNum(null)
    const countingTime = setInterval(() => {
      answer == false && timing()
      if (time == 0) {
        setBorder('#3598f0')
        setBorder2('#ed1a1a')
        setActive(true)
        setAnswer(true)
        console.log(count)
        setTimeout(() => {
          count = count + 1
          setCheckNum(null)
          setCount(count)
          setBorder('')
          setBorder2('')
          setActive(false)
          setAnswer(false)
          time = 7
          if (count == arrQues.length) {
            setRestart(true)
            setStart(false)
            count = 0
            setCount(count)
            clearInterval(countingTime)
            time = 7
            setTime(time)
          }

        }, 3000)
      }
    }, 1000)
  }
  console.log(checkNum)
  return (
    <div className="layout" >
      <div className='header'>
        <div className='title'>Quizz Games</div>
        {start == false ?
          <button className='start_button' onClick={() => handleStart()}>
            <span className='start_text'> Start Game
            </span>
          </button> :
          <div className='questions'>
            {time >= 0 && <div className='time'>You have {time} seconds left</div>}
            <div className='number_of_ques' >This is the question number {count + 1}/{arrQues.length}</div>
            {arrQues[count]?.question}
            {active == true && <div className='explain_text'>Result : {arrQues[count]?.explanation} </div>}
          </div>
        }
      </div>
      <div className='center'>
        {restart == true &&
          <div className='final_result'>
            <div className='final_text'>This is your final result</div>
            <div className='correct_answer'>Correct Answer : {clickAnswer}</div>
            <div className='incorrect_answer'> Incorrect Answer: {arrQues.length - clickAnswer}</div>
            <button onClick={() => handleRestart()} className='restart_button'>
              <span>Restart</span>
            </button>
          </div>}
        {start == true &&
          <div className='answer_place'>
            {arrQues[count]?.answer.map((answer, index) => {
              return (
                <div className='answer_place_detail'>{
                  answer.answer_correct == true ?
                    <div style={{ backgroundColor: border }} onClick={() => handleAnswer(index, answer.answer_correct)} className={`answer1`}>{answer.answer}</div>
                    :
                    <div style={{ backgroundColor: border2 }} onClick={() => handleAnswer(index, answer.answer_correct)} className={`answer1`}>{answer.answer}</div>}
                  {checkNum == index ? <div className='notification' style={{fontSize: "15px"}}> Chosen !</div> : <div className=''></div>}
                </div>
              )
            })}
          </div>}
      </div>
    </div>
  );
}

export default App;
