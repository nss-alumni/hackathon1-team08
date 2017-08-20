"use strict";

app.factory("TaskFactory", function($q, $http, fbcreds, $route){

	const createTask = (newTask) => {
		return $http(`${fbcreds.databaseURL}/task/.json`, newTask)
		.then(console.log)
		.catch(console.log);
	};

	return { createTask };

});
