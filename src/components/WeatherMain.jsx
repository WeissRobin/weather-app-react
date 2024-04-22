import '../styles/weather_main.scss'
import { PhPlanet } from "./PhPlanet"

export const WeatherMain = ({ name, country, condition, temp }) => {
    return (
        <div className='weather-main-info'>
            <span><PhPlanet /></span>
            <span className='type dm-sans'>{condition}</span>
            <span className='location dm-sans'>{name}, {country}</span>
            <div className='degrees dm-sans'>{temp}°</div>
        </div>
    )
}