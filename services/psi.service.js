const psi = require('psi')


let extractWantedPSIData = (response) => {
	return {
		evaluation: response.config.params.strategy,
		runWarnings: response.data.lighthouseResult.runWarnings,
		serverResponseTime: response.data.lighthouseResult.audits['server-response-time'].displayValue,
		firstPaint: response.data.lighthouseResult.audits['first-contentful-paint'].displayValue,
		firstMeaningfulPaint: response.data.lighthouseResult.audits['first-meaningful-paint'].displayValue,
		largestContentfulPaint: response.data.lighthouseResult.audits['largest-contentful-paint'].displayValue,
		totalBlockingTime: response.data.lighthouseResult.audits['total-blocking-time'].displayValue,
		resourceSummary: response.data.lighthouseResult.audits['resource-summary'].displayValue,
		speedIndex: response.data.lighthouseResult.audits['speed-index'].displayValue,
		score: response.data.lighthouseResult.categories.performance.score * 100,
	}
}

let formatExtractedData = (url, psiData) => {
	let blocks = [
		{
			type: "section",
			text: {
				type: "mrkdwn",
				text: `PageSpeed Report for: *${url}*`
			}
		}
	]

	let lastIndex = psiData[psiData.length - 1]

	for(const data of psiData) {
		let warnings = ""

		for(const warning of data.runWarnings) {
			warnings += "* " + warning + "\n"
		}

		blocks.push(
			{
				type: "header",
				text: {
					type: "plain_text",
					text: data.evaluation.charAt(0).toUpperCase() + data.evaluation.slice(1),
				}
			},
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: "*Total Score*: " + data.score + "\n" +
							"*Server Response Time*: " + data.serverResponseTime + "\n" +
							"*First Paint*: " + data.firstPaint + "\n" +
							"*First Meaningful Paint*: " + data.firstMeaningfulPaint + "\n" +
							"*Largest Contentful Paint*: " + data.largestContentfulPaint + "\n" +
							"*Total Blocking Time*: " + data.totalBlockingTime + "\n" +
							"*Resource Summary*: " + data.resourceSummary + "\n" +
							"*Speed Index*: " + data.speedIndex + "\n"
				}
			}
		)

		if(warnings) {
			blocks.push(
				{ type: "divider" }, 
				{
					type: "section",
					text: {
						type: "mrkdwn",
						text: warnings
					}
				}
			)
		}

		if(lastIndex != data) {
			blocks.push({ type: "divider" })
		}
	}

	return blocks
}


module.exports = {
	async getPageSpeed(url) {

		try {
			let desktopResponse = await psi(url, {strategy: 'desktop', key: process.env.PSI_API_KEY})
			let desktopData = extractWantedPSIData(desktopResponse)

			mobileResponse = await psi(url, {strategy: 'mobile', key: process.env.PSI_API_KEY})
			let mobileData = extractWantedPSIData(mobileResponse)

			let slackFormattedDAta = formatExtractedData(url, [desktopData, mobileData])


			return slackFormattedDAta
		} catch(error) {
			console.log(error)
			return { error: error }
		}
	}
}