var req = require('request');
var base_url = "https://api.fortnitetracker.com/v1/profile"

function FortniteAPI(options){
    this.api_key = options.api_key;
    this.platform = options.platform;
    this.url = base_url + "/" + this.platform + "/";
}

/**
 * Queries the fortnite tracker website and returns the raw response
 * so I don't have to write a function for each individual use case.
 * @param {*} epic_nickname 
 * @returns The raw JSON data returned by the request
 */
FortniteAPI.prototype.getData = function(epic_nickname){
    var options = this.getOptions(epic_nickname);
    return new Promise(function(resolve,reject){
        req(options,function(err,res,body){
            if(!err && res.statusCode == 200){
                resolve(JSON.parse(body));
            }
        })
    })
}

/**
 * Function for grabbing information for a group of players.
 * still resolves if a player name is invalid so verifying that all of the
 * data are of the right format falls on the client
 * @param {*} name_arr an array of strings with player names
 * @returns a promise that resolves to an array of player results in the same format as getData
 */
FortniteAPI.prototype.getPlayers = function(name_arr){
    var promises = [];
    for(name of name_arr){
        promises.push(this.getData(name));
    }
    return new Promise(function(resolve,reject){
        Promise.all(promises)
        .then(function(result){
            resolve(result);
        })
        .catch(function(err){
            reject(err);
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