const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e562446fe5a3afa2c939bc0006369419/' + latitude + ',' + longitude + '?units=si'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Error: Unable to connect to weather services!', undefined)
        }
        else if(body.error){
            callback('Error: Unable to find location! Try again', undefined)
        }
        else{
            callback(undefined, 
                body.daily.data[0].summary +" It is currently "+body.currently.temperature+ " degrees out. There is a "+body.currently.precipProbability+"% chance of rain.")
        }
    })
}

module.exports = forecast