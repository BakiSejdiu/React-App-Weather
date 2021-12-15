import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const api_url=`http://api.weatherapi.com/v1/current.json?key=3ab71c339a7d4288a1b01115211911&q=`;

export default function Weather() {

    const [datas, setDatas] = useState(
        {   country :"",
            city : "",
            temp_c: 0.0,
            flag: "",
            precip: 0.0,
            humidity: 0.0
    })
    const [mode, setMode] = useState(false);
    

    function generateWeather(e){    
        e.preventDefault();

        const place = e.target.search.value;

        axios.get(`${api_url}${place}`)
        .then((response) => {
            setDatas({
                country: response.data.location.country,
                temp_c: response.data.current.temp_c,
                flag: response.data.current.condition.icon,
                precip: response.data.current.precip_mm,
                humidity: response.data.current.humidity
            }); 

            setMode(true);

            e.target.reset()
        }   

)
        .catch(error => console.log(error))

    }
    return (
    
        <div className='container'>
            
            <header><h1>Weather App</h1></header>
                
                <form onSubmit={generateWeather}>
                        <input type="search" name="search" placeholder="Search country..."/>
                        <button type='submit'>Search</button>
                </form>
                

            {  mode &&
            <div className='weather'>
                <div className='weather_title'><h4>{datas.country}</h4> 
                <h1><span>{datas.temp_c}</span> °C</h1>
                </div>
                <img src={datas.flag} alt="weather"/>
                <p>Precipitation: <span>{datas.precip}  %</span></p>
                <p>Humidity: <span>{datas.humidity}  %</span></p>
            </div>
            }
        </div>
    )
}
