const request = require('request')

const geocode = (address, callback) => {
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/ " + encodeURIComponent(address) + " .json?access_token=pk.eyJ1IjoibWFoYW12LXJhbSIsImEiOiJjazE3ajEzdmgwbTRlM3BvMnc3NndrdnE4In0.VX9toX42gHQc9NZQ_4g_iQ&limit=1"
    //es6 destructuring using url instead of url: url and {body} instead of  response
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to reach location services. Please try later", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find the location. Please check the location", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode