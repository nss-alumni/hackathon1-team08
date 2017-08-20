"use strict";
app.controller("HomeCtrl", function($rootScope, $scope, $location, UserFactory, GroupFactory, GithubFactory, TaskFactory, StarFactory){
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
            
            UserFactory.getOneUser(user).then((response)=>{
                console.log("response", response);
                let username = response.username;
                TaskFactory.getUsersTasks(user).then((response)=>{
                    TaskFactory.getTask(Object.keys(response)).then((response)=>{
                        $scope.tasks.push({'username': username, response});
                    });
                });
                GithubFactory.getGithubEvents(username).then((response)=>{
                    // console.log("github", response);
                    let githubEvents = response;
                    githubEvents.forEach((event)=>{
                         $scope.tasks.push({'github_id':event.actor.id, 'username': event.actor.login, 'github_date_create': event.created_at, 'payload': event.payload, 'public': event.public, 'repo_url':event.repo.url, 'type':event.type, 'uid':$rootScope.user.uid, 'completed':false});

                    });
                });
                let usernames = ['ZoeLeBlanc', 'Adobe-Android', 'elizawmeeks', 'jamestonkin','DominicSerranoC14'];
                usernames.forEach((user)=>{
                    GithubFactory.getGithubUser(user).then((response)=>{
                    console.log("github", response);
                    let githubEvents = response;
                    githubEvents.forEach((event)=>{
                         $scope.tasks.push({'github_id':event.actor.id, 'username': event.actor.login, 'github_date_create': event.created_at, 'payload': event.payload, 'public': event.public, 'repo_url':event.repo.url, 'type':event.type, 'uid':$rootScope.user.uid, 'completed':false});

                    });
                });
                });
                
            });

            console.log("$scope.tasks", $scope.tasks);

        });
    };
 
	// let buildArray = [],
	// 	titleArray = [];

	// titleArray.push("Week");
	
	// google.charts.load('current', {packages: ['corechart', 'bar']});
	// google.charts.setOnLoadCallback(drawMaterial);

	// function drawMaterial() {
	//       var data = google.visualization.arrayToDataTable([
	//         ['User', 'Gold', 'Silver', 'Bronze'],
	//         ['Harry', 0, 1, 1],
	//         ['Hermione', 1, 1, 1],
	//         ['Ron', 0, 0, 1]
	//       ]);

	//       var materialOptions = {
	//         chart: {
	//           title: 'Population of Largest U.S. Cities'
	//         },
	//         hAxis: {
	//           title: 'Total Population',
	//           minValue: 0,
	//         },
	//         vAxis: {
	//           title: 'City'
	//         },
	//         bars: 'horizontal'
	//       };
	//       var materialChart = new google.charts.Bar(document.getElementById('myBarChart'));
	//       materialChart.draw(data, materialOptions);
	//     }

 //    StarFactory.getStars()
 //    .then(starData => {
 //    	$scope.stars = starData;
 //    });

	// GroupFactory.getGroupActivity()
	// .then( groupObj => {
	// 	$scope.groupActivity = [];
	// 	if (typeof groupObj === "object"){
	// 		for (var thing in groupObj){
	// 			$scope.groupActivity.push(groupObj[thing]);
	// 		}
	// 	} else {
	// 		$scope.groupActivity = groupObj;
	// 	}
	// 	//console.log("$scope.groupActivity", $scope.groupActivity);
	// 	$scope.groupActivity.forEach( element => {
	// 		//console.log("element", element);
	// 		UserFactory.getUser(element.uid)
	// 		.then( userData => {
	// 			// if (userData != null){
	// 			// console.log("userData", userData);
	// 			// 	element.name = userData.name;
	// 			// }

	// 		});
			
	// 	});
	// 	//console.log("$scope.groupActivity", $scope.groupActivity);
	// });

});