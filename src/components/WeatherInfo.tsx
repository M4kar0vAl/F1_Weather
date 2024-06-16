import '../styles/WeatherInfo.css'

export interface propsType {
    weather: string
    weatherDesc: string
    temperature: number
    date: string
}

function WeatherInfo({weather, weatherDesc, temperature, date}: propsType) {
    return (
        <div className="weather-info">
            <div>{ date }</div>
            <div className="general">
                <span>{temperature} &#8451;</span>
                <span>{weather}: {weatherDesc}</span>
            </div>
        </div>
    )
}

export default WeatherInfo
