import React, { useState, useRef } from 'react';
import { getWeather, searchCities } from './weatherBot';

// Define an interface for the structured forecast data
interface ForecastDay {
  date: string;
  date_epoch: number;
  avgtemp_c: number;
  maxtemp_c: number;
  mintemp_c: number;
  daily_chance_of_rain: number;
  condition: { text: string; icon: string; code: number };
  humidity: number;
  pressure_mb: number;
  wind_kph: number;
}

const WeatherChatbot: React.FC = () => {
  // State for input fields and displayed information
  const [city, setCity] = useState('');
  const [citySuggestions, setCitySuggestions] = useState<{ name: string; country: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch weather data
  const handleFetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    setForecast(null);

    try {
      const weatherData = await getWeather(city);

      if (weatherData && weatherData.length > 0) {
        setForecast(weatherData);
      } else {
        setError('Location not found or no forecast data available.');
        setForecast(null);
      }
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Failed to fetch weather data. Please try again.');
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch city suggestions - fixed to not use process.env
  const fetchCitySuggestions = async (query: string) => {
    if (!query.trim()) {
      setCitySuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const suggestions = await searchCities(query);
      setCitySuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } catch (err) {
      console.error('Error fetching city suggestions:', err);
      setCitySuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Debounce function for city input
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      fetchCitySuggestions(value);
    }, 300);
  };

  // Inline styles for minimalistic design
  const containerStyle: React.CSSProperties = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
    maxWidth: '500px',
    margin: '40px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const inputGroupStyle: React.CSSProperties = {
    marginBottom: '15px',
    textAlign: 'left',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const suggestionsListStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    maxHeight: '150px',
    overflowY: 'auto',
    backgroundColor: '#fff',
    marginTop: '5px',
  };

  const buttonStyle: React.CSSProperties = {
    width: loading ? 'auto' : '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    outline: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    opacity: loading ? 0.7 : 1,
  };

  const forecastStyle: React.CSSProperties = {
    marginTop: '20px',
    paddingTop: forecast ? '15px' : '0',
    borderTop: forecast ? '1px solid #eee' : 'none',
    textAlign: 'left',
  };

  const errorStyle: React.CSSProperties = {
    color: 'red',
    marginTop: '10px',
  };

  const suggestionItemStyle: React.CSSProperties = {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
    transition: 'background-color 0.2s ease',
  };

  const forecastDayStyle: React.CSSProperties = {
    marginBottom: '20px',
    padding: '12px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  };

  const handleSuggestionClick = (suggestion: { name: string; country: string }) => {
    setCity(suggestion.name);
    setCitySuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div style={containerStyle}>
      <h2>Climate Forecast</h2>
      <div style={inputGroupStyle}>
        <label htmlFor="city" style={labelStyle}>Enter City:</label>
        <input 
          id="city" 
          type="text" 
          value={city} 
          onChange={handleCityInputChange} 
          style={inputStyle} 
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} 
          onFocus={() => citySuggestions.length > 0 && setShowSuggestions(true)} 
          placeholder="Type a city name..."
        />
        {showSuggestions && citySuggestions.length > 0 && (
          <ul style={suggestionsListStyle}>
            {citySuggestions.map((suggestion, index) => (
              <li 
                key={index} 
                style={suggestionItemStyle} 
                onMouseDown={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}, {suggestion.country}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {error && (
        <div style={errorStyle}>
          <p>{error}</p>
        </div>
      )}
      
      {forecast && forecast.length > 0 && (
        <div style={forecastStyle}>
          <h3>5-Day Forecast:</h3>
          {forecast.map((day, index) => (
            <div key={index} style={forecastDayStyle}>
              <h4>{new Date(day.date_epoch * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
              {day.condition && (
                <>
                  <p><strong>Condition:</strong> {day.condition.text}</p>
                  {day.condition.icon && (
                    <img 
                      src={day.condition.icon.startsWith('//') ? `https:${day.condition.icon}` : day.condition.icon} 
                      alt={day.condition.text} 
                      width="50" 
                      height="50"
                    />
                  )}
                </>
              )}
              <p><strong>Temperature:</strong> {day.avgtemp_c}°C (Max: {day.maxtemp_c}°C, Min: {day.mintemp_c}°C)</p>
              <p><strong>Humidity:</strong> {day.humidity}%</p>
              {day.wind_kph !== undefined && <p><strong>Wind:</strong> {day.wind_kph} kph</p>}
              {day.pressure_mb !== undefined && <p><strong>Pressure:</strong> {day.pressure_mb} mb</p>}
              <p><strong>Chance of Rain:</strong> {day.daily_chance_of_rain}%</p>
            </div>
          ))}
        </div>
      )}

      <button 
        style={buttonStyle} 
        onClick={handleFetchWeather} 
        disabled={loading || !city.trim()}
      >
        {loading ? 'Fetching Weather...' : 'Get Weather'}
      </button>
    </div>
  );
};

export default WeatherChatbot;



