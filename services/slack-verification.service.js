const crypto = require('crypto')
const qs = require('qs')

let slackVerification = (req, res, next) => {
	if(!req.headers['x-slack-signature'] || !req.headers['x-slack-request-timestamp'] || !req.body) {
		return res.status(400).send('Missing slack signature or timestamp in headers')
	}


	// Make sure requests are coming from slack
    let slackSignature = req.headers['x-slack-signature']
	let requestBody = qs.stringify(req.body,{ format:'RFC1738' })
	let timestamp = req.headers['x-slack-request-timestamp']

	// Get current timestamp
	const time = Math.floor(new Date().getTime()/1000)

	// The request timestamp is more than five minutes from local time.
	// Could be a replay attack so ignore the request
    if (Math.abs(time - timestamp) > 60 * 5) {
    	return res.status(400).send('Request ignored')
    }


    let signatureBase = 'v0:' + timestamp + ':' + requestBody
    const slackSigningSecret = process.env.SLACK_SIGNING_SECRET


    let ourSignature = 'v0=' + crypto.createHmac('sha256', slackSigningSecret)
								     .update(signatureBase, 'utf8')
								     .digest('hex')
    
    // Compare our signature with Slack's
    // Go next if signatures match
    if(crypto.timingSafeEqual(Buffer.from(ourSignature, 'utf8'), Buffer.from(slackSignature, 'utf8'))) {
    	next()
    } else {
    	return res.status(400).send('Could not verify signatures')
    }
}

module.exports = slackVerification