const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../src/utils/geocode");
const forecast = require("../src/utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Hackerman"
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Hackerman"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Hackerman",
        helpText: "Help text"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No address provided"
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
        if (error) {
            return res.send({error});
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            
            res.send({
                place_name,
                forecastData
            });
          });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Error 404",
        name: "Hackerman",
        errorMessage: "Help article not found"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "Error 404",
        name: "Hackerman",
        errorMessage: "Page not found"
    });
});

app.listen(port, () => {
    console.log(`Server is up at port ${port}.`);
});