// To customize to the station nearest your house, change this station code to that of your station
// Station codes are available at http://mtaapi.herokuapp.com/stations
const MY_STATION_CODE = "D25";

// To customize to a specific train line (e.g. Q, B, 4, etc..), change this to the feed_id number for that line
// Train Feed IDs are available at http://datamine.mta.info/list-of-feeds
const MY_TRAIN_FEED = 16;

var Mta = require("mta-gtfs");
var mta = new Mta({
    key: "a3d76790b3faca21b4f260b7de5085d0", // only needed for mta.schedule() method
    feed_id: MY_TRAIN_FEED // optional, default = 1
});

exports.myHandler = function(event, context, callback) {
    var result = getForecast(context);
};

function getForecast(context) {
    var forecast = mta
        .schedule(MY_STATION_CODE, MY_TRAIN_FEED)
        .then(function(result) {
            var firstArrivalTime = getNthArrivalTime(result, 0);
            var secondArrivalTime = getNthArrivalTime(result, 1);
            var currentTime = new Date().getTime();

            var minsUntilFirstArrival = Math.floor(
                (firstArrivalTime - currentTime) / 60000
            );
            var minsUntilSecondArrival = Math.floor(
                (secondArrivalTime - currentTime) / 60000
            );

            // This is what Alexa will eventually read out
            var forecast =
                "The next Q. trains arrive in " +
                minsUntilFirstArrival +
                " and " +
                minsUntilSecondArrival +
                " minutes.";

            var obj = {
                version: "string",
                response: {
                    outputSpeech: {
                        type: "PlainText",
                        text: forecast
                    },
                    shouldEndSession: true
                }
            };

            // This tells lambda to exit
            context.succeed(obj);
        });
}

function getNthArrivalTime(result, n) {
    return Number(
        result["schedule"][MY_STATION_CODE]["N"][n]["arrivalTime"] + "000" // Adding 3 digits to standardize time format
    );
}
