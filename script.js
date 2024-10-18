let cityInput = document.getElementById('city_input'),
searchBtn = document.getElementById('search_btn'),
locationBtn = document.getElementById('location-btn'),
api_key = '31c41a794baf8828e5cd5f53232d48e4';
currentWeatherCard = document.querySelectorAll('.weather-left .card')[0],
fiveDaysForecastCard = document.querySelector('.day-forecast'),
aqiCard = document.querySelectorAll('.highlights .card')[0],
sunriseCard = document.querySelectorAll('.highlights .card')[1],

humidityVal = document.getElementById('humidityval'),
pressureVal = document.getElementById('pressureval'),
visibilityVal = document.getElementById('visibilityval'),
windspeedVal = document.getElementById('windspeedval'),
feelsVal = document.getElementById('feelsval'),
aqiList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'],
hourlyForecastCard = document.querySelector('.hourly-forecast');

function getWeatherDetails(name, lat, lon, country, state){
    let FORCAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
        WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
        AIRPOLLUTION_API_URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    fetch(AIRPOLLUTION_API_URL).then(res => res.json()).then(data => {
        let {pm2_5, pm10, co, o3, so2, no, no2, nh3} = data.list[0].components;
        aqiCard.innerHTML = `
                <div class="card-head">
                    <p>Air Quality Index</p>
                    <p class="air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].main.aqi - 1]}</p>
                </div>
                <div class="air-indices">
                    <i class="fa-solid fa-wind fa-3x"></i>
                    <div class="item">
                        <p>PM2.5</p>
                        <h3>${pm2_5}</h3>
                    </div>
                    <div class="item">
                        <p>PM10</p>
                        <h3>${pm10}</h3>
                    </div>
                    <div class="item">
                        <p>CO</p>
                        <h3>${co}</h3>
                    </div>
                    <div class="item">
                        <p>O3</p>
                        <h3>${o3}</h3>
                    </div>
                    <div class="item">
                        <p>SO2</p>
                        <h3>${so2}</h3>
                    </div>
                    <div class="item">
                        <p>NO</p>
                        <h3>${no}</h3>
                    </div>
                    <div class="item">
                        <p>NH3</p>
                        <h3>${nh3}</h3>
                    </div>
                    <div class="item">
                        <p>O3</p>
                        <h3>${o3}</h3>
                    </div>
                </div>
        `;
        
    }).catch((error) => {
        console.error('Error fetching air pollution data:', error);
        alert('failed to fetch air pollution data');
    })
    fetch(WEATHER_API_URL).then(res =>  res.json()).then(data => {
        let date = new Date();
        currentWeatherCard.innerHTML = `
            <div class="current-weather">
                <div class="details">
                    <p>Now</p>
                    <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                    <p>${data.weather[0].description}</p>
                </div>
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                </div>
            </div>
            <hr>
            <div class="card-footer">
                <p><i class="fa-solid fa-calendar"></i> ${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}</p>
                <p><i class="fa-solid fa-location-dot"></i> ${name}, ${country}</p>
            </div>
        `;
        let {sunrise, sunset} = data.sys,
        {timezone, visibility} = data,
        {humidity, pressure, feels_like} = data.main,
        {speed} = data.wind,

        sRiseTime = moment.utc(sunrise, 'X').add(timezone, 's').format('hh:mm A');
        sSetTime = moment.utc(sunset, 'X').add(timezone, 's').format('hh:mm A');
        sunriseCard.innerHTML = `
            <div class="card-head">
                <p>Sunrise & Sunset</p>
            </div>
            <div class="sunrise-sunset">
                <div class="item">
                    <div class="icon">
                        <i class="fa-solid fa-sun fa-4x"></i>
                    </div>
                    <div>
                        <p>Sunrise</p>
                        <h2>${sRiseTime}</h2>
                    </div>
                </div>
                <div class="item">
                    <div class="icon">
                        <i class="fa-solid fa-cloud-moon fa-4x"></i>
                    </div>
                    <div>
                        <p>Sunset</p>
                        <h2>${sSetTime}</h2>
                    </div>
                </div>
            </div>
        `;
        humidityVal.innerHTML = `${humidity}%`;
        pressureVal.innerHTML = `${pressure}hPa`;
        visibilityVal.innerHTML = `${visibility / 1000}km`
        windspeedVal.innerHTML = `${speed}m/s`;
        feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;
    }).catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('failed to fetch current weather ')
    });
    fetch(FORCAST_API_URL).then(res => res.json()).then(data => {
        let hourlyForecast = data.list;
        hourlyForecastCard.innerHTML = '';
        for (i = 0; i < 7; i++){
            let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
            let hr = hrForecastDate.getHours();
            // let a = hr >= 12 ? 'PM' : 'AM';
            let a ='PM'
            if(hr < 12)a = 'AM';
            if(hr > 12)hr = hr - 12;
            if(hr == 0)hr = 12;
            hourlyForecastCard.innerHTML += `
                <div class="card">
                    <p>${hr}${a}</p>
                    <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png" alt="">
                    <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
                </div>
            `;
        }
        let uniqueForecastDays = [];
        let fiveDaysForecast = data.list.filter(forecast => {
            let forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)){             
                return uniqueForecastDays.push(forecastDate);;
            }
        });
        fiveDaysForecastCard.innerHTML = '';
        for(i = 0; i < fiveDaysForecast.length; i++){
            let date = new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastCard.innerHTML += `
                <div class="forecast-item">
                    <div class="icon-wrapper">
                        <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png" alt=""/>
                        <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                    </div>
                    <p>${date.getDate()} ${months[date.getMonth()]}</p>
                    <p>${days[date.getDay()]}</p>
                </div>
            `;
        }
        
        
    }).catch(() => {alert('failed to fetch weather forcast data')});
}

function getCityCoordinates() {
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if(!cityName) {
        alert('Please enter a city name');
        return;
    }
    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL).then(response => response.json()).then(data => {
       let {name, lat, lon, country, state} = data[0];
       getWeatherDetails(name, lat, lon, country, state);
    }).catch(() =>
        alert(`failed to fetch data for ${cityName}`)
    )
}
searchBtn.addEventListener('click', getCityCoordinates);
locationBtn.addEventListener('click', () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            let {latitude, longitude} = position.coords;
            let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;
            fetch(GEOCODING_API_URL).then(response => response.json()).then(data => {
                let {name, country, state} = data[0];
                getWeatherDetails(name, latitude, longitude, country, state);
            }).catch(() => alert('failed to fetch location data'));
        });
    }else{
        alert('Geolocation is not supported by this browser');
    }
});
cityInput.addEventListener('keyup', e => {
    if(e.key === 'Enter') getCityCoordinates();
});