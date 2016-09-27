'use strict';

appControllers.controller('LoginCtrl', function($scope, Api, $ionicPlatform, $state, $http, $ionicLoading, $ionicPopup, $localstorage, ionicMaterialInk) {

  var device = function(){
    if(ionic.Platform.isAndroid()){
      return 'android';
    }
    if(ionic.Platform.isIOS()){
      return 'ios';
    }
  }

  $scope.credentials = {
    username: null,
    password: null
    //device: device(),
    //device_token: $localstorage.get('device_token'),
   // device_token: "c044b0bd0ca14dc3734b8609b3a3f7faf46689e988d55a5c81a67a57ea677d6f",
    //role: 2
  }

  $scope.error = [];

  $scope.login = function () {
    //$ionicLoading.show({template: '<ion-spinner icon=\"ripple\"></ion-spinner> Logging in...'});
    $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
    Api.login($scope.credentials).success(function(res){
     if(res.code == 401){
       $ionicLoading.hide();
       $scope.showAlertFailed();
     }else{
      $localstorage.set('user', JSON.stringify(res));
      $ionicLoading.hide();
      console.log($localstorage.get('user'));
      $state.go('app.home');
     }
    }).error(function(res){
      $scope.credentials.password = null;
      $scope.error = res.messages;
      $ionicLoading.hide();
      $scope.showAlert();
    });
  };


  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: listError($scope.error),
    });
    alertPopup.then(function(res) {
      console.log('Sip, Mohon isi kembali form nya dengan benar!');
    });
  };

  $scope.showAlertFailed = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Login Gagal',
      template: 'Username atau password Anda salah, silahkan coba kembali',
    });
    alertPopup.then(function(res) {
      console.log('Sip, Mohon isi kembali form nya dengan benar!');
    });
  };

  var listError = function(arr){
    var html = '<ul>';
    for (var i = 0; i < arr.length; i++){
      html += '<li>' + arr[i] + '</li>';
    }
    html += '</ul>';
    return html;
  }

  ionicMaterialInk.displayEffect();

});
