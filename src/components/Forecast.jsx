import '../styles/forecast_day.scss';

export const Forecast = ({ temp, code, day }) => {

    const getDayOfWeek = (dateString) => {
        const dateParts = dateString.split('-');
        const month = parseInt(dateParts[1]) - 1;
        const day = parseInt(dateParts[2]);
        const year = parseInt(dateParts[0]);
        const dayIndex = new Date(year, month, day).getDay();
        const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return daysOfWeek[dayIndex];
    };

    return (
        <div className='forecast-day dm-sans'>
            <span className='day'>{getDayOfWeek(day)}</span>
            <img className='icon' src={`/${code}.svg`} alt="Icon" />
            <span className='temp'>{temp}</span>
        </div>
    )
}