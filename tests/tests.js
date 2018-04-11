var FortniteAPI = require('../src/fortnite-api-node')
var auth = require('../auth');

var options = {
    api_key: auth.token,
    platform: "pc" //all other platforms are inferior
}

var fortnite = new FortniteAPI(options);

var example_name = /*some epic nickname*/

fortnite.getData(example_name)
.then(function(result){
    console.log(result);
})

var players = /*some array of nicknames*/

fortnite.getPlayers(players)
.then(function(result){
    console.log(result);
})