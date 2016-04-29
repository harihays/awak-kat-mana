angular.module('starter.controllers', [])

  
.run(function($rootScope, SessionStorage, $state){
        userId = SessionStorage.getSession("userId");
    
        if(userId)
          {   
            $state.go('tabsController.home');
            console.log(" Ada userId");
          }

          else
          { 
            $state.go('main');
            console.log("Tak  Ada userId");
          }

})//end run 






//Tab 1
//HOME
//Controller for HOME to show USER'S DETAIL
.controller('HomeController', function(  $cordovaGeolocation, GoogleMaps, $ionicHistory, $state, $scope, registerServices, trackServices, locationServices, $window, $ionicLoading, trackedServices, trackerServices,RefreshServices, $ionicPlatform,$location){

	$scope.showUsername = function(){
		registerServices.getUserDetail().success(function(data){
 $ionicLoading.show();
			$scope.registers = data;
 $ionicLoading.hide();
			console.log("Berjaya show username: "+ $scope.registers.name );
		});
	};

  $scope.showEmail = function(){
    registerServices.getUserDetail().success(function(data){
      $scope.registers = data;
      console.log("Berjaya show email: "+ $scope.registers.email );
    });
  };

  $scope.showNoOfTracker = function(){
    trackerServices.showNoOfTracker().success(function(data){
      $scope.trackers = data;
      console.log("No of tracker ada " + data);
    });
  };

  $scope.showNoOfTracked = function(){
    trackedServices.showNoOfTracked().success(function(data){
      $scope.trackeds = data;
      console.log("No of tracked ada " + data);
    });
  };



 $scope.Refresh = function(){
    RefreshServices.refreshPage().success(function(){
    });
  };

  $scope.doRefresh = function(){


       $scope.showUsername();
       $scope.showEmail();
       $scope.showNoOfTracker();
       $scope.showNoOfTracked();
       console.log("Berjaya refresh tracking");
         $scope.$broadcast('scroll.refreshComplete');
         $state.go($state.current, {}, {reload: true});
   }




/*  $scope.getMyLocation = function(){
    locationServices.getMyLocation().success(function(data){
      $scope.tracks = data;
      console.log("Berjaya show my location");
    });
  };*/

      console.log("Sekarang dekat " + $location.path() );
  
            //sepatutnya kat services tapi ...
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
              .getCurrentPosition(posOptions)
              .then(function (position) {
                var lat  = position.coords.latitude
                var long = position.coords.longitude

                    location.lat=position.coords.latitude;
                    location.lng=position.coords.longitude;
                    location.userId=userId;
                    location.timestamps=new Date();
                   
                    console.log("Pstu save lat "+ location.lat+" lng "+location.lng+ " User Id = "+location.userId);
                    locationServices.updateLocation(location);

              }, function(err) {
                console.log("Error");
              });

 //$ionicLoading.show();
 $ionicHistory.clearCache();
 $scope.showUsername();
 $scope.showEmail();
 $scope.showNoOfTracker();
 $scope.showNoOfTracked();
//$scope.getMyLocation();
 //$ionicLoading.hide();


})





//Tab 2
//TRACKING
//Controller for tracking. The person who we are tracking.
.controller('TrackedController', function( $scope, trackServices, $ionicPopup, $ionicLoading, trackedServices, trackerServices, RefreshServices){

  $scope.showTracked = function(){
    trackedServices.getTracked().success(function(data){
      $ionicLoading.show();
      $scope.trackeds = data;
      $ionicLoading.hide();
      console.log("Berjaya show tracked");
    });
  };

  $scope.deleteTracked = function(tracked){

                          var confirmPopup = $ionicPopup.confirm({
                             title: 'Delete Tracker',
                              template: 'Are you sure you want to remove ' + tracked.name +'?'
                           });

            confirmPopup.then(function(res) {
                  if(res) {

           
          trackedServices.deleteTracked(tracked).success(function(data){
            $scope.tracks = data;
            console.log("data " + data);
            console.log("Berjaya delete nama tracked " + tracked.name + " id kite(tracker) " +tracked.trackerId);
          });
                          $ionicPopup.alert({
                            title: 'Successfully delete!',
                            content: 'Username '+ tracked.name+ ' has been removed ' 
                          })

              console.log('You are sure');
                           } 

                  else {
             console.log('You are not sure');
                        }
         });

  };

   $scope.Refresh = function(){
    RefreshServices.refreshPage().success(function(){
    });
  };

    $scope.doRefresh = function(){
 
     $scope.showTracked();
       console.log("Berjaya refresh tracking");
         $scope.$broadcast('scroll.refreshComplete');
   }



 $scope.showTracked();

})





