const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a31bd95ee5a936ddd298646de0e446d5&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, 'climate is ' + body.current.weather_descriptions[0] + ' in ' + body.location.name)
        }
    })
}

module.exports = forecast