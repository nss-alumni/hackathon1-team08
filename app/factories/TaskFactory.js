"use strict";

app.factory("TaskFactory", function($q, $http, fbcreds, $route){

	const createTask = (newTask) => {
		return $http.post(`${fbcreds.databaseURL}/task/.json`, newTask)
		.catch(console.error);
	};

	const getTask = (taskId) => {
		return $http.get(`${fbcreds.databaseURL}/task/${taskId}.json`)
		.then(res => res.data)
		.catch(console.error);
	};

	return { createTask, getTask };

});
