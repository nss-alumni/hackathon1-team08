"use strict";
app.controller("HomeCtrl", function($scope, $location, UserFactory, GroupFactory){

	$scope.groupActivity = [];

	$scope.groupName = "Bananas Group";

	GroupFactory.getGroupActivity()
	.then( groupObj => {
		$scope.groupActivity = groupObj;
		$scope.groupActivity.forEach( element => {
			//console.log("element", element);
			UserFactory.getUser(element.uid)
			.then( userData => {
				element.name = userData.name;
			});
			
		});
		console.log("$scope.groupActivity", $scope.groupActivity);
	});

});