// WEATHER API CALLS

const request = require('request')

const getGeoLocation = (address , callback) => {
    const urL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXl1c2hzYXJhZiIsImEiOiJja2t2Y2Vjb2ExMmM0Mnhtc3MwdnRqODZlIn0.ZBCFuyeu7gX_KVnTU8q_jA&limit=1'

    request({url: urL , json: true } , (error , {body}) => {
              if(error) {
                callback('unable to connect' , 'empty')
              } else if(body.features.length === 0) {
                callback('invalid input' , 'empty')
              } else {
                const data = body.features[0].center
                  callback(undefined , {
                    latitude: data[1],
                    longitude: data[0],
                    location: body.features[0].place_name
                  })
              }
    })
}

const getForecast = (latitude , longitude , callback) => {

  const urL = 'http://api.weatherstack.com/current?access_key=5bc8c9f6f94fde4365cde77ca97edc5e&query=' + latitude + ',' + longitude +  '&units=m'
  
  request({url: urL , json: true } , (error , {body}) => {
            if(error) {
              callback('unable to connect' , 'empty')
            } else if(body.error) {
              callback('invalid input' , 'empty')
            } else {
              const data = body.current
              const str = data.weather_descriptions[0] + '. It is ' + data.temperature + ' degrees outside and it feels like ' + data.feelslike + ' degrees'
              callback('empty' , str)
            }
  })
}

module.exports = {
    getGeoLocation ,
    getForecast
}