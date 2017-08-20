"use strict";

app.controller("ProgressCtrl", function ($scope, ProgressFactory, UserFactory, AuthFactory) {
    let user = AuthFactory.getUser();

   
    ProgressFactory.getUserStars(user)
    .then(function(result) {
        $scope.stars = result;
        console.log("stars", result, user);
    });
});