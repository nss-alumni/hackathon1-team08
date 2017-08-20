"use strict";

app.controller("TaskCtrl", function($scope, isAuth){

    $scope.task = {
        id: 1,
        uid: 1234,
        title: 'First task',
        text: 'First task ever though.',
        completed: false,
        'date-start': new Date(),
        'date-end': new Date(),
    };

});