//Tab 3
//MAP
//Controller to display maps
.controller('MapCtrl', function($window, $scope, $state, $cordovaGeolocation, GoogleMaps, $location) {

    GoogleMaps.init();


})





//Tab 4
//TRACKER
//Controller for tracker. The person who are tracking us.
.controller('TrackerController', function($state, $scope, trackServices,$ionicPopup, $ionicLoading, trackedServices, trackerServices, RefreshServices){

  $scope.showTracker = function(){
    trackerServices.getTracker().success(function(data){
      $ionicLoading.show();
      $scope.trackers = data;
      $ionicLoading.hide();
      console.log("Berjaya show tracker");
    });

  };

  $scope.deleteTracker = function(tracker){


                          var confirmPopup = $ionicPopup.confirm({
                             title: 'Delete Tracking',
                             template: 'Are you sure you want to remove ' + tracker.name +'?'
                           });

            confirmPopup.then(function(res) {
                  if(res) {    trackerServices.deleteTracker(tracker).success(function(data){

      $scope.tracks = data;
      console.log("Berjaya delete nama tracker " + tracker.name + " id kite(tracked) " +tracker.trackedId);
    });
                     $ionicPopup.alert({
                      title: 'Successfully delete!',
                      content: 'Username '+ tracker.name+ ' has been removed ' 
                   
                    })
         $state.go($state.current, {}, {reload: true});

              console.log('You are sure');
                           } 

                  else {
             console.log('You are not sure');
                        }
         });




                     
  };

  $scope.Refresh = function(){
    RefreshServices.refreshPage().success(function(){
    });
  };

    $scope.doRefresh = function(){
 
     $scope.showTracker();
       console.log("Berjaya refresh tracking");
         $scope.$broadcast('scroll.refreshComplete');
   }

$scope.showTracker();

})





//Tab 5
//SETTINGs
//Controller for alls etting
.controller('SettingController', function($scope, $state, trackServices, registerServices, locationServices, $ionicPopup, SessionStorage, $ionicHistory, $window, $rootScope, trackedServices, trackerServices, $location) {

  $scope.deleteAllTracker = function(){

                    var confirmPopup = $ionicPopup.confirm({
                       title: 'Delete All Trackers',
                       template: 'Are you sure you want to delete all trackers?'
                     });

      confirmPopup.then(function(res) {
            if(res) {

        trackerServices.deleteAllTracker().success(function(data){
        $scope.tracks = data;
        console.log("Berjaya delete semua trackers ");});

                    $ionicPopup.alert({
                      title: 'Successfully Deleted!',
                      content: 'All trackers has been removed!' 
                    })

        console.log('You are sure');
                     } 

            else {
       console.log('You are not sure');
                  }
   });

  };

    $scope.deleteAllTracked = function(){

                    var confirmPopup = $ionicPopup.confirm({
                       title: 'Delete All Trackers',
                       template: 'Are you sure you want to delete all trackers?'
                     });

        confirmPopup.then(function(res) {
            if(res) {

        trackedServices.deleteAllTracked().success(function(data){
        $scope.tracks = data;
        console.log("Berjaya delete semua orang yg kite tracked ");});

                    $ionicPopup.alert({
                      title: 'Successfully Deleted!',
                      content: 'All tracking has been removed!' 
                    })

        console.log('You are sure');
                     } 

            else {
       console.log('You are not sure');
                  }
   });

  };

    $scope.logoutUser = function(register) {


                    var confirmPopup = $ionicPopup.confirm({
                       title: 'Log Out',
                       template: 'Are you sure you want to log out?'
                     });

        confirmPopup.then(function(res) {
            if(res) {

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
                  SessionStorage.removeSession("userSession");
                     $rootScope.userSession=0;

                  //SessionStorage.setSession("isLoggedIn",false);
                  var userId = sessionStorage.getItem("userId");
                  var username = sessionStorage.getItem("username");
                  var userSession = sessionStorage.getItem("userSession");
                    
                    //isLoggedIn = isLoggedIn;   
                    //keluar dari system 
                    $state.go('main'); 

                    //manually refresh
                    $ionicHistory.clearCache(); 
                   // $window.location.reload(true); 
                  console.log("Sepatutnya null - >id " + userId + "name " + username);


        console.log('You are sure');
                     } 

            else {
       console.log('You are not sure');
                  }
   });

            } //end logout

})

