var FortniteAPI = require('../src/fortnite-api-node')
var auth = require('../auth');

var options = {
    api_key: auth.token,
    platform: "pc" //all other platforms are inferior
}

var fortnite = new FortniteAPI(options);

fortnite.getLifetimeKills('Deogle')
.then(function(result){
    console.log(result);
})

fortnite.getKills('Deogle','p2')
.then(function(result){
    console.log(result);
})
