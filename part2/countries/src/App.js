import { useState, useEffect } from 'react'
import axios from 'axios'

const SearchResultEntry = ({ country }) => {
  const [countryInfo, setCountryInfo] = useState(<></>)
  const handleClick = () => {
    setCountryInfo(<CountryInfo country={country} />)
  }
  return (
    <div>
      {country.name.common}
      <button onClick={handleClick}>show</button>
      {countryInfo}
    </div>
  )
}

const SearchResults = ({ results }) => {
  return (
    <div>
      {results.map(result => (
        <SearchResultEntry key={result.name.common} country={result} />
      ))}
    </div>
  )
}

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [lat, lng] = country.latlng

  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`
  useEffect(() => {
    axios
      .get(url)
      .then(response => setWeather(response.data))
  }, [url])
  
  let weatherInfo = <></>
  if (weather) {
    weatherInfo = <div>
      <p>temperature {weather.main.temp - 273} celsius</p>
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  }
  
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" />
      <h3>Weather in {country.capital}</h3>
      {weatherInfo}
    </div>
  )
}

const App = () => {
  const [newSearch, setSearch] = useState('')
  const [newResults, setResults] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setResults(response.data))
  }, [])
  
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  
  const resultsToShow = newResults.filter(
    result => result.name.common.toLowerCase().includes(newSearch)
  )
  
  let result = <></>
  
  if (resultsToShow.length === 1) {
    result = <CountryInfo country={resultsToShow[0]} />
  } else if (resultsToShow.length <= 10) {
    result = <SearchResults results={resultsToShow} />
  } else {
    result = <p>Too many matches, specify another filter</p>
  }

  return (
    <div>
      find countries <input value={newSearch} onChange={handleSearch} />
      {result}
    </div>
  )
  
}

export default App