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
                        console.log(response);
                        $scope.tasks.push({'username': username, response});
                    });
                });
                GithubFactory.getGithubEvents(username).then((response)=>{
                    let githubEvents = response;
                    githubEvents.forEach((event)=>{
                         $scope.tasks.push({'github_id':event.actor.id, 'username': event.actor.login, 'github_date_create': event.created_at, 'payload': event.payload, 'public': event.public, 'repo_url':event.repo.url, 'type':event.type, 'uid':$rootScope.user.uid, 'completed':false});

                    });
                });
            });

            console.log("$scope.tasks", $scope.tasks);

        });
    };
 
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