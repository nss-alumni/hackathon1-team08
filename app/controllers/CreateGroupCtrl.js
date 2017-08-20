"use strict";
app.controller("CreateGroupCtrl", function($scope, $location, GroupFactory, UserFactory){
	$scope.newGroup = {
		date_created: moment().format('YYYY MMM DD'),
		name: "",
		users: {}
	};

	UserFactory.getAllUsers()
	.then(data =>{
		$scope.allUsers = data;
		$scope.allUsers.forEach( element => {
			element.inNewGroup = false;
		});
		console.log("all users", $scope.allUsers);
	});

	$scope.createGroup = () =>{
		console.log("$scope.newGroup", $scope.newGroup);
		GroupFactory.createGroup($scope.newGroup);
	};

	$scope.addUserToGroup = (key, userObj) => {
		let thisUser = key;
		console.log(userObj, "userObj");
		let indexOf = $scope.allUsers.indexOf(userObj);
		$scope.allUsers[indexOf].inNewGroup = true;
		$scope.newGroup.users[thisUser] = true;
		console.log("newGroup", $scope.newGroup);
	};
	//GroupFactory.createGroup();
});