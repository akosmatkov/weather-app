const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f6ae3b4934603b12ff6bf3bbf8bd5dad&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback("Unable to connect to weather services!", undefined);
        } else if (body.error) {
            console.log(url);
            callback("Unable to find location!", undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is " + body.current.temperature + " degrees. It feels like " + body.current.feelslike + " degrees.");
        }
    })
}

module.exports = forecast;