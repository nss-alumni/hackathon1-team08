"use strict";

app.factory("StarFactory", function($q, $http, fbcreds, $route){

	// Get group's activity
	const getStars = () => {
		return $q( (resolve, reject) => {
			$http.get(`${fbcreds.databaseURL}/star.json`)
			.then( starData => {
				let stars = starData.data;
				Object.keys(stars).forEach( key => {
					stars[key].id = key;
				});
				resolve(stars);
			})
			.catch( error => {
				reject (error);
			});
		});
	};


	return {
		getStars
	};
    
});