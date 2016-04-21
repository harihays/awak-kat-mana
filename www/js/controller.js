angular.module('starter.controllers', [])

//TAK BUAT LAGI
//1
//To call the functions for HOME PAGE to show USER'S DETAIL
.controller('HomeController', function($scope, registerServices, trackServices, locationServices, $window){

	$scope.showUsername = function(){
		registerServices.getUserDetail().success(function(data){
			$scope.registers = data;
			console.log("Berjaya show username"+ $scope.registers.name );
		});
	};

  $scope.showEmail = function(){
    registerServices.getUserDetail().success(function(data){
      $scope.registers = data;
      console.log("Berjaya show email"+ $scope.registers.email );
    });
  };

  $scope.showNoOfTracker = function(){
    trackServices.showNoOfTracker().success(function(data){
      $scope.trackers = data;
      console.log("Berjaya show no of tracker " + data);
    });
  };

  $scope.showNoOfTracked = function(){
    trackServices.showNoOfTracked().success(function(data){
      $scope.trackeds = data;
      console.log("Berjaya show tracked " + data);
    });
  };

 $scope.Refresh = function(){
    $window.location.reload(true); 
  };
                   


/*  $scope.getMyLocation = function(){
    locationServices.getMyLocation().success(function(data){
      $scope.tracks = data;
      console.log("Berjaya show my location");
    });
  };*/

 $scope.showUsername();
 $scope.showEmail();
 $scope.showNoOfTracker();
 $scope.showNoOfTracked();
 //$scope.getMyLocation();

})

//2
//To call the functions for trackServices FOR TRACKED PERSON
.controller('TrackedController', function($scope, trackServices, $ionicPopup){

  $scope.showTracked = function(){
    trackServices.getTracked().success(function(data){
      $scope.trackeds = data;
      console.log("Berjaya show tracked");
    });
  };

  $scope.deleteTracked = function(tracked){
    trackServices.deleteTracked(tracked).success(function(data){
      $scope.tracks = data;
      console.log("data " + data);
      console.log("Berjaya delete nama tracked " + tracked.name + " id kite(tracker) " +tracked.trackerId);
    });
                    $ionicPopup.alert({
                      title: 'Successfully delete!',
                      content: 'Username '+ tracked.name+ ' has been removed ' 
                    })

  };

$scope.showTracked();

})

//3
//To call the functions for trackServices FOR THE TRACKER
.controller('TrackerController', function($scope, trackServices,$ionicPopup){

  $scope.showTracker = function(){
    trackServices.getTracker().success(function(data){
      $scope.trackers = data;
      console.log("Berjaya show tracker");
    });
  };

  $scope.deleteTracker = function(tracker){
    trackServices.deleteTracker(tracker).success(function(data){
      $scope.tracks = data;
      console.log("Berjaya delete nama tracker " + tracker.name + " id kite(tracked) " +tracker.trackedId);
    });
                     $ionicPopup.alert({
                      title: 'Successfully delete!',
                      content: 'Username '+ tracker.name+ ' has been removed ' 
                    })

  };

$scope.showTracker();

})

//7
//ADD TRACKER
//To call the functions for trackServices FOR ADD TRACKER
.controller('AddTrackerController', function($scope, trackServices, $ionicPopup, $state){

  $scope.addTracker = function(track,register){
    trackServices.addTracker(track,register).success(function(data){
      $scope.tracks = data;
      console.log("Berjaya add nama tracker " + register.name );
      console.log("Berjaya add nama data " + data );

               if (data == 1) {

                    $ionicPopup.alert({
                      title: 'Successfully added!',
                      content: 'User '+ register.name+ ' has been added as a tracker!' 
                    })

                    //masuk dlm system      
                    $state.go('follower');
                    } 

              else
                    { 
                    $ionicPopup.alert({
                      title: 'Error',
                      content: 'Sorry the username '+ register.name +' does not exists.'
                    })
                    }


    });
  };

})

//TAK GUNA
//To call the functions for locationServices
.controller('LocationController', function($scope, locationServices){

//TAK GUNA
//waktu sign up dia save
	$scope.addLocation = function(location){
		console.log("Berjaya add " + location.userId +" lat= "+location.lat+" lng= "+location.lng+" TIMESTAMP "+location.timestamps);
		locationServices.addLocation(location).success(function(data){
			$scope.locations = data;
		});
	};

//waktu signin dia update
	$scope.updateLocation = function(location){
		console.log("Berjaya update " + location.userId +" lat= "+location.lat+" lng= "+location.lng+" TIMESTAMP "+location.timestamps);
		locationServices.updateLocation(location).success(function(data){
			$scope.locations = data;
      console.log(data);
      
		});
	};

})

