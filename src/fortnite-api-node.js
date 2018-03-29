var req = require('request');
var base_url = "https://api.fortnitetracker.com/v1/profile"

function FortniteAPI(options){
    this.api_key = options.api_key;
    this.platform = options.platform;
    this.url = base_url + "/" + this.platform + "/";
}

FortniteAPI.prototype.getLifetimeKills = function(epic_nickname){
    var full_url = this.url + epic_nickname;
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

FortniteAPI.prototype.getKills = function(epic_nickname,playlist){
    var full_url = this.url + epic_nickname;
    var options = {
        url: full_url,
        headers: {
            'TRN-Api-Key':this.api_key
        }
    };
    return new Promise(function(resolve,reject){
        req(options,function(err,res,body){
            if(!err && res.statusCode == 200){
                var data = JSON.parse(body);
                resolve(data.stats[playlist].kills)
            }
        })
    });
}

module.exports = FortniteAPI;