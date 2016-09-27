'use strict';

appControllers.controller('SignupCtrl', function($scope, Api, $state, $ionicLoading, $ionicPopup, ionicMaterialInk) {
  
  $scope.credentials = {
    name: null,
    username: null,
    email: null,
    phone: null,
    password: null,
    role: 2
  };
  
  $scope.error = [];
  
  $scope.register = function(){
    $ionicLoading.show({template: 'Signing up...'});
    Api.signup($scope.credentials).success(function(res){
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
      title: 'Terima Kasih',
      template: 'Anda telah terdaftar di groceria, silahkan login'
    });
    alertPopup.then(function(res) {
      console.log('Sip, Mohon isi kembali form nya dengan benar!');
      $state.go('login');
    });
      
    }).error(function(res){
      $scope.credentials.password = null;
      $scope.error = Object.keys(res.error).map(function (key) {return res.error[key][0]});
      $ionicLoading.hide();
      $scope.showAlert();
    });
  }
  
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: listError($scope.error)
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




