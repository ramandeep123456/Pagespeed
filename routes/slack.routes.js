'use strict'
const router = require('express').Router()
const slackVerificationMiddleware = require('../services/slack-verification.service')
const Slack = require('../controllers/slack.controller')


const baseRoute = '/slack'

router.use(slackVerificationMiddleware)


// Pagespeed endpoints
router.get(baseRoute + '/needforspeed', Slack.needForSpeed)
router.post(baseRoute + '/needforspeed', Slack.needForSpeed)


//Add more endpoints

module.exports = router