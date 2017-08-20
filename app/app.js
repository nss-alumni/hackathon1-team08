"use strict";

const app = angular.module("CodeStars", ["ngRoute", 'ui.materialize']);

let isAuth = (AuthFactory)=>{
  new Promise( (resolve, reject)=>{
    if (AuthFactory.isAuthenticated()){
      resolve();
    } else {
      reject();
    }
  });
};

app.run(($rootScope, $location, AuthFactory, fbcreds)=>{
   let cred = fbcreds;
   let authConfig = {
    apiKey: cred.apiKey,
    authDomain: cred.authDomain,
    databaseURL: cred.databaseUrl
   };

   firebase.initializeApp(authConfig);
   $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
    let logged = AuthFactory.isAuthenticated();
    let appTo;
    if (currRoute.originalPath){
      appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    }
    console.log("appTo", appTo);
    if(!appTo && !logged){
      event.preventDefault();
      $location.path('/auth');
    }
  });
});

app.config( $routeProvider => {
  $routeProvider
  .when("/", {
        templateUrl: "partials/sample.html",
        controller: "SampleCtrl"
    })
  .when('/', {
      templateUrl: 'partials/auth.html',
      controller: 'AuthCtrl'
    })
  .otherwise('/');
});