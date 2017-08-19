"use strict";

app.factory("SampleFactory", function($q, $http, fbcreds, $route){

	// Add's child object to firebase
	const sampleFunction = ( childObj ) => {
		return $q( (resolve, reject) => {
			let object = JSON.stringify(childObj);
			$http.post(`${fbcreds.databaseURL}/yourPath.json`, object)
			.then( response => {
				resolve(response);
			})
			.catch( error => {
				reject(error);
			});
		});
	};


	return {
		sampleFunction
	};
    
});