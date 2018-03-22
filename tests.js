var ForniteAPI = require('./FortniteAPI');
var fortnite = new ForniteAPI(/*someApiKey*/,/*platform pc,xbl,psn*/);



fortnite.getKills('Deogle')
.then(function(result){
    console.log("Deogle has " + result + " kills");
})

