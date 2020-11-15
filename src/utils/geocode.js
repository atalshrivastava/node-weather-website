const request = require('postman-request');

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXRhbHNocml2YXN0YXZhIiwiYSI6ImNrZmNpOTBjaTE3emkycHB4Zm8waWt6amMifQ.5KRjURYSGO-6ETgELd1R1Q&limit=1';

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                places: body.features[0].place_name
            })

        }
    })
}

module.exports = geocode 