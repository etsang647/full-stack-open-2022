import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ newFilter, handleFilterInput }) => {
  return (
    <div>
      filter shown with <input value={newFilter} onChange={handleFilterInput} />
    </div>
  )
}

const PersonForm = (props) => {
  const { addName, newName, handleNameInput, newNumber, handleNumberInput } = props
  return (
    <div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const PersonEntry = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  )
}

const PersonList = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <PersonEntry key={person.name} person={person} />
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])
  
  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  
  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterInput = (event) => {
    setNewFilter(event.target.value)
  }
  
  const personsToShow = persons.filter(
    person => person.name.toLowerCase().includes(newFilter)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterInput={handleFilterInput} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName} handleNameInput={handleNameInput}
        newNumber={newNumber} handleNumberInput={handleNumberInput}
      />
      <h2>Numbers</h2>
      <PersonList persons={personsToShow} />
    </div>
  )
}

export default App