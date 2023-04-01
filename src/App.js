import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = '66bc4bc9d9af5bded5ec8b2ec1eb8bda';
const importantCities = ['Vancouver', 'Toronto', 'Montreal', 'Calgary', 'Ottawa'];

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getWeather(city) {
    try {
      setLoading(true);
      setError(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},CA&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while fetching the weather data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (importantCities.length > 0) {
      importantCities.forEach(city => {
        getWeather(city);
      });
    }
  }, []);

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getWeather(city);
  }

  return (
    <div className="App">
      <div className="search-cities">
        <h2>Search Cities</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a Canadian city"
            value={city}
            onChange={handleCityChange}
          />
          <button type="submit">Get Weather</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weather && (
          <div className="city-card">
            <h3>{weather.name}</h3>
            <div className="weather-info">
              <p>{weather.main.temp} &deg;C</p>
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
        )}
      </div>
      <div className="important-cities">
        <h2>Important Cities</h2>
        {importantCities.map(city => (
          <div key={city} className="city-card">
            <h3>{city}</h3>
            <div className="weather-info">
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              {weather && (
                <>
                  <p>{weather.main.temp} &deg;C</p>
                  <p>{weather.weather[0].description}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default App;
