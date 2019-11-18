const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = "https://api.darksky.net/forecast/2b86b8740df44147b448f442c2413d9a/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longtitude)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(" Unable to reach the weather service", undefined)
        } else if (body.error) {
            callback(" Invalid co-ordinates! Please check !", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + "It is currently " + body.currently.temperature + "°F out. This may go high upto " + body.daily.data[0].temperatureHigh + "°F and with a low of " + body.daily.data[0].temperatureLow + " °F. There is a " + body.currently.precipProbability + "% probability of raining.")
        }
    })
}

module.exports = forecast