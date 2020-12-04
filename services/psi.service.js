const psi = require('psi')

module.exports = {
	async getPageSpeed(url) {

		try {
			let desktopResponse = await psi(url, {strategy: 'desktop', key: 'AIzaSyBB1DJVvt9HAy8GIDiC98ptJPHIVDvxu5s'})
			let desktopData = extractWantedPSIData(response)

			mobileResponse = await psi(url, {strategy: 'mobile', key: 'AIzaSyBB1DJVvt9HAy8GIDiC98ptJPHIVDvxu5s'})
			let mobileData = extractWantedPSIData(response)

			let slackFormattedDAta = formatExtractedData([desktopData, mobileData])


			return slackFormattedDAta
		} catch(error) {
			console.log(error)
			return { error: error }
		}
	},

	extractWantedPSIData(data) {
		return {
			evaluation: response.config.params.strategy,
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
	},

	formatExtractedData(psiData) {
		let formattedData = {
			blocks: []
		}

		let lastIndex = Array.lastIndexOf(psiData)

		for(const data of psiData) {
			formattedData.blocks.push(
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

			if(lastIndex != data) {
				formattedData.push({ "type": "divider" })
			}
		}

		return JSON.stringify(formattedData)
	}
}