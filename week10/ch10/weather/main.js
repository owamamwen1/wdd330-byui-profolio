let forecast = {
  apiKey: "f4bc67b26a821070aad05cc51dea6997",
  fetchWeatherAPIs: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("Not found.");
          throw new Error("Not found.");
        }
        return response.json();
      })
      .then((data) => this.viewWeather(data));
  },
  viewWeather: function (data) {
    const { name } = data;
    const { speed } = data.wind;
    const { temp, humidity } = data.main;
    const { icon, description } = data.weather[0];
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".description").innerText = description;
    document.querySelector(".weathertemp").innerText = temp + "°C";
    document.querySelector(".weather").classList.remove("load");
    document.body.style.backgroundImage =" url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeatherAPIs(document.querySelector(".search-avtive").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  forecast.search();
});

document.querySelector(".search-avtive").addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
      forecast.search();
    }
  });
// default is 'paris' weather
forecast.fetchWeatherAPIs("Paris");