"use strict";
app.controller("HomeCtrl", function($rootScope, $scope, $location, UserFactory, GroupFactory, GithubFactory, TaskFactory){
    console.log("user home", $rootScope.user);
	$scope.groupActivity = [];
    // UserFactory.getUser($rootScope.user.uid).then((response)=>{
    //     console.log(response);
    // });
    $rootScope.selectedGroup = "";
    
    GroupFactory.getUserGroup('user0').then((response)=>{
        GroupFactory.getGroup(response[0]).then((response)=>{
            // console.log(response);
            $rootScope.selectedGroup = response.name;
            get_feed(response.users);
        });
        $rootScope.groups = response;
        
    });
    let get_feed = (users) =>{
        $scope.users = Object.keys(users);
        $scope.tasks = [];
        $scope.users.forEach((user)=>{
            let stored_tasks = [];
            
            UserFactory.getUser(user).then((response)=>{
                let username = response.username;
                TaskFactory.getUsersTasks(user).then((response)=>{
                    TaskFactory.getTask(Object.keys(response)).then((response)=>{
                        $scope.tasks.push({'username': username});
                    });
                });
                GithubFactory.getGithubEvents(username).then((response)=>{
                    let githubEvents = response;
                    githubEvents.forEach((event)=>{
                         $scope.tasks.push({'github_id':event.actor.id, 'username': event.actor.login, 'github_date_create': event.created_at, 'payload': event.payload, 'public': event.public, 'repo_url':event.repo.url, 'type':event.type, 'uid':$rootScope.user.uid, 'completed':false});

                    });
                });
            });

            console.log($scope.tasks);
        // if you want to be more clever...

        });
    };
    // let filterLists=(stored_tasks, github_tasks) => {
    //     var result = stored_tasks.filter(function (task1) {
    //         console.log(task1);
    //         return github_tasks.some(function (task2) {
    //             console.log(task2);
    //             return task1.github_id === task2.github_id; // return the ones with equal id
    //        });
    //     });
    //     console.log("result", result);
    //     return result;
    // };
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