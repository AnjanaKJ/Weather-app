const request = require("request")
const forcast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0ded3a51d55e89651003053558cb15ca&query=' + lat + ',' + long + '&units=m'
    request({ url, json: true }, (error, { body }) => {

        //console.log(response.body)
        if (error) {
            callback(undefined,"Error")
        } else if (body.length==0) {
            callback( undefined,"Error")
        } 
        else {
    callback( {
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        description: body.current.weather_descriptions[0]
    },undefined)
    //  callback("It is currently " + body.current.temperature + " degree celsius temperature here and it feels like " + body.current.feelslike+" degree celsius.\n"+body.current.weather_descriptions[0],undefined)
    //console.log(response.body.current.weather_descriptions[0])
}
    })
}
module.exports = forcast