const WebClient = require('@slack/web-api')

const web = new WebClient(process.env.SLACK_TOKEN)
const currentTime = new Date().toTimeString()

(async () => {
	try {
		await web.chat.postMessage({
			channel: '#random',
			text: `The current time is ${currentTime}`,
		})
	} catch(error) {
		console.log(error)
	}
})