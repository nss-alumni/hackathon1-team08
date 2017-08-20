"use strict";
// import GitHub from 'github-api';
const app = angular.module("CodeStars", ["ngRoute", 'ui.materialize']);

let isAuth = (AuthFactory)=>{
  new Promise( (resolve, reject)=>{
    if (AuthFactory.isAuthenticated()){
      resolve();
    } else {
      reject();
    }
  })
  .catch((err) => console.log('isAuth', err));
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
      appTo = currRoute.originalPath.indexOf('/') !== -1;
    }
    console.log("appTo", appTo);
    if(!appTo && !logged){
      event.preventDefault();
      $location.path('/');
    }
  });
});

app.config( $routeProvider => {
  $routeProvider
  // .when("/", {
  //       templateUrl: "partials/sample.html",
  //       controller: "SampleCtrl"
  //   })
  .when('/', {
      templateUrl: 'partials/auth.html',
      controller: 'AuthCtrl'
    })
  .when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl',
    resolve: {isAuth}
  })
  .when('/task/create', {
    templateUrl: 'partials/task.html',
    controller: 'TaskCtrl',
    resolve: {
        isAuth,

        Task: function(TaskFactory, $route) {
            return TaskFactory.getTask($route.current.params.taskId);
        }
    }
  })
  .when('/task/:taskId', {
    templateUrl: 'partials/task.html',
    controller: 'TaskCtrl',
    resolve: {
        isAuth,

        Task: function(TaskFactory, $route) {
            return TaskFactory.getTask($route.current.params.taskId);
        }
    }
  })
  .otherwise('/');
});
