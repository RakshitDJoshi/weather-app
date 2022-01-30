const request = require('request')

const forecast = (location, callback) => {
    const url = 'https://api.weatherapi.com/v1/forecast.json?key=360eef08dc6a406da6b212047221001&q='+ encodeURIComponent(location) +'&days=1&aqi=no&alerts=no'

    request({url, json: true}, (error, { body } = {}) => {
        if(error){
            callback('Unable to connect to the weather api', undefined)
        } else if(body.error){
            callback(errorMsg = body.error.message, undefined)
        } else{
            callback(undefined, body.current.condition.text + '. The temperature is ' + body.current.temp_c + ' degree C.')
        }
    })
}

module.exports = forecast