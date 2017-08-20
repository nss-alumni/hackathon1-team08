"use strict";
app.factory("GithubFactory", function($q, $http, githubcreds){
    // const GH = new GitHub();
    var getGithubUser = (userInput)=>{
        return $q((resolve,reject)=>{
            $http.get(`https://hypothes.is/api/${userInput}`, {
                headers: {
                    'Authorization': 'Bearer ' +githubcreds.Authorization
                }
            })
            .success( (getHypothesisResponse)=>{
                console.log("getHypothesisResponse", getHypothesisResponse);
                let HypothesisSearchResults = [];
                Object.keys(getHypothesisResponse).forEach((key)=>{
                    // getHypothesisResponse[key].id = key;
                    HypothesisSearchResults.push(getHypothesisResponse[key]);
                });
                resolve(HypothesisSearchResults);
            })
            .error( (getHypothesisError)=>{
                reject(getHypothesisError);
            });
        });
    };
    var getGithubEvents = (oneAnnotation)=>{
        return $q((resolve,reject)=>{
            $http.get(`https://hypothes.is/api/annotations/${oneAnnotation.id}`, {
                headers: {
                    'Authorization': 'Bearer ' +githubcreds.Authorization
                }
            })
            .success( (getHypothesisJSONResponse)=>{
                console.log("getHypothesisJSONResponse", getHypothesisJSONResponse);
                resolve(getHypothesisJSONResponse);
            })
            .error( (getHypothesisJSONError)=>{
                reject(getHypothesisJSONError);
            });
        });
    };
    return {getGithubUser, getGithubEvents};
});