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


	return {
		getGroupActivity
	};
    
});