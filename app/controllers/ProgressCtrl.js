"use strict";

app.controller("ProgressCtrl", function ($scope, ProgressFactory, $rootScope) {
    let user = $rootScope.user;
    console.log("rootScope user", user);
    ProgressFactory.getUserStars(user)
        .then(function (result) {
            $scope.stars = result;
            console.log("stars", result);
        });
});