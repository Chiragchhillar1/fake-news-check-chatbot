let express = require('express')
const bodyParser = require('body-parser')

let app = new express()

app.use(express.static('public'))
app.use(bodyParser.json())

//Logging all requests
app.use((req, res, next) => {
    console.log(` User searched for intent name -  ${JSON.stringify(req.body.queryResult.intent.displayName)}`)
    next()
})

let callbackUrl = require('../routes/callback')

app.use(callbackUrl)

//not found error handle
app.use((req, res, next) => {
    // res.status(404).send('You seems to be lost!')
    res.redirect('/');
})

//500 erorr handle
app.use((err, req, res, next) => {
    console.log('in error')
    res.status(500).send('Something went wrong. We will be back in a while. Thanks for visiting.')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`) )

