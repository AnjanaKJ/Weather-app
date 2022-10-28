
const request = require("request")


const geocode = (add, callback) => {
  const url = 'http://api.positionstack.com/v1/forward?access_key=5bfd2b3eee5092f82b7840d967943fd6&query='+add
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback(undefined,"Unable to find location.")
    } else if (body.data.length==0) {
      callback(undefined,"Unable to find location.")
    }
    else {
      callback({address:body.data[0].label,
        latitude:body.data[0].latitude,
        longitude:body.data[0].longitude},undefined)
    }})
}
module.exports=geocode