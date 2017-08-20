"use strict";

app.factory("GroupFactory", function($q, $http, fbcreds, $route){

	// Get group's activity
	const getGroupActivity = (  ) => {
		return $q( (resolve, reject) => {
			$http.get(`${fbcreds.databaseURL}/task.json`)
			.then( groupData => {
				let group = groupData.data;
				Object.keys(group).forEach( key => {
					group[key].id = key;
				});
				resolve(group);
			})
			.catch( error => {
				reject (error);
			});
		});
	};
    let getAllGroups = ()=>{
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/group.json`)
            .then((allUsersResponse) => {
                console.log(allUsersResponse);
                // let users = [];
                // Object.keys(allUsersResponse.data).forEach((key) => {
                //     users.push(allUsersResponse.data[key]);
                //  });
                resolve(allUsersResponse);
             })
            .catch((errorResponse) => {
                reject(errorResponse);
            });
        });
    };
    // let addUserGroup  = (userId, groupName)=>{
    //     return $q((resolve, reject) => {
    //         $http.put(`${fbcreds.databaseURL}/group/user/${userId}.json"`,
    //             JSON.stringify({
    //                 group:{ 
    //                     groupName: true
    //                 }
    //             })
    //         )
    //         .then((allUsersResponse) => {
    //             console.log(allUsersResponse);
    //             // let users = [];
    //             // Object.keys(allUsersResponse.data).forEach((key) => {
    //             //     users.push(allUsersResponse.data[key]);
    //             //  });
    //             resolve(allUsersResponse);
    //          })
    //         .catch((errorResponse) => {
    //             reject(errorResponse);
    //         });
    //     });
    // };
    let getUserGroup  = (userId)=>{
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/user/${userId}/groups.json`)
            .then((allUsersResponse) => {
                let groups = [];
                Object.keys(allUsersResponse.data).forEach((key)=>{
                    groups.push(key);
                });
                console.log(groups);
                resolve(groups);
             })
            .catch((errorResponse) => {
                reject(errorResponse);
            });
        });
    };
    let getAllUsersGroup = (groupId)=>{
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/group/${groupId}/users.json`)
            .then((allUsersResponse) => {
                console.log(allUsersResponse);
                let users = [];
                Object.keys(allUsersResponse.data).forEach((key) => {
                    users.push(key);
                 });
                console.log(users);
                resolve(users);
             })
            .catch((errorResponse) => {
                reject(errorResponse);
            });
        });
    };
	return {
		getGroupActivity, getAllUsersGroup, getUserGroup
	};
    
});