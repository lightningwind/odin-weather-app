
async function getWeatherData(location) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=6b3cc77dc2ce411a96604927231708&q=${location}`, {
    mode: 'cors'
  });
  const weatherData = await response.json();
  return {
    icon: weatherData.current.condition.icon,
    text: weatherData.current.condition.text,
    temp_c: weatherData.current.temp_c,
    temp_f: weatherData.current.temp_f,
  };
}

getWeatherData('Vancouver')
  .then((obj) => {
    console.log(obj);
  })
