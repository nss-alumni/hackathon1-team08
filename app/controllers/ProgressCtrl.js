"use strict";

app.controller("ProgressCtrl", function ($scope, ProgressFactory, $rootScope, TaskFactory, fbcreds, $http) {
    // TODO remove
    // $rootScope.user = {
    //     uid: 0
    // };

    let user = $rootScope.user;
    $scope.bronzeStars = [];
    $scope.silverStars = [];
    $scope.goldStars = [];

    ProgressFactory.getUserStars(user)
        .then(function (result) {
            $scope.stars = Object.values(result.data);

            $scope.stars.forEach(function(el) {
                if (el.gold === 1) {
                   $scope.goldStars.push(el);
                } if (el.silver === 1) {
                    $scope.silverStars.push(el);
                } if (el.bronze === 1) {
                    $scope.bronzeStars.push(el);
                }
            });
        });

    TaskFactory.getAllTasks()
    .then(tasks => {
        $scope.tasks = tasks;
    });

    $scope.completeTask = (taskId, taskObj) => {
        // console.log("completed", completed);
        TaskFactory.toggleTaskComplete(taskId, !taskObj.completed)
        .then(res => {
            if (taskObj.completed === true) {
                Materialize.toast(`${taskObj.title.toUpperCase()} was completed!`, 2000);
            } else if (taskObj.completed === false) {
                Materialize.toast(`${taskObj.title.toUpperCase()} was undone.`, 2000);
            }
        })
        .catch(console.error);
    };

    $scope.deleteTask = (taskId, taskObj) => {
        TaskFactory.deleteTask(taskId)
        .then(res => {
            if (res.status === 200) {
                delete $scope.tasks[taskId];
                Materialize.toast(`${taskObj.title.toUpperCase()} was deleted!`, 2000);
            }
        })
        .catch(console.error);
    };

});
