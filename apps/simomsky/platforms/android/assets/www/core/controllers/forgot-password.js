'use strict';

appControllers.controller('ForgotPasswordCtrl', function($scope, Api, $state, $ionicLoading, $ionicPopup, ionicMaterialInk) {

  $scope.credentials = {
    email: null
  };

  $scope.error = '';

  $scope.forgotPassword = function(){
    $ionicLoading.show({template: 'Processing Request...'});
    Api.forgotPassword($scope.credentials).success(function(res){
      $ionicLoading.hide();
      $state.go('login');
    }).error(function(res){
      console.log(res);
      $scope.error = res.error;
      $ionicLoading.hide();
      $scope.showAlert();
    });
  }

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: $scope.error
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
