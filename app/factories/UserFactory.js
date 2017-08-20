"use strict";

app.factory("UserFactory", function($q, $http, fbcreds){
    let addUser = (authData)=>{
        return $q((resolve,reject)=>{
            $http.post(`${fbcreds.databaseURL}/user.json`,
                JSON.stringify({
                    username: authData.username,
                    name: authData.name,
                    uid: authData.uid,
                    email: authData.email
                })
            )
            .then( (addUserResponse)=>{
                resolve(addUserResponse);
            })
            .catch( (addUserError)=>{
                reject(addUserError);
            });
        });
    };
    let authUser = (userId)=>{
        return $q((resolve,reject)=>{
            $http.get(`${fbcreds.databaseURL}/user.json?orderBy="uid"&equalTo="${userId}"`)
            .then((userObject)=>{
                console.log("userObject", userObject.data);
                let users = Object.values(userObject.data);
                resolve(users[0]);
            })
            .catch((getUserError)=>{
                reject(getUserError);
            });
        });
    };

    let getUser = (name)=>{
        return $q((resolve,reject)=>{
            $http.get(`${fbcreds.databaseURL}/user/.json?orderBy="name"&equalTo="${name}"`)
            .then((userObject)=>{
                let users = [];
                Object.keys(userObject).forEach( (key)=>{
                    console.log(userObject);
                    console.log(userObject[key]);
                    users.push(userObject[key]);
                });
                resolve(users[0]);
            })
            .catch((getUserError)=>{
                reject(getUserError);
            });
        });
    };
    let getOneUser = (userId)=>{
        return $q((resolve,reject)=>{
            $http.get(`${fbcreds.databaseURL}/user/${userId}.json`)
            .then((userObject)=>{
                console.log(userObject);
                let users = [];
                Object.keys(userObject).forEach( (key)=>{
                    users.push(userObject[key]);
                });
                resolve(users[0]);
            })
            .catch((getUserError)=>{
                reject(getUserError);
            });
        });
    };
    let getAllUsers = ()=>{
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/user.json`)
            .then((allUsersResponse) => {
                let users = [];
                Object.keys(allUsersResponse.data).forEach((key) => {
                    allUsersResponse.data[key].key = key;
                    users.push(allUsersResponse.data[key]);
                 });
                resolve(users);
             })
            .catch((errorResponse) => {
                reject(errorResponse);
            });
        });
    };
    return {addUser:addUser, getUser:getUser, authUser:authUser, getAllUsers:getAllUsers, getOneUser:getOneUser};
});

