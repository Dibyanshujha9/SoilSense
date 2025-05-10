import axios from 'axios';

// Put your API key directly here for now (for production, use proper environment handling)
const API_KEY = '8313b29ef2254d0f8fc31436251005'; // Replace with your actual API key from WeatherAPI.com
const FORECAST_URL = 'https://api.weatherapi.com/v1/forecast.json';

// Interface for forecast day to ensure type safety
export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: {
    avgtemp_c: number;
    maxtemp_c: number;
    mintemp_c: number;
    daily_chance_of_rain: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    avghumidity: number;
    avgvis_km: number;
  };
  hour: any[];
}

// Process API response into our expected format
function processForecastData(forecastdays: ForecastDay[]): any[] {
  return forecastdays.map(day => ({
    date: day.date,
    date_epoch: day.date_epoch,
    avgtemp_c: day.day.avgtemp_c,
    maxtemp_c: day.day.maxtemp_c,
    mintemp_c: day.day.mintemp_c,
    daily_chance_of_rain: day.day.daily_chance_of_rain,
    condition: day.day.condition,
    humidity: day.day.avghumidity,
    pressure_mb: 1013, // Default value since it might not be available directly
    wind_kph: 0, // Default value
  }));
}

export async function getWeather(city: string): Promise<any> {
  try {
    const response = await axios.get(FORECAST_URL, {
      params: {
        key: API_KEY,
        q: city,
        days: 5, // Request 5-day forecast
      },
    });
    
    // Process the data to return just the forecast days in our expected format
    if (response.data && response.data.forecast && response.data.forecast.forecastday) {
      return processForecastData(response.data.forecast.forecastday);
    }
    
    return []; // Return empty array if no forecast data
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Error Response:', error.response.data);
    }
    throw new Error('Failed to fetch weather data.');
  }
}

// Function to search for cities
export async function searchCities(query: string): Promise<any[]> {
  if (!query) return [];
  
  try {
    const response = await axios.get('https://api.weatherapi.com/v1/search.json', {
      params: {
        key: API_KEY,
        q: query
      }
    });
    
    return response.data.map((item: any) => ({ 
      name: item.name, 
      country: item.country 
    }));
  } catch (error) {
    console.error(`Error searching cities for ${query}:`, error);
    return [];
  }
}