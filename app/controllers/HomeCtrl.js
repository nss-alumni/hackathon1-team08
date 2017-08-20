"use strict";
app.controller("HomeCtrl", function($scope, $location, UserFactory, GroupFactory){
	//set user
	let user = UserFactory.getUser();

	$scope.activity = {};

	GroupFactory.getGroupActivity()
	.then( groupObj => {
		$scope.groupActivity = groupObj;
		console.log("$scope.groupActivity", $scope.groupActivity);
	});

});