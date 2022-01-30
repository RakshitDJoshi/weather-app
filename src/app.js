const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()

// Trying to take port value from the environment variable (will have a valid value when heroku tries to access it) or set it to 3000, if that does not exist
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars view engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Crisp Potato'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.location){
        return res.send({
            error: 'You must provide a location.'
        })
    }

    forecast(req.query.location, (error, forecastData) => {
        if(error){
            return res.send({ error })
        }
    
        res.send({
            forecast: forecastData,
            location: req.query.location
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Crisp Potato'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Crisp Potato',
        helptext: 'Yes, you can help us! Please send the money to therakshitjoshi@okaxis :)'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error: 404',
        name: 'Crisp Potato',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error: 404',
        name: 'Crisp Potato',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})