//Feedback
//Controller to send feedback
.controller('FeedbackController', function($scope,feedbackServices) {


 $scope.sendFeedback = function(feedback){
    feedbackServices.sendFeedback(feedback).success(function(data){
    $ionicLoading.show();
      $scope.feedbacks = data;
    $ionicLoading.hide();
      console.log("feedback"+ data );

                         if (data == 1) {

                    $ionicPopup.alert({
                      title: 'Successfully send!',
                      content: 'Thank you for your feedback !' 
                    })
                    $state.go('tabsController.settings'); 
                    } 

                    else {

                    $ionicPopup.alert({
                      title: 'Opss',
                      content: 'Error!'  })}




    });
  };


})

//Edit username
//Controller Edit username
.controller('EditUsernameController', function($ionicHistory,$state,$scope,registerServices,$ionicLoading,$ionicPopup) {
 
 $scope.showUsername = function(){
    registerServices.getUserDetail().success(function(data){
 $ionicLoading.show();
      $scope.registers = data;
 $ionicLoading.hide();
      console.log("Berjaya show username: "+ $scope.registers.name );
    });
  };



  $scope.updateUsername = function(register){


 

    registerServices.updateUsername(register).success(function(data){
      $ionicLoading.show();
      $scope.registers = data;
      $ionicLoading.hide();
      console.log("Berjaya update. Data : "+ data);

                   if (data == 1) {

                    $ionicPopup.alert({
                      title: 'Successfully updated!',
                      content: 'Your new username is '+ register.username+ ' !' 
                    })
                    $state.go('tabsController.settings'); 
                    } 

                    else if (data == 2) {

                    $ionicPopup.alert({
                      title: 'Opss',
                      content: 'Wrong password'  })}



                    else if (data == 0) {

                    $ionicPopup.alert({
                      title: 'Opss',
                      content: 'The username '+ register.username+ ' is already taken by others! Please try again.' 
                    })}

 });

  };

 $scope.showUsername();
})

//Change password
//Controller Change password
.controller('ChangePasswordController', function($state,$scope,registerServices,$ionicLoading,$ionicPopup) {


  $scope.updatePassword = function(register){
    registerServices.updatePassword(register).success(function(data){
      $ionicLoading.show();
      $scope.registers = data;
      $ionicLoading.hide();
      console.log("Berjaya update. Data : "+data);

                   if (data == 1) {

                    $ionicPopup.alert({
                      title: 'Successfully updated!',
                      content: 'Your password is updated!' 
                    })
                    $state.go('tabsController.settings'); 

                    } 

                    else if (data == 0) {

                    $ionicPopup.alert({
                      title: 'Opss',
                      content: 'Wrong password. The password is not updated!' 
                    })
                    $state.go('tabsController.settings'); 
                  }

                    else {

                    $ionicPopup.alert({
                      title: 'Opss',
                      content: 'Error!' 
                    })}

 });

  };


})










