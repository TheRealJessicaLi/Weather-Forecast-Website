const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

//Path to directories for Express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setting up locations hbs engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Use publicDirectoryPath as static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Jessica Li'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Enter any location into the searchbox to see the current weather forecast.',
        author: 'Jessica Li'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Jessica Li'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
             error: 'You must provide an address'
         })  
     }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
        return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
            return res.send({error})
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
  })
})

app.get('/help/*', (req, res) => {
    res.render('404Error', {
        title: "404 Error",
        error: 'Help page not found',
        author: 'Jessica Li'
    })
})

app.get('*', (req, res) => {
    res.render('404Error', {
        title: "404 Error",
        error: 'Page not found',
        author: 'Jessica Li'
    })
})

app.listen(port, () => {
    console.log('Port '+port+': Server is up and running')
})