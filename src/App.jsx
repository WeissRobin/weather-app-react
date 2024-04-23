import './styles/main.scss'

import { Clock } from './components/Clock'
import { WeatherMain } from './components/WeatherMain'
import { Search } from './components/Search'
import { Forecast } from './components/Forecast'
import { DetailedWeather } from './components/DetailedWeather'

import { useState } from 'react'

function App() {
  //Current weather
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [condition, setCondition] = useState('');
  const [temp, setTemp] = useState(0);
  const [index, setIndex] = useState(0);
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);

  //Forecast
  const [forecastDays, setForecastDays] = useState([]);

  const handleData = (data) => {
    const {forecast, current, location} = data;
    const {condition, temp_c, humidity, wind_kph, uv} = current;
    const {name, country} = location;
    const {forecastday} = forecast;
    setName(name);
    setCountry(country);
    setCondition(condition.text);
    setTemp(temp_c);
    setIndex(uv);
    setHumidity(humidity);
    setWind(wind_kph);
    setForecastDays(forecastday);
  }

  return (
    <>
      <main className='weather-app-wrapper'>
        <div className='weather-app-grid'>
          <div className='search-section'>
            <Search sendData={handleData}/>
          </div>
          <div className='time-section'>
            <Clock />
          </div>
          <div className='main-content-section'>
            <WeatherMain name={name} country={country} condition={condition} temp={temp}/>
          </div>
          <div className='weather-detailed'>
            <DetailedWeather humidity={humidity} wind={wind} index={index}/>
          </div>
          <div className='forecast-section'>
            {forecastDays.map((fDay, index) => {
              const {day, date} = fDay;
              const {maxtemp_c, condition} = day;
              const {text, icon} = condition;
              const IconName = icon.split('/').slice(-1)[0];
              const IconCode = IconName.split('.')[0];
              return <Forecast day={date} temp={maxtemp_c} code={IconCode} key={index}/>
            })}
          </div> 
        </div>
      </main>
    </>
  )
}

export default App
