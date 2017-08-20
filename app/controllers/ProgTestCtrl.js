"use strict";

app.controller('ProgTestCtrl', function($scope, $http, fbcreds, TaskFactory) {

    $scope.tasks = [];

    $http.get(`${fbcreds.databaseURL}/task.json`)
    .then(res => {
        $scope.tasks = res.data;
    });

    $scope.completeTask = (taskId, completed) => {
        console.log("completed", completed);
        TaskFactory.toggleTaskComplete(taskId, !completed)
        .then(console.log);
    };

});
