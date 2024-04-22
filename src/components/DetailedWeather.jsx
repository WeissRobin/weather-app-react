import Humidity from '../assets/humidity.svg';
import Wind from '../assets/wind.svg';
import UVindex from '../assets/uv-index.svg';

import '../styles/detailed_weather.scss';

export const DetailedWeather = ({ index, wind, humidity }) => {
    return (
        <div className='weather-detailed-info dm-sans'>
            <div className='detailed-item'>
                <img className='icon' src={Humidity} alt="humidity-icon" />
                <span className='value'>{humidity}%</span>
            </div>
            <div className='detailed-item'>
                <img className='icon' src={Wind} alt="wind-icon" />
                <span className='value'>{wind} km/h</span>
            </div>
            <div className='detailed-item'>
                <img className='icon' src={UVindex} alt="uvindex-icon" />
                <span className='value'>{index}</span>
            </div>
        </div>
    )
}