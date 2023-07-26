import express from "express";
import https from "https";
import bodyParser from "body-parser";
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  console.log(query);
  const apikey = "b003253a9a14f3a27388c6d6ab62ab40";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=metric";
    if (query === undefined || query === null || query.trim() === '') {
      return res.render("index.ejs");
    }

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const cityName1 = weatherData.name;
      const weatherTemp = weatherData.main.temp;
      const weatherPressure = weatherData.main.pressure;
      const weatherHumidity = weatherData.main.humidity;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const weatherIconURL = "https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png"
      const data2 = {weatherTemp,weatherPressure,weatherHumidity,weatherDescription,weatherIconURL,cityName1};
      res.render("index.ejs",{data2});
    
    });
  });
});
app.listen(port, function () {
  console.log("Running on Port 3000");
});
