const { WebClient } = require('@slack/web-api')
const web = new WebClient(process.env.SLACK_TOKEN)


module.exports = {
	async needForSpeed(req, res) {

		try {
			const currentTime = new Date().toTimeString()
			await web.chat.postMessage({
				channel: '#random',
				text: `The current time is ${currentTime}`,
			})
		} catch(error) {
			console.log(error)
		}
	}
}