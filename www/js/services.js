angular.module('starter.services', [])

//Save session
.factory('SessionStorage', function(){

  return{

    getSession: function(key) {
      var data = sessionStorage.getItem(key);
      console.log("Data "+ key + " dalam get session :" + data);
      if(data){
        return data;
              }
      console.log("Error : " );
     
      },

    setSession: function(key, data){
      sessionStorage.setItem(key, data);
      console.log("Data "+ key + " utk set dalam SessionStorage: "+ data);
      },

    removeSession: function(key) {
      sessionStorage.removeItem(key);
    console.log("Data dalam get session utk dah kena remove");
      }
   
  }
})

//Functions for track table
.factory('trackServices', function($http, SessionStorage) {
    
    var baseUrl = 'http://fyproject.site88.net/api/';
  //  var userId2 = sessionStorage.getItem("key");
    //console.log("User Id manual utk show track22 "+ userId2);
    var userId = SessionStorage.getSession("userId");
    console.log("User Id utk show tracks "+ userId);
   
    return {

        getTracked: function (){
            return $http.get(baseUrl+'getTracked.php?userId='+userId); 
        },

        //To get list of our tracker (Who track us?)
		    getTracker: function (){
            return $http.get(baseUrl+'getTracker.php?userId='+userId); 
        },

        //To add tracker 
        addTracker: function (track,register){
        userId = SessionStorage.getSession("userId");
            return $http.get(baseUrl+'addTracker2.php?userId='+userId+'&name='+register.name);
        },

        //To delete tracked person
        deleteTracked: function  (track){
        userId = SessionStorage.getSession("userId");
        console.log("User Id : "+ userId +" untuk delete tracked "+track.name );
            return $http.get(baseUrl+'deleteTracked2.php?userId='+userId+'&deletedId='+track.trackedId);
        },

        //To delete tracker person
        deleteTracker: function  (track){
        userId = SessionStorage.getSession("userId");
        console.log("User Id "+ userId +" untuk delete tracker "+track.name );
            return $http.get(baseUrl+'deleteTracker2.php?userId='+userId+'&deletedId='+track.trackerId);
        },

        //To delete all tracked person
        deleteAllTracked: function  (){
        userId = SessionStorage.getSession("userId");
        console.log("User Id utk delete "+ userId );
            return $http.get(baseUrl+'deleteAllTracked.php?userId='+userId);
        },

        //To delete all tracker person
        deleteAllTracker: function  (){
        userId = SessionStorage.getSession("userId");
        console.log("User Id utk delete "+ userId );
            return $http.get(baseUrl+'deleteAllTracker.php?userId='+userId);
        },

        //To delete all tracker person
        showNoOfTracked: function  (){
        userId = SessionStorage.getSession("userId");
        console.log("User Id utk delete "+ userId );
            return $http.get(baseUrl+'showNoOfTracked.php?userId='+userId);
        },

        //To delete all tracker person
        showNoOfTracker: function  (){
        userId = SessionStorage.getSession("userId");
        console.log("User Id utk delete "+ userId );
            return $http.get(baseUrl+'showNoOfTracker.php?userId='+userId);
        }

    };
})

//Functions for location table
.factory('locationServices', function($http, SessionStorage) {
    var baseUrl = 'http://fyproject.site88.net/api/';
    var userId = SessionStorage.getSession("userId");
    console.log("User Id utk show location "+ userId);

    return {

        //Tak guna
        //To save the user's location for the first time 
        addLocation: function (location){
             return $http.get(baseUrl+'addLocation.php?userId='+location.userId+'&lat='+location.lat+'&lng='+location.lng); 
           
        },

        //To update the user's location for both
        updateLocation: function (location){
            return $http.get(baseUrl+'updateLocation.php?userId='+location.userId+'&lat='+location.lat+'&lng='+location.lng); 
        },

        //To update the user's location for both
        getMyLocation: function (location){
        userId = SessionStorage.getSession("userId");
        console.log("User Id utk show location sendiri "+ userId );
            return $http.get(baseUrl+'getMyLocation.php?userId='+location.userId); 
        }

    };
})

