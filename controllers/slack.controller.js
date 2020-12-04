const { WebClient } = require('@slack/web-api')
const psiService = require('../psi.service')
const web = new WebClient(process.env.SLACK_TOKEN)




module.exports = {
	async needForSpeed(req, res) {
		try {
			let pageSpeedData = await getPageSpeed(req.body.text)
			await web.chat.postMessage({
				channel: '#'+req.body.channel_name,
				text: `${pageSpeedData}`,
			})
			res.status(200).send()
		} catch(error) {
			console.log(error)
			res.status(400).send({message: 'bad request'})
		}
	},
}