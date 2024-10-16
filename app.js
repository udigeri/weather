let appid = "";
let searchCity = document.getElementById("searchCity");
let app = document.querySelector(".app");
let form = document.querySelector("form");
let main = document.querySelector(".main");
let sun = document.querySelector(".sun");
let city = document.querySelector(".city");
let latitude = document.getElementById("latitude");
let longitude = document.getElementById("longitude");
let weather = document.querySelector(".weather");
let temperature = document.getElementById("temperature");
let temperatureFeels = document.getElementById("temperature-feels");
let temperatureMin = document.getElementById("temperature-min");
let temperatureMax = document.getElementById("temperature-max");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let speed = document.getElementById("speed");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (searchCity.value != "") {
        searchCityWeather(searchCity.value);
    }
});


const searchCityWeather = (cityName) => {
    fetch(
        "https://api.openweathermap.org/geo/1.0/direct?&limit=1&appid=" +
            appid +
            "&q=" +
            cityName
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((location) => {
            console.log(location);
            searchLocationTime(location);
            searchLocationWeather(location);
        });
};

function searchLocationWeather(location) {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?&units=metric&mode=json&appid=" +
            appid +
            "&lat=" +
            location[0].lat +
            "&lon=" +
            location[0].lon
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data.cod == 200) {
                fillOutputData(data);
            } else {
                searchCity.value = "";
                app.classList.add("error");
                setTimeout(() => {
                    app.classList.remove("error");
                }, 3000);
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
}

function searchLocationTime(location) {
    fetch(
        "https://timeapi.io/api/time/current/coordinate" +
            "?latitude=" +
            location[0].lat +
            "&longitude=" +
            location[0].lon
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            fillOutputTime(data);
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
}

function fillOutputTime(data) {
    city.querySelector(".time").innerHTML = data.time;
}

function fillOutputData(data) {
    city.querySelector(".name").innerHTML = data.name;
    latitude.innerHTML = data.coord.lat.toFixed(3) + "&deg;N";
    longitude.innerHTML = data.coord.lon.toFixed(3) + "&deg;E";
    main.querySelector("img").src =
        "https://flagsapi.com/" + data.sys.country + "/shiny/64.png";
    weather.querySelector("img").src =
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    weather.querySelector(".description").innerHTML =
        data.weather[0].main + " " + data.clouds.all + "%";
    temperature.innerText = data.main.temp.toFixed(1);
    temperatureFeels.innerText = data.main.feels_like.toFixed(1);
    temperatureMin.innerText = Math.floor(data.main.temp_min);
    temperatureMax.innerText = Math.ceil(data.main.temp_max);

    let dateObj = new Date((data.sys.sunrise + data.timezone) * 1000);
    let sunRise =
        dateObj.getUTCHours() +
        ":" +
        dateObj.getUTCMinutes().toString().padStart(2, "0");
    sunrise.innerText = sunRise;
    dateObj = new Date((data.sys.sunset + data.timezone) * 1000);
    let sunSet =
        dateObj.getUTCHours() +
        ":" +
        dateObj.getUTCMinutes().toString().padStart(2, "0");
    sunset.innerText = sunSet;
    console.log(sunSet);

    speed.innerText = data.wind.speed;
    humidity.innerText = data.main.humidity;
    pressure.innerText = data.main.pressure;
}

const initApp = (city) => {
    console.info("app initiated");
    searchCityWeather(city);
};

initApp("Žilina");
