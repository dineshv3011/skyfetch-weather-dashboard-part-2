const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const errorMessage = document.getElementById("errorMessage");
const loading = document.getElementById("loading");

const API_KEY = "86e38c38ae1e91229d2b9fce84182e10"; // replace this

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    getWeather(city);
  }
});

async function getWeather(city) {
  if (!city) {
    errorMessage.textContent = "Please enter a city name.";
    return;
  }

  errorMessage.textContent = "";
  weatherResult.innerHTML = "";
  loading.style.display = "block";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found.");
    }

    const data = await response.json();

    weatherResult.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
    `;
  } catch (error) {
    errorMessage.textContent = error.message;
  } finally {
    loading.style.display = "none";
  }
}