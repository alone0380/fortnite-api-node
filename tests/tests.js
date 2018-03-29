var FortniteAPI = require('./FortniteAPI');
var auth = require('./auth');

var options = {
    api_key: auth.token,
    platform: "pc" //all other platforms are inferior
}

var fortnite = new FortniteAPI(options);

fortnite.getKills('Deogle')
.then(function(result){
    console.log("Deogle has " + result + " kills");
})

