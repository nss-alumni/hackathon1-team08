"use strict";

app.factory("ProgressFactory", function ($q, $http, fbcreds, $route) {

	const getUserStars = (userId) => {
		return $q((resolve, reject) => {
			let object = JSON.stringify(userId);
			console.log(userId);
			// bronze = $http.get(`${fbcreds.databaseURL}/star.json`),
			// silver = $http.get(`${fbcreds.databaseURL}/star/0/silver.json?orderBy="uid"&equalTo="${user}"`),
			let gold = $http.get(`${fbcreds.databaseURL}/star/.json?orderBy="uid"&equalTo="${userId}"`);

			$q.all([
					gold
				])
				.then(result => {
					resolve(result);
				})
				.catch(error => {
					reject(error);
				});
		});
	};

	// ng-click that redirects to the create/edit task page
	// Drop-down for active/completed
	// Default to active
	// Check for completion to filter
	// Pull from Firebase the todo data


	// Pull from Firebase the Star object
	// For Expanded stats
	
	// const sampleFunction = (childObj) => {
	// 	return $q((resolve, reject) => {
	// 		let object = JSON.stringify(childObj);
	// 		$http.get(`${FirebaseUrl}star/${gold}.json`)
	// 			.then(response => {
	// 				resolve(response);
	// 			})
	// 			.catch(error => {
	// 				reject(error);
	// 			});
	// 	});
	// };


	return {
		getUserStars
	};

});