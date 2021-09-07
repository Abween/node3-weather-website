const request = require('request');



const forecast = (latitude,longtidude , callback) => {
    const url = "http://api.weatherstack.com/current?access_key=26834c8b826d28efb2d72f057f63d11d&query=" + longtidude + "," + latitude;

    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback("Unable to connect to weather service!!",undefined);
        }
        else if (body.error) {
            callback(body.error.info,undefined)
        }
        else {
            callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature +
                " degrees out. It feels like " + body.current.feelslike + " degrees out.");

        }
    });
}

module.exports =forecast;