"use strict";
app.controller("HomeCtrl", function($rootScope, $scope, $location, UserFactory, GroupFactory, GithubFactory){
    console.log("user home", $rootScope.user);
	$scope.groupActivity = [];
    // UserFactory.getUser($rootScope.user.uid).then((response)=>{
    //     console.log(response);
    // });
	$scope.groupName = "Bananas Group";
    GroupFactory.getUserGroup('user0').then((response)=>{
        // console.log(response);
        let groups = response;
        groups.forEach((group)=>{
            GroupFactory.getAllUsersGroup(group).then((response)=>{
                $scope.users = response;
                $scope.users.forEach((user)=>{
                    console.log(user);
                    UserFactory.getUser(user).then((response)=>{
                        let user = response.username;
                        GithubFactory.getGithubEvents(user).then((response)=>{
                            console.log(response);
                        });
                    });
                });
                
            });
        });
        
    });
 //    GithubFactory.getGithubUser('ZoeLeBlanc').then( (response)=>{
 //        console.log(response);
 //    });
 //    GroupFactory.getAllUsersGroup("group0").then((response)=>{
 //        console.log(response);
 //    });
 //    UserFactory.getAllUsers().then((response)=>{
 //        console.log(response);
 //        let all_users = response;
 //        all_users.forEach((name)=>{
 //            GithubFactory.getGithubEvents(name.username).then((response)=>{
 //                console.log(response);
 //            });
 //        });
 //    });
	// GroupFactory.getGroupActivity()
	// .then( groupObj => {
	// 	$scope.groupActivity = groupObj;
	// 	$scope.groupActivity.forEach( element => {
	// 		//console.log("element", element);
	// 		UserFactory.getUser(element.uid)
	// 		.then( userData => {
	// 			element.name = userData.name;
	// 		});
			
	// 	});
	// 	console.log("$scope.groupActivity", $scope.groupActivity);
	// });

});