//ADD TRACKER
//To call the functions for trackServices FOR ADD TRACKER
.controller('AddTrackerController', function($scope, trackServices, $ionicPopup, $state, trackedServices, trackerServices,RefreshServices, $ionicLoading){

  $scope.addTracker = function(track,register){
    trackerServices.addTracker(track,register).success(function(data){
    $ionicLoading.show();

      $scope.tracks = data;
       
      console.log("Berjaya add nama tracker " + register.name );
      console.log("Berjaya add nama data " + data );
$ionicLoading.hide();
               
               if (data == 1) {

                    $ionicPopup.alert({
                      title: 'Successfully added!',
                      content: 'User '+ register.name+ ' has been added as a tracker! Add more!' 
                    })
        //  $scope.Refresh();

                    //masuk dlm system      
                 //   $state.go('tabsController.tracker');
                    } 

                else if (data == 3) {

                    $ionicPopup.alert({
                      title: 'Successfully added!',
                      content: 'User '+ register.name+ ' has been already added as a tracker before!' 
                    })

                    //masuk dlm system      
                    $state.go('tabsController.tracker');
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


   $scope.Refresh = function(){
    RefreshServices.refreshPage().success(function(){
    });
  };


})

/*//TAK GUNA
//To call the functions for locationServices
.controller('LocationController', function($scope, locationServices, trackedServices, trackerServices){

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

})*/

/*//SIGN UP & SIGN IN
//REGISTRATION
//To manage user registration sign up sign in sign out
.controller('RegisterController', function($scope, registerServices, $ionicPopup, $state, SessionStorage, locationServices, $ionicHistory, $window, $rootScope, $ionicLoading, trackedServices, trackerServices){
    
    var userId = 0;
    var username = " ";

    $scope.addUser = function(register){

        registerServices.addUser(register).success(function(data){
            $scope.registers = data;
            console.log("scope.registers " + $scope.registers);

                     if (data==1){
                      $ionicPopup.alert({
                      title: 'Registration success',
                      content: 'Hi '+  register.name+ '. Thank you for your registration. You can sign in now!'
                      })

                      $state.go('signin');

                     }

                     else if (data==2){
                      $ionicPopup.alert({
                      title: 'Opps!',
                      content: 'Hi '+  register.name+ '. Sorry, the email is already registered :('
                      })
                    }

                     else if (data==3){
                      $ionicPopup.alert({
                      title: 'Opps!',
                      content: 'Hi '+  register.name+ '. Sorry, the username is already taken :('
                      })
                    }

                     else {
                      $ionicPopup.alert({
                      title: 'Error',
                      content: 'Sorry '+  register.name+ '. Error! Please Try Again'
                      })
                    }




        });//end function data

    };//end addUser

    $scope.loginUser = function(register){
        registerServices.loginUser(register).success(function(data){
           $ionicLoading.show();
            $scope.registers = data;
            console.log("Berjaya dapat userId " + $scope.registers.userid );
            console.log("Data " + data );
$ionicLoading.hide();


        if (data==0)        
                    {
                      
                    $ionicPopup.alert({
                      title: 'Error',
                      content: 'Hi '+  register.name+ '! Wrong password. Please try again.'
                    })
                      
                    }


         else if(data==1)        
                    {
                      
                    $ionicPopup.alert({
                      title: 'Error',
                      content: 'Hi '+  register.name+ '! Your username is not registered yet'
                    })
                      
                    }

        else if (data!=0)  {

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
                   // $window.location.reload(true); 
                    
                    $state.go('home');

                    }

       
else  {
                      
                    $ionicPopup.alert({
                      title: 'Error',
                      content: 'Hi '+  register.name+ '! Please try again. Error'
                    })
                      
                    }

            
        });//function data
    };//userlogin

})//RegisterController



*/

//SIGN in 
//REGISTRATION
//To manage user registration sign up sign in sign out
.controller('SignInController', function($scope, registerServices, $ionicPopup, $state, SessionStorage, $ionicHistory, $window, $rootScope, $ionicLoading){
    
    var userId = 0;
    var username = " ";
    var userSession = " ";

    $scope.loginUser = function(register){
        registerServices.loginUser(register).success(function(data){
 $ionicLoading.show();
            $scope.registers = data;
            console.log("Berjaya dapat userId " + $scope.registers.userid );
            console.log("Data " + data );

        if (data==0)        
                    {
                    $ionicLoading.hide();
                    
                    $ionicPopup.alert({
                      title: 'Error',
                      content: 'Hi '+  register.name+ '! Wrong password. Please try again.'
                    })
                    }


         else if(data==1)        
                    {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                      title: 'Error',
                      content: 'Hi '+  register.name+ '! Your username is not registered yet'
                    })
                    }

        else if (data!=0)  {
                    $ionicLoading.hide();
                    SessionStorage.setSession("userId",$scope.registers.userid);
                    SessionStorage.setSession("username",$scope.registers.name);
                    SessionStorage.setSession("userSession",1);

                    userId = SessionStorage.getSession("userId");
                    username = SessionStorage.getSession("username");
                    userSession = SessionStorage.getSession("userSession");
                     $rootScope.userSession=1;
                    console.log("userId : " + userId);
                    console.log("username : " + username);
                    console.log("userSession : " + userSession);
                    
                    $ionicPopup.alert({
                      title: 'Successfully login!',
                      content: 'Hi '+ $scope.registers.name+ ' :) ' 
                    })

                    $state.go('tabsController.home');
                    }

       
else  {
                      
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                      title: 'Error',
                      content: 'Hi '+  register.name+ '! Please try again. Error'
                    })
                      
                    }

            
        });//function data
    };//userlogin

})//SignInController







