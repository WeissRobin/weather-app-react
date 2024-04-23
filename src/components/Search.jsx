import { useState, useEffect } from 'react';
import '../styles/search.scss';
import axios from 'axios';

export const Search = ({ sendData, location }) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

    const handleInput = (input) => {
        setValue(input);
        if (input) {
            axios.get(`https://api.weatherapi.com/v1/search.json?key=b301fae74e5c4e42926164325232512&q=${input}`)
            .then(res => {
                const cities = res.data.map(city => `${city.name}, ${city.region}`);
                setSuggestions(cities);
            })
            .catch(err => setSuggestions([]));
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSelectedSuggestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
        }
        else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setSelectedSuggestionIndex(prevIndex => Math.min(prevIndex + 1, suggestions.length - 1));
        }
        else if (event.key === 'Enter') {
            if (selectedSuggestionIndex !== -1) {
                setValue(suggestions[selectedSuggestionIndex]);
                getWeatherCurr(suggestions[selectedSuggestionIndex]);
                setSuggestions([]);
            }
        }
    }

    const getWeatherCurr = (input) => {
        if (input) {
            axios.get(`https://api.weatherapi.com/v1/forecast.json?key=b301fae74e5c4e42926164325232512&q=${input}&days=7&aqi=no&alerts=no`)
            .then(res => {
                sendData(res.data);
            })
            .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        setSelectedSuggestionIndex(-1);
    }, [suggestions]);

    useEffect(() => {
        getWeatherCurr(location);
    }, [location]);

    return (
        <div className='search-box'>
            <input 
                value={value} 
                onChange={(e) => handleInput(e.target.value)} 
                onKeyDown={handleKeyDown}
                className="search dm-sans"
                placeholder='Search a city...'/>
            <ul className='suggestions'>
                {suggestions.map((sugg, index) => (
                    <li 
                        key={index} 
                        className={`suggestion dm-sans ${index === selectedSuggestionIndex ? 'selected' : ''}`}
                        onClick={() => { setValue(sugg); getWeatherCurr(value); setSuggestions([]); }}>
                        {sugg}
                    </li>
                ))}
            </ul>
        </div>
    )
}
