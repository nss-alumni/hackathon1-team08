"use strict";

app.controller("ProgressCtrl", function ($scope, ProgressFactory, $rootScope) {
    let user = $rootScope.user;
    $scope.bronzeStars = [];
    $scope.silverStars = [];
    $scope.goldStars = [];
    console.log("rootScope user", user);
    ProgressFactory.getUserStars(user)
        .then(function (result) {
            $scope.stars = Object.values(result.data);
            console.log("stars scope!", $scope.stars);
            $scope.stars.forEach(function(el) {
                console.log("el?", el);
                if (el.gold === 1) {
                   $scope.goldStars.push(el);
                } if (el.silver === 1) {
                    $scope.silverStars.push(el);
                } if (el.bronze === 1) {
                    $scope.bronzeStars.push(el);
                } 
            });
            console.log("stars", result);

            console.log("Gold Stars", $scope.goldStars);
        });
});