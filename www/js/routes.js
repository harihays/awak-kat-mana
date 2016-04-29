angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

//Tab Menu
  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

//Tab 1
    .state('tabsController.home', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      }
    }
  })

//Tab 2
  .state('tabsController.tracking', {
    url: '/tracking',
    views: {
      'tab2': {
        templateUrl: 'templates/tracking.html',
        controller: 'TrackedController'
      }
    }
  })

//Tab 3
  .state('tabsController.map', {
    url: '/map',
    views: {
      'tab3': {
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
      }
    }
  })

//Tab 4
  .state('tabsController.tracker', {
    url: '/tracker',
    views: {
      'tab6': {
        templateUrl: 'templates/tracker.html',
        controller: 'TrackerController'
      }
    }
  })

//Tab 5
  .state('tabsController.settings', {
    url: '/settings',
    views: {
      'tab7': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingController'
      }
    }
  })

//Sign Up
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignUpController'
  })

//Sign In
  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'SignInController'
  })

//Forgot Password
  .state('forgopass', {
    url: '/forgopass',
    templateUrl: 'templates/forgopass.html'
  })

//Main
  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html'
  })

//Add Tracker
  .state('addtrack', {
    url: '/addtrack',
    templateUrl: 'templates/addtrack.html',
    controller: 'AddTrackerController'
  })

//About Us
.state('aboutus', {
    url: '/aboutus',
    templateUrl: 'templates/aboutus.html'
  })

//Change Password
.state('changepass', {
    url: '/changepass',
    templateUrl: 'templates/changepass.html',
    controller: 'ChangePasswordController'
  })

//Change Username
.state('changeuname', {
    url: '/changeuname',
    templateUrl: 'templates/changeuname.html',
    controller: 'EditUsernameController'
  })

//Feedback
.state('feedback', {
    url: '/feedback',
    templateUrl: 'templates/feedback.html',
    controller: 'FeedbackController'
  })

//Help
.state('help', {
    url: '/help',
    templateUrl: 'templates/help.html'
  })

//Privacy
.state('privacy', {
    url: '/privacy',
    templateUrl: 'templates/privacy.html'
  })




/*  .state('getLocation', {
    url: '/getLocation',
    templateUrl: 'templates/getLocation.html',
    controller: 'getLocationCtrl'
  })

  .state('locationDetails', {
    url: '/details/:id',
    templateUrl: 'templates/locationDetails.html',
    controller: 'locationDetailsCtrl'
  })


  */

$ionicConfigProvider.tabs.position('bottom');

});

