'use strict'
const router = require('express').Router()
const Slack = require('../controllers/slack.controller')


const baseRoute = '/slack'

router.use((req, res, next) => {
    // do logging

    next() // make sure we go to the next routes and don't stop here
})


// Pagespeed endpoints
router.get(baseRoute + '/needforspeed', Slack.needForSpeed)
router.post(baseRoute + '/needforspeed', Slack.needForSpeed)


//Add more endpoints

module.exports = router