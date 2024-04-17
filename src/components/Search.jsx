import { useState, useEffect } from 'react';
import '../styles/search.scss';
import axios from 'axios';

export const Search = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

    const handleInput = (input) => {
        setValue(input);
        axios.get(`http://api.weatherapi.com/v1/search.json?key=b301fae74e5c4e42926164325232512&q=${input}`)
            .then(res => {
                const cities = res.data.map(city => `${city.name}, ${city.region}`);
                setSuggestions(cities);
            })
            .catch(err => setSuggestions([]));
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
            }
        }
    }

    useEffect(() => {
        setSelectedSuggestionIndex(-1);
    }, [suggestions]);

    return (
        <div className='search-box'>
            <input 
                value={value} 
                onChange={(e) => handleInput(e.target.value)} 
                onKeyDown={handleKeyDown}
                className="search dm-sans"/>
            <ul className='suggestions'>
                {suggestions.map((sugg, index) => (
                    <li 
                        key={index} 
                        className={`suggestion dm-sans ${index === selectedSuggestionIndex ? 'selected' : ''}`}
                        onClick={() => console.log('Selected suggestion:', sugg)}>
                        {sugg}
                    </li>
                ))}
            </ul>
        </div>
    )
}
