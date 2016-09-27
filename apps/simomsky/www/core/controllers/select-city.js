'use strict';

appControllers.controller('SelectCityCtrl', function($scope, $localstorage, $state, Api, $ionicLoading, ionicMaterialInk) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = false;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderCart = false;

  $scope.$parent.headerBackState = function(){
    $state.go('wizard-profile')
  };

  $scope.$parent.disableDragContent(true);

  // Start Functionality
  $scope.empty = false;
  $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
  Api.getCities().success(function(res){
    $ionicLoading.hide();
    $scope.cities = res.items;
    if($scope.cities.length == 0) $scope.empty = true;
  }).error(function(){
    $ionicLoading.hide();
  })

  $scope.selectCity = function(city){
    $localstorage.set('selected_city', JSON.stringify(city));
    $state.go('modal.select-region');
  }

  ionicMaterialInk.displayEffect();
});