//6
//REGISTRATION
//To manage user registration sign up sign in sign out
.controller('RegisterController', function($scope, registerServices, $ionicPopup, $state, SessionStorage, locationServices, $ionicHistory, $window, $rootScope){
    
    var userId = 0;
    var username = " ";

    $scope.addUser = function(register){
        registerServices.addUser(register).success(function(data){
            $scope.registers = data;
            console.log("scope.registers " + $scope.registers);

                    $ionicPopup.alert({
                      title: 'Registration',
                      content: $scope.registers,
                    })

                    $state.go('signin');


        });//end function data

    };//end addUser

    $scope.loginUser = function(register){
        registerServices.loginUser(register).success(function(data){
            $scope.registers = data;
            console.log("Berjaya dapat userId " + $scope.registers.userid );
            console.log("Data " + data );

        if (data!=0) {

                    SessionStorage.setSession("userId",$scope.registers.userid);
                    SessionStorage.setSession("username",$scope.registers.name);
                   // SessionStorage.setSession("isLoggedIn",true);
                    userId = SessionStorage.getSession("userId");
                    username = SessionStorage.getSession("username");
                    console.log("userId : " + userId);
                    console.log("username : " + username);
                    
                    $ionicPopup.alert({
                      title: 'Successfully login!',
                      content: 'Hi '+ $scope.registers.name+ ' :) ' 
                    })

                    //$rootScope.isLoggedIn = true;
                    //masuk dlm system   
                    //$rootScope.isLoggedIn = sessionStorage.getItem("isLoggedIn");
                    $state.go('entered');

                    }

        else        
                    {
                      
                    $ionicPopup.alert({
                      title: 'Error',
                      content: 'Hi '+  register.name+ '! Wrong password. Please try again.'
                    })
                      
                    }
            
        });//function data
    };//userlogin

})//RegisterController

//4
//Map Controller
.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, GoogleMaps, $location) {

    GoogleMaps.init();

})

//5
//Setting Controller
.controller('SettingController', function($scope, $state, trackServices, registerServices, locationServices, $ionicPopup, SessionStorage, $ionicHistory, $window, $rootScope) {

  $scope.deleteAllTracker = function(){
    trackServices.deleteAllTracker().success(function(data){
      $scope.tracks = data;
      console.log("Berjaya delete semua trackers ");
    });

                    $ionicPopup.alert({
                      title: 'Successfully Deleted!',
                      content: 'All trackers has been deleted!' 
                    })
  };

    $scope.deleteAllTracked = function(){
    trackServices.deleteAllTracked().success(function(data){
      $scope.tracks = data;
      console.log("Berjaya delete semua orang yg kite tracked ");
    });

                    $ionicPopup.alert({
                      title: 'Successfully Deleted!',
                      content: 'All tracks has been deleted!' 
                    })
  };

    $scope.logoutUser = function(register) {
              
                  //tak keluar sbb refresh cepat sangat tp ok je
                 username =  SessionStorage.getSession("username");
                 $ionicPopup.alert({
                      title: 'Successfully logout!',
                      content: 'Bye '+ username + ' :)'
                    })
                  
                  isLoggedIn='false';
                    console.log("isLoggedIn : " + isLoggedIn);
                  SessionStorage.removeSession("userId");
                  SessionStorage.removeSession("username");
                  //SessionStorage.setSession("isLoggedIn",false);
                  var userId = sessionStorage.getItem("userId");
                  var username = sessionStorage.getItem("username");
                  var isLoggedIn = sessionStorage.getItem("isLoggedIn");
                    
                    //isLoggedIn = isLoggedIn;   
                    //keluar dari system 
                    $state.go('home'); 

                    //manually refresh
                    $ionicHistory.clearCache(); 
                    $window.location.reload(true); 
                  console.log("Sepatutnya null - >id " + userId + "name " + username);

            } //end logout

})

//taktahu, takyah guna
.controller('MainCtrl', function($scope, $ionicHistory, $ionicPlatform, $location) {

	$scope.myGoBack = function() {
	    $ionicHistory.goBack();
      console.log("Habis1");

      console.log("Kat mane dah");
      console.log($location.path());


      if ($location.path() === "/setting") {
      navigator.app.exitApp();
      console.log("Kat home dah");
      console.log($location.path());
    }
	};



})

//Dah amik yg ni utk keluar apps
.controller('MenuController', function($scope, $state, $ionicPlatform, $location, $ionicHistory) {
    $ionicPlatform.registerBackButtonAction(function() {
      console.log("Habis");
   
    if ($location.path() === "/entered" || $location.path() === "/") {
      navigator.app.exitApp();
      console.log("Keluar");

    }
    else {
      $ionicHistory.goBack();
      console.log("Habis2");
    }
  }, 100);
})
