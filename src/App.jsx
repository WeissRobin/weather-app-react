import './styles/main.scss'

import { Clock } from './components/Clock'
import { WeatherMain } from './components/WeatherMain'

function App() {
  return (
    <>
      <main className='weather-app-wrapper'>
        <div className='weather-app-grid'>
            <Clock />
            <WeatherMain />  
        </div>
      </main>
    </>
  )
}

export default App
