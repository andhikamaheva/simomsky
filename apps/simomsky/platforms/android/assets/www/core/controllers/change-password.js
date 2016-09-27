'use strict';

appControllers.controller('ChangePasswordCtrl', function($scope, $localstorage, $state, $ionicLoading, Api, $ionicPopup, ionicMaterialInk) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = true;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderCart = false;

  $scope.$parent.headerBackState = function(){
    $state.go('app.account')
  };

  $scope.$parent.disableDragContent(false);

  // Start Functionality
  $scope.credentials = {
    old_password: '',
    new_password: '',
    retype_password: ''
  };

  var credentialsCopy = angular.copy($scope.credentials);

  $scope.changePassword = function(){
    $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
    Api.changePassword($scope.credentials).success(function(data){
      $ionicLoading.hide();
      $scope.showSuccessAlert(data.sukses);
    }).error(function(data){
      $ionicLoading.hide();
      $scope.showErrorAlert(data.gagal);
    })
  }

  $scope.showSuccessAlert = function(message) {
    var alertPopup = $ionicPopup.alert({
      title: 'Sukses',
      template: message,
      okText: 'Back To Profile'
    });
    alertPopup.then(function(res) {
      $state.go('app.profile');
    });
  };

  $scope.showErrorAlert = function(message) {
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: message,
      okText: 'Ulangi lagi',
      okType: 'button-assertive'
    });
    alertPopup.then(function(res) {
      $scope.credentials = credentialsCopy;
      console.log('silahkan ulangi lagi');
    });
  };

  ionicMaterialInk.displayEffect();

});
