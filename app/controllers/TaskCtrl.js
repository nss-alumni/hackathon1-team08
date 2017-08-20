"use strict";

app.controller("TaskCtrl", function($scope, isAuth, TaskFactory){

    $scope.isEditing = false;
    $scope.errorMsg = null;

    $scope.task = {
        uid: isAuth,
        title: '',
        text: '',
        completed: false,
        // 'date-start': window.moment().format('YYYY MMM DD'),
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


    };

});
