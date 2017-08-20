"use strict";

app.controller("TaskCtrl", function($scope, $rootScope, $location, $routeParams, $route, isAuth, TaskFactory, Task){

    // TODO remove
    $rootScope.user = {
        uid: 0
    };

    $scope.isEditing = false;
    $scope.errorMsg = null;

    $scope.task = {
        uid: '',
        title: '',
        text: '',
        completed: false,
        'date-start': moment().format('YYYY MMM DD'),
        'date-end': null,
    };

    $scope.failedValidation = () => {
        if (!$scope.task.title || !$scope.task.text) {
            return true;
        }

        return false;
    };

    $scope.createTask = () => {
        if ($scope.failedValidation()) {
            $scope.errorMsg = 'Please complete the form.';
            return;
        }

        $scope.task.uid = $rootScope.user.uid;

        TaskFactory.createTask($scope.task)
        .then((task) => {
            if (task.status === 200) {
                $location.url('/progress');
            } else {
                $scope.errorMsg = 'Something went wrong, please try again.';
            }
        });
    };

    $scope.updateTask = () => {
        if ($scope.failedValidation()) {
            $scope.errorMsg = 'Please complete the form.';
            return;
        }

        TaskFactory.updateTask($routeParams.taskId, $scope.task)
        .then((task) => {
            if (task.status === 200) {
                $location.url('/progress');
            } else {
                $scope.errorMsg = 'Something went wrong, please try again.';
            }
        })
        .catch(console.error);
    };

    // If a task exists and there is a taskId param, set editing mode to true
    if (Task !== null && $routeParams.taskId) {
        $scope.task = Task;
        $scope.isEditing = true;
    } else if (Task === null && $routeParams.taskId) {
        $location.url('/profile');
    }

});
