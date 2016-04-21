angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

	.state('home2', {
    url: '/home2',
    templateUrl: 'gui/home.html',
    controller: 'LocationController'
  })
  .state('addtrack2', {
    url: '/setting2',
    templateUrl: 'gui/addtrack.html',
    controller: 'AddTrackerController'
  })
  .state('entered2', {
    url: '/entered2',
    templateUrl: 'gui/entered.html',
     controller: 'RegisterController'
  })
  .state('follower2', {
    url: '/follower2',
    templateUrl: 'gui/follower.html',
    controller: 'TrackerController'
  })

  .state('following2', {
    url: '/following2',
    templateUrl: 'gui/following.html',
    controller: 'TrackedController'
  })
  .state('forgopass2', {
    url: '/forgopass2',
    templateUrl: 'gui/forgopass.html'
  })

  .state('signin2', {
    url: '/signin2',
    templateUrl: 'gui/signin.html',
     controller: 'RegisterController'
  })

  .state('signup2', {
    url: '/signup2',
    templateUrl: 'gui/signup.html',
    controller: 'RegisterController'
  })

  .state('test2', {
    url: '/test2',
    templateUrl: 'gui/test.html'
  })

  .state('map2', {
    url: '/map2',
    templateUrl: 'gui/map.html',
    controller: 'MapCtrl'

  })


//yang betul
  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'LocationController'
  })
  .state('addtrack', {
    url: '/addtrack',
    templateUrl: 'templates/addtrack.html',
    controller: 'AddTrackerController'
  })
  .state('entered', {
    url: '/entered',
    templateUrl: 'templates/entered.html',
     controller: 'HomeController'
  })
  .state('follower', {
    url: '/follower',
    templateUrl: 'templates/follower.html',
    controller: 'TrackerController'
  })

  .state('following', {
    url: '/following',
    templateUrl: 'templates/following.html',
    controller: 'TrackedController'
  })
  .state('forgopass', {
    url: '/forgopass',
    templateUrl: 'templates/forgopass.html'
  })

  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
     controller: 'RegisterController'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'RegisterController'
  })

  .state('setting', {
    url: '/setting',
    templateUrl: 'templates/settings.html',
    controller: 'SettingController'
  })

  .state('test', {
    url: '/test',
    templateUrl: 'templates/test.html'
  })

  .state('map', {
    url: '/map',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl'

  })



  $urlRouterProvider.otherwise('/')
});

