const search = document.querySelector('#search');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
    try {
        retrieveWeather(search.value);
        retrieveForecast(search.value);
    } catch (error) {
        console.log(error);
    }
});

const unitsBtn = document.querySelector('#switch-units-btn');

unitsBtn.addEventListener('click', () => {
    if (unitsBtn.textContent == '°C') {
        unitsBtn.textContent = '°F'
    } else {
        unitsBtn.textContent = '°C'
    }
   /*const currentTemp = document.querySelector('.stats-temp-number');
   const currentFeelsLike = document.querySelector('.stats-feels-like-number');
   const forecastTemps = document.querySelectorAll('.forecast-temp');

   if (unitsBtn.textContent === '°F') {
       currentTemp.textContent = CToF(currentTemp.textContent.replace('°C', '')) + '°F';
       currentFeelsLike.textContent = CToF(currentFeelsLike.textContent.replace('°C', '')) + '°F';
       forecastTemps.forEach(temp => {
           temp.textContent = CToF(temp.textContent.replace('°C', '')) + '°F';
       })
       unitsBtn.textContent = '°C';
   } else if (unitsBtn.textContent === '°C') {
        currentTemp.textContent = FToC(currentTemp.textContent.replace('°F', '')) + '°C';
        currentFeelsLike.textContent = FToC(currentFeelsLike.textContent.replace('°F', '')) + '°C';
        forecastTemps.forEach(temp => {
            temp.textContent = FToC(temp.textContent.replace('°F', '')) + '°C';
        })
        unitsBtn.textContent = '°F';*/
   })

async function retrieveWeather(city='Toronto') {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=54c3377a3ca9e9069ecac550e7f3a0a5`);

        const data = await response.json();

        populateCurrent(data.name, data.main.temp, data.main.feels_like, data.wind.speed, data.main.pressure, data.weather[0].description, data.weather[0].main);
    } catch (error) {
        console.log(error);
    }
    
}

async function retrieveForecast(city="Toronto") {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=54c3377a3ca9e9069ecac550e7f3a0a5`);

        const data = await response.json();

        populateForecast(data.list[1].main.temp, data.list[1].weather[0].main, 'soon');
        populateForecast(data.list[3].main.temp, data.list[3].weather[0].main, 'later');
        populateForecast(data.list[7].main.temp, data.list[7].weather[0].main, 'tmrw');
        populateForecast(data.list[15].main.temp, data.list[15].weather[0].main, 'two-days');
        populateForecast(data.list[23].main.temp, data.list[23].weather[0].main, 'three-days');

    } catch(error) {
        console.log(error);
    }
}

function populateCurrent(name, temp, feels, wind, pressure, desc, type) {
    const cityName = document.querySelector('.current-weather-name');
    cityName.textContent = name;

    const tempNumber = document.querySelector('.stats-temp-number');
    const feelsLike = document.querySelector('.stats-feels-like-number');

    if (unitsBtn.textContent == '°C') {
        tempNumber.textContent = getCelsius(temp) + '°C';
        feelsLike.textContent = getCelsius(feels) + '°C';
    } else if (unitsBtn.textContent == '°F') {
        tempNumber.textContent = getFahrenheit(temp) + '°F';
        feelsLike.textContent = getFahrenheit(feels) + '°F';
    }

    const windNumber = document.querySelector('.stats-wind-number');
    windNumber.textContent = getKm(wind) + ' km/h';

    const pressureNumber = document.querySelector('.stats-pressure-number');
    pressureNumber.textContent = pressure + ' hPA';

    const weatherDesc = document.querySelector('.current-weather-desc');
    weatherDesc.textContent = desc;

    const icon = document.querySelector('#icon-image');
    icon.src = determineIcon(type);
}

function populateForecast(temp, type, time) {
    
    const forecastIcon = document.querySelector(`#${time}-forecast > .forecast-icon img`);
    forecastIcon.src = determineIcon(type);

    const forecastTemp = document.querySelector(`#${time}-forecast > .forecast-temp`);
    
    if (unitsBtn.textContent == '°C') {
        forecastTemp.textContent = getCelsius(temp) + '°C';
    } else if (unitsBtn.textContent == '°F') {
        forecastTemp.textContent = getFahrenheit(temp) + '°F';
    }
}

function determineIcon(type) {
    switch(type) {
        case 'Thunderstorm':
            return './icons/thunderstorm.png';
        case 'Drizzle':
            return './icons/drizzle.png';
        case 'Rain':
            return './icons/rain.png';
        case 'Snow':
            return './icons/snow.png';
        case 'Mist':
        case 'Smoke':
        case 'Haze':
        case 'Fog':
            return './icons/haze.png';
        case 'Dust':
        case 'Sand':
        case 'Ash':
            return './icons/dust.png';
        case 'Squall':
            return './icons/wind.png';
        case 'Tornado':
            return './icons/tornado.png';
        case 'Clear':
            return './icons/clear.png';
        case 'Clouds':
            return './icons/cloudy.png';
    }
}

function getCelsius(temp) {
    return Math.floor(temp - 273.15);
}

function getFahrenheit(temp) {
    return Math.floor(temp * 9 / 5 - 459.67);
}

function getKm(wind) {
    return (wind * 3.6).toFixed(1);
}

retrieveWeather();
retrieveForecast();