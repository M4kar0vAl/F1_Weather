import { ReactNode, useState } from 'react'
import Select from './components/Select'
import WeatherInfo from './components/WeatherInfo'
import './styles/App.css'
import axios from 'axios'
import WeatherInfoList from './components/WeatherInfoList'

const db = {
    Moscow: {
        lat: 55.755833, 
        lon: 37.617222
    },
    'Saint Petersburg': {
        lat: 59.9375, 
        lon: 30.308611
    },
    Novosibirsk: {
        lat: 55.05,
        lon: 82.95
    },
    Yekaterinburg: {
        lat: 56.835556,
        lon: 60.612778
    },
    Kazan: {
        lat: 55.796389,
        lon: 49.108889
    },
    'Nizhny Novgorod': {
        lat: 56.326944,
        lon: 44.0075
    },
    Chelyabinsk: {
        lat: 55.154722,
        lon: 61.375833
    },
    Samara: {
        lat: 53.202778,
        lon: 50.140833
    },
    Omsk: {
        lat: 54.983333,
        lon: 73.366667
    },
    'Rostov-on-Don': {
        lat: 47.2225,
        lon: 39.71
    },
    Ufa: {
        lat: 54.726111,
        lon: 55.9475
    },
    Krasnoyarsk: {
        lat: 56.008889,
        lon: 92.871944
    },
    Voronezh: {
        lat: 51.671667,
        lon: 39.210556
    },
    Perm: {
        lat: 58,
        lon: 56.316667
    },
    Volgograd: {
        lat: 48.708611,
        lon: 44.514722
    },
}

interface coordsType {
    lat?: number
    lon?: number
}

interface WeatherObj {
    main: string
    description: string
}

interface Response {
    weather: Array<WeatherObj>
    main: {
        temp: number
    }
}

interface ForecastObj {
    main: {
        temp: number
    }
    weather: Array<WeatherObj>
    dt_txt: string
    dt: number
}

interface ForecastResponse {
    list: Array<ForecastObj>
}

function App() {
    const [coords, setCoords] = useState<coordsType>({})
    const [selectedCity, setSelectedCity] = useState('')
    const [selectedType, setSelectedType] = useState('')

    const [weatherInfo, setWeatherInfo] = useState<ReactNode>()
    const [weatherInfoList, setWeatherInfoList] = useState<ReactNode[]>([])
    
    async function fetchCurrentWeather(lat?: number, lon?: number) {
        if (!lat || !lon) return
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
        const data: Response = await axios.get(API_URL).then(resp => resp.data)

        const date = new Date()
        const options = {
            day: "numeric",
            month: "short"
        } as const

        setWeatherInfo(
            <WeatherInfo
                weather={data.weather[0].main}
                weatherDesc={data.weather[0].description}
                temperature={data.main.temp}
                date={new Intl.DateTimeFormat("en-US", options).format(date)}
            />
        )
    }

    async function fetchForecastWeather(lat?: number, lon?: number) {
        if (!lat || !lon) return

        const API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`

        const data: ForecastResponse = await axios.get(API_URL).then(resp => resp.data)
        const result: Array<ReactNode> = []
        
        const list: Array<ForecastObj> = data.list
        list.map((el: ForecastObj) => {
            result.push(
                <WeatherInfo
                    key={el.dt}
                    weather={el.weather[0].main}
                    weatherDesc={el.weather[0].description}
                    temperature={el.main.temp}
                    date={el.dt_txt}
                />
            )
        })

        setWeatherInfoList(result)
    }

    function handleSelectCity(value: string) {
        setSelectedCity(value)
        setCoords(db[value as keyof Object] as coordsType)
        setWeatherInfo(<div></div>)
        setWeatherInfoList([])
    }

    return (
        <div className='App'>
            <div className='weather'>
                <div>
                    <Select
                        defaultValue='Choose city'
                        options={Object.keys(db)}
                        value={selectedCity}
                        onChange={handleSelectCity}    
                    />
                    <Select
                        defaultValue='Choose type'
                        options={['Current', '5-day forecast']}
                        value={selectedType}
                        onChange={(type: string) => {
                            setSelectedType(type)
                            setWeatherInfo(<div></div>)
                            setWeatherInfoList([])
                        }}    
                    />
                </div>
                <button
                    className='btn'
                    onClick={
                        selectedType == 'Current'
                        ?
                        () => fetchCurrentWeather(coords.lat, coords.lon)
                        :
                        () => fetchForecastWeather(coords.lat, coords.lon)
                    }
                >
                    Get weather
                </button>
                {
                    Object.keys(coords).length === 0
                    ?
                    <p className='no-weather'>Choose city to get weather</p>  
                    :
                    selectedType === ''
                    ?
                    <p className='no-weather'>Choose type</p>
                    :
                    selectedType == 'Current'
                    ?
                    weatherInfo
                    :
                    <WeatherInfoList weatherInfoList={weatherInfoList}/>
                }
            </div>
        </div>
    )
}

export default App
