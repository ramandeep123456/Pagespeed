const { WebClient } = require('@slack/web-api')
const web = new WebClient(process.env.SLACK_TOKEN)


module.exports = {
	async needForSpeed(req, res) {
		console.log(req.body)
		// try {
		// 	const currentTime = new Date().toTimeString()
		// 	await web.chat.postMessage({
		// 		channel: '#random',
		// 		text: `The current time is ${currentTime}`,
		// 	})
		// 	res.status(200).send()
		// } catch(error) {
		// 	console.log(error)
		// 	res.status(400).send({message: 'bad request'})
		// }
	}
}