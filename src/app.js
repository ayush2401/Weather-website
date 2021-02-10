// MAIN BACKEND 

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const location = require('./utils/types')
const app = express()

// define paths for express configuration
const publicpath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialPath = path.join(__dirname , '../templates/partials')

// setup handle bar engine and views location
app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialPath)

// setup static directory
app.use(express.static(publicpath)) // first route

app.get('' , (req , res) => {
    res.render('index' , {
        title: 'Weather',
        name: 'ayush'
    })
})

app.get('/about' , (req , res) => {
    res.render('about' , {
        title: 'About me',
        name: 'ayush'
    })
})

app.get('/help' , (req , res) => {
   res.render('help' , {
       helptext: 'any help needed',
       title: 'Help',
       name: 'ayush'
   })
})


app.get('/weather' , (req , res) => {

    if(!req.query.address)
       return res.send({
           error: 'please provide address'
    })

    location.getGeoLocation(req.query.address , (error , data) => {
    
        if(error) { 
            return res.send({
                error: 'enter valid place'
            })
        }
    
        location.getForecast(data.latitude , data.longitude , (error , forecastdata) => {

            return res.send({
                 location: data.location,
                 forecast: forecastdata
            })
        })
    })
})

app.get('/help/*' , (req , res) => {
      res.render('error' , {
          title: 'help page incorrect',
          name: 'ayush'
      })
})

app.get('*' , (req , res) => {
    res.render('error' , {
        title: '404',
        name: 'ayush'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000 , () => {
    console.log('serving running on port 3000')
})

