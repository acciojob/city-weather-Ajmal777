import React, { useState } from "react";

const Weather = () => {
    const [input, setInput] = useState('');
    const [weatherData, setWeatherData] = useState('');
    const [error, setError] = useState('');
    function fetchData(){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=97841debd95d08295da0d78ccc28ba17&units=metric`)
            .then(res => res.json())
            .then(res => setWeatherData(res))
            .catch(error => {
                console.log(error);
                setError(error);
            })
    }

    function handleKeyPress(e){
        if(e.key == 'Enter') {
            fetchData();
        }
    }
    return (
        <div>
            <input type="text" className="search" onKeyDown={handleKeyPress} placeholder="Enter a city" value={input} onChange={(e) => setInput(e.target.value)} />
            {error && <p>{error}</p>}
            {
                !error && weatherData &&
                    <div className="weather">
                        <h1 className="city">
                            {weatherData.name}
                        </h1>
                        <h1 className="temp">
                            {weatherData.main.temp}
                        </h1>
                        <p className="status">
                            {weatherData.weather.main}
                        </p>
                        <div className="weather-img">
                            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} className="img"/>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Weather;