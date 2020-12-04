'use strict'
const router = require('express').Router()
const slackVerificationMiddleware = require('../services/slack-verification.service')
const Slack = require('../controllers/slack.controller')


const baseRoute = '/slack'

// router.use(slackVerificationMiddleware)


// Pagespeed endpoints
router.get(baseRoute + '/needforspeed', Slack.needForSpeed)
router.post(baseRoute + '/needforspeed', Slack.needForSpeed)








const psi = require('psi')

let getPageSpeed = async (url) => {

	try {
		let response = await psi(url, {strategy: 'desktop', key: 'AIzaSyBB1DJVvt9HAy8GIDiC98ptJPHIVDvxu5s'})

		let desktopData = {
			runWarnings: response.runWarnings,
			serverResponseTime: response.data.lighthouseResult.audits['server-response-time'].displayValue,
			firstPaint: response.data.lighthouseResult.audits['first-contentful-paint'].displayValue,
			firstMeaningfulPaint: response.data.lighthouseResult.audits['first-meaningful-paint'].displayValue,
			largestContentfulPaint: response.data.lighthouseResult.audits['largest-contentful-paint'].displayValue,
			totalBlockingTime: response.data.lighthouseResult.audits['total-blocking-time'].displayValue,
			resourceSummary: response.data.lighthouseResult.audits['resource-summary'].displayValue,
			speedIndex: response.data.lighthouseResult.audits['speed-index'].displayValue,
			score: response.data.lighthouseResult.categories.performance.score * 100,
		}
		response = await psi(url, {strategy: 'mobile', key: 'AIzaSyBB1DJVvt9HAy8GIDiC98ptJPHIVDvxu5s'})

		let mobileData = {
			runWarnings: response.runWarnings,
			serverResponseTime: response.data.lighthouseResult.audits['server-response-time'].displayValue,
			firstPaint: response.data.lighthouseResult.audits['first-contentful-paint'].displayValue,
			firstMeaningfulPaint: response.data.lighthouseResult.audits['first-meaningful-paint'].displayValue,
			largestContentfulPaint: response.data.lighthouseResult.audits['largest-contentful-paint'].displayValue,
			totalBlockingTime: response.data.lighthouseResult.audits['total-blocking-time'].displayValue,
			resourceSummary: response.data.lighthouseResult.audits['resource-summary'].displayValue,
			speedIndex: response.data.lighthouseResult.audits['speed-index'].displayValue,
			score: response.data.lighthouseResult.categories.performance.score * 100,
		}

		let pickedData = {
			desktop: desktopData,
			mobile: mobileData
		}

		return pickedData
	} catch(error) {
		console.log(error)
		return { error: error }
	}
}



router.get(baseRoute + '/psi', async (req, res) => {
	let pageSpeedData = await getPageSpeed(req.query.url)
	res.status(200).send(pageSpeedData)
	// req.query.url
})


//Add more endpoints

module.exports = router