import './styles/main.scss'

import { Clock } from './components/Clock'
import { WeatherMain } from './components/WeatherMain'
import { Search } from './components/Search'

function App() {
  return (
    <>
      <main className='weather-app-wrapper'>
        <div className='weather-app-grid'>
          <div className='search-section'>
            <Search/>
          </div>
          <div className='time-section'>
            <Clock />
          </div>
          <div className='main-content-section'>
            <WeatherMain />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
