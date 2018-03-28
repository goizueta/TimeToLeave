## mtaSkill

A short alexa skill that tells you when the next train is leaving from your station.

### Motivation

Since I often either miss the last train at the station, or arrive 10+ minutes early, I made a short alexa skill that will let me know when the next two trains are leaving my station.

### Installing and Running

0. Customize the code for your station

* git clone http://github.com/goizueta/mtaSkill
* 'cd mtaSkill'
* `npm install --prefix=. mta-gtfs`
* Go to http://mtaapi.herokuapp.com/stations
* Write down the 3 digit code for the station you want the skill to alert you on
* In _index.js_ change `MY_STATION_CODE` to a string with the value of that code
* Go to http://datamine.mta.info/list-of-feeds
* Write down the feed_id for the train line you care about
* In _index.js_ change `MY_TRAIN_FEED` to a number with the value of that feed_id
* Zip the folder for later uploading to Lambda with `zip -r ../mtaSkill.zip *`

1. Create your Alexa skill

* Create an Alexa skill (named whatever you want) at https://developer.amazon.com/alexa/console/ask/create-new-skill
* Select 'Custom' for the skill model
* Copy the JSON in alexaIntent.json into the _JSON Editor_ section of the Interaction model
* Go to the Endpoint page, select _AWS Lambda ARN_ as your endpoint and copy down the skill ID that is given to you
* Save

2. Create your Lambda function

* Create a Lambda function( named whatever you want)at https://console.aws.amazon.com/lambda/home?region=us-east-1#/create
* In _Configuration_ add _Alexa Skills Kit_ as a trigger
* Enter the Skill ID you copied in step 1
* Copy the ARN in the top right of the page and enter it into the _Default Region_ field on your Alexa Skill Endpoint page
* In the _Function Code_ section, select _Upload a .ZIP file_ as the _Code Entry Type_ and upload the zip file you made in step 1
* Select Node.js 6.10 as your runtime
* Enter `index.myHandler` as your handler
* Click _Save_ and _Test_ in the top right.

3. Test your skill

* Return to the Alexa console.
* Build your skill
* Test it with the command "Is it time to leave?"

### Credits

Wouldn't be possible without:

* http://mtaapi.herokuapp.com/
* https://github.com/aamaliaa/mta-gtfs

## License

MIT © Roberto Goizueta
