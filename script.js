const API_KEY = '6b3cc77dc2ce411a96604927231708';
const baseURL = 'https://api.weatherapi.com/v1';
const apiMethod = '/current.json';

const form = document.querySelector('.search');
const input = form.querySelector('input');
const btn = form.querySelector('button');

const weatherDiv = document.querySelector('.weather');
const icon = weatherDiv.querySelector('.weather-icon');
const temp = weatherDiv.querySelector('.temp-val');
const text = weatherDiv.querySelector('.text');
const city = weatherDiv.querySelector('.city');

const detailsDiv = weatherDiv.querySelector('.details');
const humidity = detailsDiv.querySelector('.humidity-val');
const windSpeed = detailsDiv.querySelector('.wind-val');

async function checkWeather(location) {
  const response = await fetch(`${baseURL}${apiMethod}?key=${API_KEY}&q=${location}`, {
    mode: 'cors'
  });
  const weatherData = await response.json();
  return {
    icon: `https:${weatherData.current.condition.icon}`,
    text: weatherData.current.condition.text,
    temp_c: weatherData.current.temp_c,
    temp_f: weatherData.current.temp_f,
    city: weatherData.location.name,
    humidity: weatherData.current.humidity,
    wind: weatherData.current.wind_kph,
  };
}

function displayWeather() {
  checkWeather(input.value)
    .then((obj) => {
      console.log(obj)
      icon.src = obj.icon;
      temp.textContent = Math.round(obj.temp_c);
      text.textContent = obj.text;
      city.textContent = obj.city;
      humidity.textContent = obj.humidity;
      windSpeed.textContent = obj.wind;
    })
}

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    displayWeather();
  })
