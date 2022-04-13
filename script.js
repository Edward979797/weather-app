const search = document.querySelector('#search');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
    try {
        retrieveWeather(search.value);
    } catch (error) {
        console.log(error);
    }
});

async function retrieveWeather(city='Toronto') {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=54c3377a3ca9e9069ecac550e7f3a0a5`);

        const data = await response.json();

        console.log(data);
        populate(data.name, data.main.temp, data.main.feels_like, data.wind.speed, data.main.pressure, data.weather[0].description, data.weather[0].main);
    } catch (error) {
        console.log(error);
    }
    
}

async function retrieveForecast(city="Toronto") {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=54c3377a3ca9e9069ecac550e7f3a0a5`);

        const data = await response.json();

        console.log(data);
    } catch(error) {
        console.log(error);
    }
}

function populate(name, temp, feels, wind, pressure, desc, type) {
    const cityName = document.querySelector('.current-weather-name');
    cityName.textContent = name;

    const tempNumber = document.querySelector('.stats-temp-number');
    tempNumber.textContent = getCelsius(temp) + '°C';

    const feelsLike = document.querySelector('.stats-feels-like-number');
    feelsLike.textContent = getCelsius(feels) + '°C';

    const windNumber = document.querySelector('.stats-wind-number');
    windNumber.textContent = getKm(wind) + ' km/h';

    const pressureNumber = document.querySelector('.stats-pressure-number');
    pressureNumber.textContent = pressure + ' hPA';

    const weatherDesc = document.querySelector('.current-weather-desc');
    weatherDesc.textContent = desc;

    determineIcon(type);
}

function determineIcon(type) {
    const icon = document.querySelector('#icon-image');

    switch(type) {
        case 'Thunderstorm':
            icon.src = './icons/thunderstorm.png';
            break;
        case 'Drizzle':
            icon.src = './icons/drizzle.png';
            break;
        case 'Rain':
            icon.src = './icons/rain.png';
            break;
        case 'Snow':
            icon.src = './icons/snow.png';
            break;
        case 'Mist':
        case 'Smoke':
        case 'Haze':
        case 'Fog':
            icon.src = './icons/haze.png';
            break;
        case 'Dust':
        case 'Sand':
        case 'Ash':
            icon.src = './icons/dust.png';
            break;
        case 'Squall':
            icon.src = './icons/wind.png';
            break;
        case 'Tornado':
            icon.src = './icons/tornado.png';
            break;
        case 'Clear':
            icon.src = './icons/clear.png';
            break;
        case 'Clouds':
            icon.src = './icons/cloudy.png';
            break;
    }
}

function getCelsius(temp) {
    return Math.floor(temp - 273.15);
}

function CToF(temp) {
    return Math.floor((temp * (9 / 5)) + 32);
}

function FToC(temp) {
    return Math.floor((temp - 32) * (5 / 9));
}

function getKm(wind) {
    return (wind * 3.6).toFixed(1);
}

retrieveWeather();
retrieveForecast();