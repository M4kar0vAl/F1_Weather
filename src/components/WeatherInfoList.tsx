import { ReactNode } from "react"
import '../styles/WeatherInfoList.css'

interface ListPropsType {
    weatherInfoList: Array<ReactNode>
}

function WeatherInfoList({ weatherInfoList }: ListPropsType) {
    return (
        <div className="forecast-list">
            {weatherInfoList.map((el) => el)}
        </div>
    )
}

export default WeatherInfoList
