"use strict";

app.factory("TaskFactory", function($q, $http, fbcreds, $route){

	const getAllTasks = () => {
		return $http.get(`${fbcreds.databaseURL}/task.json`)
		.then(res => res.data);
	};

	const createTask = (newTask) => {
		return $http.post(`${fbcreds.databaseURL}/task/.json`, newTask)
		.catch(console.error);
	};

	const getTask = (taskId) => {
		return $http.get(`${fbcreds.databaseURL}/task/${taskId}.json`)
		.then(res => res.data)
		.catch(console.error);
	};

	const updateTask = (taskId, taskObj) => {
		return $http.patch(`${fbcreds.databaseURL}/task/${taskId}.json`, taskObj)
		.catch(console.error);
	};

	const toggleTaskComplete = (taskId, completed) => {
		return $http.patch(`${fbcreds.databaseURL}/task/${taskId}.json`, { completed })
		.catch(console.error);
	};

	const deleteTask = (taskId) => {
		return $http.delete(`${fbcreds.databaseURL}/task/${taskId}/.json`)
		.catch(console.error);
	};

	return { getAllTasks, createTask, getTask, updateTask, toggleTaskComplete, deleteTask };

});
