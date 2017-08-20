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

	// Get group's activity
	const getGroup = (  ) => {
		return $q( (resolve, reject) => {
			$http.get(`${fbcreds.databaseURL}/group.json`)
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

	// Add's group's object to firebase
	const createGroup = ( groupObj ) => {
		return $q( (resolve, reject) => {
			let object = JSON.stringify(groupObj);
			$http.post(`${fbcreds.databaseURL}/group.json`, object)
			.then( response => {
				resolve(response);
			})
			.catch( error => {
				reject(error);
			});
		});
	};

	return {
		getGroupActivity, createGroup, getGroup
	};
    
});