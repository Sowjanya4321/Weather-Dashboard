async function getWeather() {

    const city = document.getElementById("cityInput").value;
    const result = document.getElementById("weatherResult");

    if(city === "") {
        result.innerHTML = "Please enter a city name";
        return;
    }

    const apiKey = "fedfc7bd05bcb1547af6993aaf553ea";

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        result.innerHTML = "Loading...";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        result.innerHTML = `
            <h2>${data.name}</h2>
            <p>🌡 Temperature: ${data.main.temp} °C</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
            <p>☁ Weather: ${data.weather[0].description}</p>
        `;

    } catch(error) {
        result.innerHTML =
        `<p style="color:red">${error.message}</p>`;
    }
}
