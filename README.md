# README #

Google Pagespeed Slack Bot

### Basic Setup Instructions ###

1. Deploy this application to a server such as heroku

2. Create a new app on slack and add it to your workspace 
	* https://api.slack.com/authentication/basics#creating
	* https://api.slack.com/authentication/basics#scopes
	* https://api.slack.com/authentication/basics#installing
	* https://api.slack.com/authentication/basics#commands

3. Get your slack app credentials and Google Page Speed API Key

4. Add those credentials to your server environment variables. You'll need to set the following variables:
	* SLACK_TOKEN
	* PSI_API_KEY
	* SLACK_SIGNING_SECRET
	* PORT (this one is optional)

5. Add slash commands to your slack app
	* Set the request URL to your server's domain. (e.g. https://myserverdomain.com/slack/needforspeed)
