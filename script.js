const API_KEY = '6b3cc77dc2ce411a96604927231708';
const baseURL = 'https://api.weatherapi.com/v1';
const apiMethod = '/current.json';

const form = document.querySelector('form');
const input = form.querySelector('input');
const btn = form.querySelector('button');

const weatherDiv = document.querySelector('.weather');
const icon = weatherDiv.querySelector('.weather-icon');
const temp = weatherDiv.querySelector('.temp-val');
const text = weatherDiv.querySelector('.text');
const city = weatherDiv.querySelector('.city');

const errorMsg = document.querySelector('.error p');

const detailsDiv = weatherDiv.querySelector('.details');
const humidity = detailsDiv.querySelector('.humidity-val');
const windSpeed = detailsDiv.querySelector('.wind-val');

async function getWeatherData(location) {
  const response = await fetch(`${baseURL}${apiMethod}?key=${API_KEY}&q=${location}`, {
    mode: 'cors'
  });
  const weatherData = await response.json();
  if (!response.ok) {
    throw new Error(weatherData.error.message);
  }
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
  getWeatherData(input.value)
    .then((obj) => {
      icon.src = obj.icon;
      temp.textContent = Math.round(obj.temp_c);
      text.textContent = obj.text;
      city.textContent = obj.city;
      humidity.textContent = obj.humidity;
      windSpeed.textContent = obj.wind;

      weatherDiv.style.display = 'block';
      errorMsg.textContent = '';
    })
    .catch((error) => {
      console.error(error);
      errorMsg.textContent = error.message;
      weatherDiv.style.display = 'none';
    })
}

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    displayWeather();
  })
