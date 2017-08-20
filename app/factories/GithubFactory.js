"use strict";
app.factory("GithubFactory", function($q, $http, $rootScope){
    var getGithubUser = (username)=>{
        return $q((resolve,reject)=>{
            $http.get(`https://api.github.com/users/${username}/events`, {
                headers: {
                    'Authorization': 'token ' + $rootScope.token
                }
            })
            .then( (getGithubResponse)=>{
                console.log("getGithubResponse", getGithubResponse);
                resolve(getGithubResponse.data);
            })
            .catch( (getHypothesisError)=>{
                reject(getHypothesisError);
            });
        });
    };
    var getGithubEvents = (username)=>{
        return $q((resolve,reject)=>{
             $http.get(`https://api.github.com/users/${username}/events/public`, {
                headers: {
                    'Authorization': 'token ' + $rootScope.token
                }
            })
            .then( (getGithubResponse)=>{
                console.log("getGithubResponse", getGithubResponse);
                resolve(getGithubResponse.data);
            })
            .catch( (getHypothesisError)=>{
                reject(getHypothesisError);
            });
        });
    };
    return {getGithubUser, getGithubEvents};
});