"use strict";
app.controller("NavCtrl", function($scope, $location, GroupFactory, $rootScope, UserFactory){

	GroupFactory.getGroup()
	.then( data => {
		console.log("nav data", data);
		console.log("$rootScope", $rootScope);
		$scope.Groups = data;
	});

	//UserFactory.getUser($rootScope.user.name);

});