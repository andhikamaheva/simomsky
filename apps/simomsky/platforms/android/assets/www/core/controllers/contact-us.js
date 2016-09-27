'use strict';

appControllers.controller('ContactUsCtrl', function($scope, $timeout, $state, $localstorage, $ionicPopup, ionicMaterialInk, $ionicSideMenuDelegate) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = true;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderCart = false;
  $scope.$parent.headerBackState = function(){
 $state.go('app.help');
  };

  $scope.$parent.disableDragContent(false);

   ionicMaterialInk.displayEffect();

});
