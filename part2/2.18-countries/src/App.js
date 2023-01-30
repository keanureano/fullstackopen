import React, { useState } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const baseUrl = "https://restcountries.com/v3.1";
    axios
      .get(`${baseUrl}/name/${search}`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => errorNotification(error.message));
  };

  const errorNotification = (message) => {
    setCountries(null);
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  return (
    <div id="app">
      <form onSubmit={submitHandler}>
        find countries
        <input value={search} onChange={searchHandler} />
        <button type="submit">submit</button>
      </form>

      <Error errorMessage={errorMessage} />
      <Output
        countries={countries}
        onClick={searchHandler}
        onSubmit={submitHandler}
      />
    </div>
  );
}

function Output({ countries, onClick, onSubmit }) {
  if (countries === null) {
    return null;
  }
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <form key={country.name.official} onSubmit={onSubmit}>
            {country.name.official}
            <button
              type="submit"
              onClick={onClick}
              value={country.name.official}
            >
              show
            </button>
          </form>
        ))}
      </div>
    );
  }
  if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h1>{country.name.official}</h1>
        <div>
          {country.capital.map((capital) => (
            <div key={capital}>capital {capital}</div>
          ))}
        </div>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="flag" />
      </div>
    );
  }
}

function Error({ errorMessage }) {
  if (errorMessage === null) {
    return null;
  }
  return <div className="error">{errorMessage}</div>;
}

export default App;
