const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')



//console.log(__dirname)
// /console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Jawad Hashmi'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Jawad Hashmi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jawad Hashmi',
        message: 'How can I help you ?'
    })
})
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     },{
//         name: 'Andrew',
//         age: 27
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About the app!</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You musct provide an address'
        })
    }
    forecast(23.5880, 58.3829, (error, data) => {
        if(error){
            return res.send(error)
        }
        // console.log('Error', error)
        // console.log('Data', data)
        res.send({
            forecast: data,
            address: req.query.address
        })
    })
    
    
})

app.get('/products', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address term'
        })
    }else{
        console.log(req.query.address)
        res.send({
            locatoin: req.query.address,
            forecast: 'Sunny',
            temperature: 45
        })
    }

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jawad Hashmi',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jawad Hashmi',
        errorMessage: 'Requested page not found.'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})