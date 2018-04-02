var req = require('request');
var base_url = "https://api.fortnitetracker.com/v1/profile"

function FortniteAPI(options){
    this.api_key = options.api_key;
    this.platform = options.platform;
    this.url = base_url + "/" + this.platform + "/";
}

FortniteAPI.prototype.getLifetimeKills = function(epic_nickname){
    var options = this.getOptions(epic_nickname);
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

/**
 * 
 * @param {*} epic_nickname 
 * @param {*} playlist  Playlist to search through, valid options are ('p2' - SOLO, 'p10' - DUO, 'p9' - SQUAD)
 *                      there are also 'curr_' versions of each playlist option to only grab data from the 
 *                      most recent season. For combined stats check Lifetime version of function
 */
FortniteAPI.prototype.getKills = function(epic_nickname,playlist){
    var options = this.getOptions(epic_nickname);
    return new Promise(function(resolve,reject){
        req(options,function(err,res,body){
            if(!err && res.statusCode == 200){
                var data = JSON.parse(body);
                resolve(data.stats[playlist].kills.value);
            }
        })
    });
}

FortniteAPI.prototype.getData = function(epic_nickname){
    var options = this.getOptions(epic_nickname);
    return new Promise(function(resolve,reject){
        req(options,function(err,res,body){
            if(!err && res.statusCode == 200){
                resolve(data);
            }
        })
    })
}

module.exports = FortniteAPI;

/**
 * Helper function to reduce boilerplate
 */
FortniteAPI.prototype.getOptions = function(epic_nickname){
    var options = {
        url: this.url + epic_nickname,
        headers: {
            'TRN-Api-Key':this.api_key
        }
    };
    return options;
}