//SIGN UP 
//REGISTRATION
//To manage user registration sign up sign in sign out
.controller('SignUpController', function($scope, registerServices, $ionicPopup, $state, SessionStorage, locationServices, $ionicHistory, $window, $rootScope, $ionicLoading, trackedServices, trackerServices){
    
    var userId = 0;
    var username = " ";

    $scope.addUser = function(register){

        registerServices.addUser(register).success(function(data){
 $ionicLoading.show();
            $scope.registers = data;
            console.log("scope.registers " + $scope.registers);

                     if (data==1){
                    $ionicLoading.hide();
                      $ionicPopup.alert({
                      title: 'Registration success',
                      content: 'Hi '+  register.name+ '. Thank you for your registration. You can sign in now!'
                      })

                      $state.go('signin');

                     }

                     else if (data==2){
                    $ionicLoading.hide();
                      $ionicPopup.alert({
                      title: 'Opps!',
                      content: 'Hi '+  register.name+ '. Sorry, the email is already registered :('
                      })
                    }

                     else if (data==3){
                    $ionicLoading.hide();
                      $ionicPopup.alert({
                      title: 'Opps!',
                      content: 'Hi '+  register.name+ '. Sorry, the username is already taken :('
                      })
                    }

                     else {
                    $ionicLoading.hide();
                      $ionicPopup.alert({
                      title: 'Error',
                      content: 'Sorry '+  register.name+ '. Error! Please Try Again'
                      })
                    }




        });//end function data

    };//end addUser

})//SignUpController







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
      console.log("Menu cont Sekarang dekat  " + $location.path() );
   
    if ($location.path() === "/page1/home" || $location.path() === "" || $location.path() === "/main") {
      navigator.app.exitApp();
      console.log("Keluar");

    }
    else {
      $ionicHistory.goBack();
      console.log("Habis2e");
    }
  }, 100);
})





//REVERSE GEO

 
.controller('getLocationCtrl', function($scope, $state, $cordovaGeolocation, LocalStorage, ReverseGeoCoder) {

  //ng-model in getLocation.html
  $scope.latitude=0;
  $scope.longitude=0;
  $scope.address='';
  $scope.map='';
  $scope.description='';

  $cordovaGeolocation
    .getCurrentPosition({
      timeout: 20000,
      maximumAge: 30000,
      enableHighAccuracy: false,

    }).then(function(results){
      $scope.latitude=results.coords.latitude;
      $scope.longitude=results.coords.longitude;
      ReverseGeoCoder
        .get(results.coords.latitude, results.coords.longitude)
        .then(function(results){
          $scope.address= results.address;
          $scope.map=results.map;
        }, function(error){
          console.log(error)
        });
    }, function(error){
      console.log('error');
    })

  $scope.saveLocation = function() {

    $scope.checkins.push({
      id: $scope.checkins.length+1,
      latitude: $scope.latitude,
      longitude: $scope.longitude,
      address: $scope.address,
      map: $scope.map,
      description: $scope.description,
    });

    LocalStorage.set('checkins', $scope.checkins);
    $state.go('listing');
  }
})
   
.controller('locationDetailsCtrl', function($scope, $stateParams) {

  $scope.checkin=$scope.checkins.filter(function(checkin){
    return checkin.id == $stateParams.id;
  }).pop();
  
  console.log($scope.checkin); //display details based on id in console
  console.log($stateParams); //display id in console

})



