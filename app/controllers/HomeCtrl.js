"use strict";
app.controller("HomeCtrl", function($scope, $location, UserFactory, GroupFactory, StarFactory){

	$scope.groupActivity = [];

	$scope.groupName = "Bananas Group";

	let buildArray = [],
		titleArray = [];

	titleArray.push("Week");
	
	google.charts.load('current', {packages: ['corechart', 'bar']});
	google.charts.setOnLoadCallback(drawMaterial);

	function drawMaterial() {
	      var data = google.visualization.arrayToDataTable([
	        ['User', 'Gold', 'Silver', 'Bronze'],
	        ['Harry', 0, 1, 1],
	        ['Hermione', 1, 1, 1],
	        ['Ron', 0, 0, 1]
	      ]);

	      var materialOptions = {
	        chart: {
	          title: 'Population of Largest U.S. Cities'
	        },
	        hAxis: {
	          title: 'Total Population',
	          minValue: 0,
	        },
	        vAxis: {
	          title: 'City'
	        },
	        bars: 'horizontal'
	      };
	      var materialChart = new google.charts.Bar(document.getElementById('myBarChart'));
	      materialChart.draw(data, materialOptions);
	    }

    StarFactory.getStars()
    .then(starData => {
    	$scope.stars = starData;
    });

	GroupFactory.getGroupActivity()
	.then( groupObj => {
		$scope.groupActivity = [];
		if (typeof groupObj === "object"){
			for (var thing in groupObj){
				$scope.groupActivity.push(groupObj[thing]);
			}
		} else {
			$scope.groupActivity = groupObj;
		}
		//console.log("$scope.groupActivity", $scope.groupActivity);
		$scope.groupActivity.forEach( element => {
			//console.log("element", element);
			UserFactory.getUser(element.uid)
			.then( userData => {
				// if (userData != null){
				// console.log("userData", userData);
				// 	element.name = userData.name;
				// }

			});
			
		});
		//console.log("$scope.groupActivity", $scope.groupActivity);
	});

});