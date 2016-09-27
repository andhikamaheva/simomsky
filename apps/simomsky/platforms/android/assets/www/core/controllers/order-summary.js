'use strict';

appControllers.controller('OrderSummaryCtrl', function($scope, $localstorage, $state, $ionicLoading, Api, $ionicModal, ionicMaterialInk) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = true;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderCart = false;


  $scope.$parent.headerBackState = function(){
   $state.go('modal.shipping');
  };

  $scope.$parent.disableDragContent(false);

  // Start Functionality
  $scope.order = JSON.parse($localstorage.get('order'));
  console.log($scope.order);
  //$ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
  //$ionicLoading.hide();
  $scope.proceed = function(){
      $state.go('modal.payment');
  }
  ionicMaterialInk.displayEffect();

});
