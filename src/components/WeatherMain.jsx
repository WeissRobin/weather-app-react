import '../styles/weather_main.scss'
import { PhPlanet } from "./PhPlanet"

export const WeatherMain = () => {
    return (
        <div className='weather-main-info'>
            <span><PhPlanet /></span>
            <span className='type dm-sans'>Clear Sky</span>
            <span className='location dm-sans'>Havlíčkův Brod, Česko</span>
            <div className='degrees dm-sans'>16°</div>
        </div>
    )
}