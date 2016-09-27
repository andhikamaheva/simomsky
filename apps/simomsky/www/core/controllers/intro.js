'use strict';

appControllers.controller('IntroCtrl', function($rootScope, $scope, $ionicSlideBoxDelegate, $state, $ionicPlatform, $cordovaPush, $cordovaDialogs, $localstorage) {

  // Check and navigate route
  var play_intro = false;
  var is_loggedin = false;
  var have_select_market = false;

  if($localstorage.get('play_intro') != undefined) play_intro = true;
  if($localstorage.get('user') != undefined) is_loggedin = true;
  if($localstorage.get('selected_market') != undefined) have_select_market = true;
  $localstorage.clear();
  if(play_intro){
    if(is_loggedin){
      /*if(have_select_market){
        $state.go('app.home')
     } else {*/
        $state.go('app.home')
      //}
    } else {
      $state.go('intro')
    }
  }


  // Called to navigate to the main app
  $scope.startApp = function() {
    $localstorage.set('play_intro', 1);
    $state.go('login');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

  // Check if user want to play it at first
  var play = $localstorage.get('play_intro');
  if (play != undefined){
    if(play != Number(1)){
      $scope.startApp();
    }
  }

});