//Functions for register table
.factory('registerServices', function($http, SessionStorage) {
    var baseUrl = 'http://fyproject.site88.net/api/';
    var userId = SessionStorage.getSession("userId");
    console.log("User Id utk show registerServices "+ userId);


    return {

        //To add user 
        addUser: function (register){
            return $http.get(baseUrl+'signUp.php?name='+register.name+'&email='+register.email+'&password='+register.password);
        },

        //User login 
        loginUser: function (register){
            return $http.get(baseUrl+'signIn.php?name='+register.name+'&password='+register.password);
        },

        //User login 
        showUsername: function (){
          userId = SessionStorage.getSession("userId");
          console.log("User Id "+ userId +" untuk showUsername ");
            return $http.get(baseUrl+'showEmail.php?userId='+userId);
        },

        //User login 
        showEmail: function (){
          userId = SessionStorage.getSession("userId");
          console.log("User Id "+ userId +" untuk showEmail ");
            return $http.get(baseUrl+'showEmail.php?userId='+userId);
        },

        //User login 
        getUserDetail: function (){
          userId = SessionStorage.getSession("userId");
          console.log("User Id "+ userId +" untuk showEmail ");
            return $http.get(baseUrl+'getUserDetail.php?userId='+userId);
        },

        //User login 
        updateEmail: function (){
          userId = SessionStorage.getSession("userId");
          console.log("User Id "+ userId +" untuk showUsername ");
            return $http.get(baseUrl+'updateEmail.php?userId='+userId);
        },

        //User login 
        updateUsername: function (){
          userId = SessionStorage.getSession("userId");
          console.log("User Id "+ userId +" untuk showEmail ");
            return $http.get(baseUrl+'updateUsername.php?userId='+userId);
        },

        //User login 
        updatePassword: function (){
          userId = SessionStorage.getSession("userId");
          console.log("User Id "+ userId +" untuk showEmail ");
            return $http.get(baseUrl+'updatePassword.php?userId='+userId);
        }

    };
})

//To get location of user to put markers
.factory('Markers', function($http, SessionStorage) {

  var markers = [];

  return {
    getMarkers: function(){
      
    var userId = SessionStorage.getSession("userId");
    console.log("User Id utk show markers "+ userId);

      return $http.get("http://fyproject.site88.net/api/markers.php?userId="+userId).then(function(response)
            {
            markers = response;
            return markers;
            });
          }
        }
})

//Create map
.factory('GoogleMaps', function($cordovaGeolocation, Markers, locationServices, SessionStorage){

  var apiKey = false;
  var map = null;
  

  function initMap(){

        var options = {timeout: 10000, enableHighAccuracy: true};

        $cordovaGeolocation.getCurrentPosition(options).then(function(position){
          
          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          console.log("Berjaya show location sekarang. Lat " + position.coords.latitude + " Long " + position.coords.longitude +". LatLng " + latLng);

          var userId = SessionStorage.getSession("userId");
          console.log("User Id utk show map sendiri "+ userId);

          //SAVE MY LOCATION. NANTI BETULKAN USERID
          location.lat=position.coords.latitude;
          location.lng=position.coords.longitude;
          location.userId=userId;
          location.timestamps=new Date();
         
          console.log("Pstu save lat "+location.lat+" lng "+location.lng+ " User Id = " + location.userId + " Timestamp :"+ location.timestamps);
          locationServices.updateLocation(location);
          
          //new google.maps.LatLng(-33.92, 151.25)
          var mapOptions = {
            center: latLng,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        here = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: image
        });

        var infoWindow = new google.maps.InfoWindow({
            content: "Saya kat sini >.< "
        });

        google.maps.event.addListener(here, 'click', function () {
            infoWindow.open(map, here);
        });
      
          //Wait until the map is loaded
          google.maps.event.addListenerOnce(map, 'idle', function(){
          //Load the markers
          loadMarkers();
          });
          }

          , function(error){
              console.log("Could not get location");
              //Load the markers
              loadMarkers();
          });

  }//end initMap


  function loadMarkers(){

      //Get all of the markers from our Markers factory
      Markers.getMarkers().then(function(markers){

        var records = markers.data.result;
        
        for (var i = 0; i < records.length; i++) {
        var record = records[i];   
        var markerPos = new google.maps.LatLng(record.lat, record.lng);

        console.log("Show the saved locations");

        //Add the markerto the map
              var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: markerPos
          });


        var infoWindowContent = "<div>" + record.name + " kat sini " + "</div>";          
        addInfoWindow(marker, infoWindowContent, record);
  
      }
      }); 

  }

  function addInfoWindow(marker, message, record) {

      var infoWindow = new google.maps.InfoWindow({
          content: message
      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
      });
      
  }

  return {
    init: function(){
      initMap();
    }
  }

})

;
