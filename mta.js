var Mta = require("mta-gtfs");
var mta = new Mta({
    key: "a3d76790b3faca21b4f260b7de5085d0", // only needed for mta.schedule() method
    feed_id: 16 // optional, default = 1
});

mta
    .stop()
    .then(function(result) {
        console.log(result);
    })
    .catch(function(err) {
        console.log(err);
    });

mta.stop("D25").then(function(result) {
    console.log(result);
});

mta.schedule("D25", 16).then(function(result) {
    console.log(result.schedule.D25.N);
    var nextArrivalTime = Number(result.schedule.D25.N[0].arrivalTime + "000");
    var nextNextArrivalTime = Number(
        result.schedule.D25.N[1].arrivalTime + "000"
    );
    var currentTime = new Date().getTime();
    var minsUntilNextArrival = Math.floor(
        (nextArrivalTime - currentTime) / 60000
    );
    var minsUntilNextNextArrival = Math.floor(
        (nextNextArrivalTime - currentTime) / 60000
    );
    console.log(
        "Next Q Trains arrive in " +
            minsUntilNextArrival +
            " and " +
            minsUntilNextNextArrival +
            " mins"
    );
});
