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
    } catch (error) {
        console.log(error);
    }
    
}

retrieveWeather();