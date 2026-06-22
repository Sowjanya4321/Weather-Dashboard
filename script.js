function updateDateTime(){

    document.getElementById("dateTime")
    .innerHTML =
    new Date().toLocaleString();
}

setInterval(updateDateTime,1000);
updateDateTime();

document
.getElementById("cityInput")
.addEventListener(
"keypress",
function(event){

    if(event.key==="Enter"){
        getWeather();
    }
});

async function getWeather(){

    const city =
    document.getElementById("cityInput").value;

    const result =
    document.getElementById("weatherResult");

    if(city===""){
        result.innerHTML =
        "<p>Please enter a city name</p>";
        return;
    }

    try{

        result.innerHTML =
        "<p>Loading...</p>";

        const geoResponse =
        await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData =
        await geoResponse.json();

        if(
        !geoData.results ||
        geoData.results.length===0
        ){
            throw new Error(
            "City not found");
        }

        const latitude =
        geoData.results[0].latitude;

        const longitude =
        geoData.results[0].longitude;

        const cityName =
        geoData.results[0].name;

        const weatherResponse =
        await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        const weatherData =
        await weatherResponse.json();

        result.innerHTML=`

        <div class="weather-card">

            <h2>${cityName}</h2>

            <p>
            🌡 Temperature:
            ${weatherData.current.temperature_2m}
            °C
            </p>

            <p>
            💧 Humidity:
            ${weatherData.current.relative_humidity_2m}
            %
            </p>

            <p>
            🌬 Wind Speed:
            ${weatherData.current.wind_speed_10m}
            km/h
            </p>

        </div>

        `;

    }
    catch(error){

        result.innerHTML=
        `
        <p style="color:#ffdddd">
        ${error.message}
        </p>
        `;
    }
}
