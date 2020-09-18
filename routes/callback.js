const express = require('express')

const fullfillment = require('../controllers/fullfillment')
// const newfullfillment = require('../controllers/newfullfillment')

const router = express.Router()

router.get('/webhook', (req, res) => {
    res.send('This is a get route for fullfillment webhook.')
})

router.post('/webhook',async (req, res) => {

    const intentName = req.body.queryResult.intent.displayName;

    const getResponse = new fullfillment(req.body)

    const mainResponse = await getResponse[intentName]()
    
    res.send(mainResponse)

})

module.exports = router