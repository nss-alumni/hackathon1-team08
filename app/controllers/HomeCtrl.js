"use strict";
app.controller("HomeCtrl", function($rootScope, $scope, $location, UserFactory, GroupFactory, GithubFactory){
    console.log("user home", $rootScope.user);
    GithubFactory.authGithub().then((response)=>{
        console.log(response);
    });
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