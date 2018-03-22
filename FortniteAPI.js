var req = require('request');
var base_url = "https://api.fortnitetracker.com/v1/profile"

function FortniteAPI(api_key,platform){
    this.api_key = api_key;
    this.platform = platform;
}

FortniteAPI.prototype.getKills = function(epic_nickname){
    var full_url = base_url + "/" + this.platform + "/" + epic_nickname;
    var options = {
        url: full_url,
        headers: {
            'TRN-Api-Key':this.api_key
        }
    };
    return new Promise(function(resolve,reject){
        req(options,function(err,res,body){
            if(!err && res.statusCode == 200){
                //Send off data
                var data = JSON.parse(body);
                resolve(data.lifeTimeStats[10].value);
            }
        });
    })
}

module.exports = FortniteAPI;