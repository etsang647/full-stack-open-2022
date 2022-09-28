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

const StatisticLine = ({ text, textAfter, value }) => {
  return (
    <p>{text} {value} {textAfter}</p>
  )
}

const Statistics = ({ values }) => {
  const [good, neutral, bad] = values
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={(good - bad) / total} />
      <StatisticLine text="positive" value={good / total * 100} textAfter={'%'} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleClick = (val, setVal) => {
    setVal(val + 1)
  }

  return (
    <div>
      <Header name={'give feedback'} />
      <Button handleClick={() => handleClick(good, setGood)} text={'good'} />
      <Button handleClick={() => handleClick(neutral, setNeutral)} text={'neutral'} />
      <Button handleClick={() => handleClick(bad, setBad)} text={'bad'} />
      <Header name={'statistics'} />
      <Statistics values={[good, neutral, bad]} />
    </div>
  )
}

export default App