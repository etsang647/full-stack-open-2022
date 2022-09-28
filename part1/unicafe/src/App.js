import { useState } from 'react'

const Header = ({ name }) => {
  return (
    <h1>
      {name}
    </h1>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({ text, text2, value }) => {
  return (
    <p>{text} {value} {text2}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  
  const handleClick = (val, setVal) => {
    setVal(val + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <Header name={'give feedback'} />
      <Button handleClick={() => handleClick(good, setGood)} text={'good'} />
      <Button handleClick={() => handleClick(neutral, setNeutral)} text={'neutral'} />
      <Button handleClick={() => handleClick(bad, setBad)} text={'bad'} />
      <Header name={'statistics'} />
      <Statistic text={'good'} value={good} />
      <Statistic text={'neutral'} value={neutral} />
      <Statistic text={'bad'} value={bad} />
      <Statistic text={'all'} value={total} />
      <Statistic text={'average'} value={(good - bad) / total} />
      <Statistic text={'positive'} value={good / total * 100} text2={'%'} />
    </div>
  )
}

export default App