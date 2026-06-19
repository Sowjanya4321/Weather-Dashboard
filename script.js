async function getWeather() {

    const city = document.getElementById("cityInput").value;

    const result = document.getElementById("weatherResult");

    if(city === "") {
        result.innerHTML = "Please enter a city name";
        return;
    }

    const apiKey = "YOUR_API_KEY";

    const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        result.innerHTML = "Loading...";

        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const condition = data.weather[0].description;

        result.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${temp} °C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${wind} m/s</p>
            <p>Condition: ${condition}</p>
        `;

    }
    catch(error) {

        result.innerHTML =
        `<p style="color:red">${error.message}</p>`;
    }
}
