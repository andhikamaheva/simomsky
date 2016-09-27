'use strict';

appControllers.controller('DoneCtrl', function($scope, $timeout, $state, $localstorage, $ionicPopup, $ionicLoading, Api, ionicMaterialInk) {

  // Init Styling
  $scope.$parent.hideHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = true;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderCart = false;
  $scope.$parent.disableDragContent(false);

  $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
  $scope.id = $localstorage.get('selected_quarter_id');
  console.log($scope.id);
  Api.getQuarterly($scope.id).success(function(res){
   $scope.result = res.data[0];
   console.log($scope.result);
    $ionicLoading.hide();
  }).error(function(res){
    $ionicLoading.hide();
  });
  // Start Functionality
  ionicMaterialInk.displayEffect();

});
