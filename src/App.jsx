import "./styles/main.scss";

import { Clock } from "./components/Clock";
import { WeatherMain } from "./components/WeatherMain";
import { Search } from "./components/Search";
import { Forecast } from "./components/Forecast";
import { DetailedWeather } from "./components/DetailedWeather";

import { useState, useEffect } from "react";

function App() {
  //Current weather
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [condition, setCondition] = useState("");
  const [temp, setTemp] = useState(0);
  const [index, setIndex] = useState(0);
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
    city: null,
  });

  //Forecast
  const [forecastDays, setForecastDays] = useState([]);

  const handleData = (data) => {
    const { forecast, current, location } = data;
    const { condition, temp_c, humidity, wind_kph, uv } = current;
    const { name, country } = location;
    const { forecastday } = forecast;
    setName(name);
    setCountry(country);
    setCondition(condition.text);
    setTemp(temp_c);
    setIndex(uv);
    setHumidity(humidity);
    setWind(wind_kph);
    setForecastDays(forecastday);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Získání města na základě zeměpisných souřadnic
        const city = await getCityFromCoordinates(latitude, longitude);

        setLocationData({
          latitude: latitude,
          longitude: longitude,
          city: city,
        });
      });
    } else {
      console.log("Geolokace není podporována ve vašem prohlížeči.");
    }
  }, []);

  // Funkce pro získání města z zeměpisných souřadnic
  const getCityFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();
      return data.city;
    } catch (error) {
      console.error("Chyba při získávání města:", error);
      return null;
    }
  };

  return (
    <>
      <main className="weather-app-wrapper">
        <div className="weather-app-grid">
          <div className="search-section">
            <Search sendData={handleData} location={locationData.city}/>
          </div>
          <div className="time-section">
            <Clock />
          </div>
          <div className="main-content-section">
            <WeatherMain
              name={name}
              country={country}
              condition={condition}
              temp={temp}
            />
          </div>
          <div className="weather-detailed">
            <DetailedWeather humidity={humidity} wind={wind} index={index} />
          </div>
          <div className="forecast-section">
            {forecastDays.map((fDay, index) => {
              const { day, date } = fDay;
              const { maxtemp_c, condition } = day;
              const { text, icon } = condition;
              const IconName = icon.split("/").slice(-1)[0];
              const IconCode = IconName.split(".")[0];
              return (
                <Forecast
                  day={date}
                  temp={maxtemp_c}
                  code={IconCode}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
