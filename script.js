// Get references to HTML elements
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const description = document.getElementById('description');

const apiKey = '106a58cbc3043f13677355383ae4f049';

// Event listener for the search button
searchBtn.addEventListener('click', function() {
  const city = cityInput.value.trim();
  
  // Check if city input is not empty
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  // Fetch weather data from OpenWeatherMap API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      // Display weather information
      weatherInfo.classList.remove('hidden');
      errorMessage.classList.add('hidden');
      cityName.textContent = data.name;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
      description.textContent = `Weather: ${data.weather[0].description}`;
    })
    .catch(error => {
      // Show error message if city is not found
      weatherInfo.classList.add('hidden');
      errorMessage.classList.remove('hidden');
      console.error(error);
    });
});

