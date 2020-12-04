const { WebClient } = require('@slack/web-api')
const psiService = require('../services/psi.service')
const web = new WebClient(process.env.SLACK_TOKEN)




module.exports = {
	async needForSpeed(req, res) {
		try {
			if(!req.body.text) {
				throw new Error('No URL given')
			} 

			let pageSpeedData = await psiService.getPageSpeed(req.body.text)
			console.log(pageSpeedData)
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