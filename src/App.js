import React, {useState} from 'react';
import DateBuilder from './DateBuilder';

const api = {
  key : 'bab3031dd3ab462fa1ca1dc7107b9eb3',
  baseurl : 'https:api.openweathermap.org/data/2.5/' 
}


const App = () => {
  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});

  const search = e => {
    if(e.key === 'Enter'){
      fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('')
        console.log(result)
        }
      )
    }
  }

  return (
    <div className={(typeof weather.main != "undefined") ? (weather.main.temp > 16) ? "app warm" : "app" : "app"}>
      <main>
        <div className='search-box'>
          <input
            type="text"
            placeholder="Enter City or State"
            className="search-app"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{DateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°C</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>) : ('')
        }
      </main>  
    </div>
  );
}

export default App;
