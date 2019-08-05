const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamVzcy1saSIsImEiOiJjanhrdmo2MW4wOW1kM3RvMjl1dXNzbDYzIn0.v6raX6hnwHX2WigVh0wUuQ&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Error: Unable to connect to map services!', undefined)
        }
        else if(!body.features.length){
            callback('Error: Unable to find location! Try another', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode