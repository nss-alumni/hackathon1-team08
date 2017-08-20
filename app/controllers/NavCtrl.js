"use strict";
app.controller("NavCtrl", function($scope, $location){
    $scope.navItems = [
    {
        name:"Logout", 
        url:"#/logout"
    },
    {
        name:"Home", 
        url:"#/home"
    },
    {
        name:"Progress", 
        url:"#/progress"
    }
];
});