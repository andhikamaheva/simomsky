'use strict';

appControllers.controller('SelectRegionCtrl', function($scope, $http, $localstorage, $state, Api, $ionicLoading, ionicMaterialInk) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = true;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderCart = false;

  $scope.$parent.headerBackState = function(){
    $localstorage.remove('selected_city');
    $state.go('modal.select-city')
  };

  $scope.$parent.disableDragContent(true);

  // Start Functionality
  $scope.regions = [];
  $scope.selected_city = JSON.parse($localstorage.get('selected_city'));

  var params = {
    city_id : $scope.selected_city.id
  }

  $scope.empty = false;
   $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
  Api.getRegions(params).success(function(res){
    $ionicLoading.hide();
    $scope.regions = res.items;
    if($scope.regions.length == 0) $scope.empty = true;
  }).error(function(res){
    $ionicLoading.hide();
  });


  $scope.selectRegion = function(region){
    $localstorage.set('selected_region', JSON.stringify(region));
    console.log("ini regionnya");
    console.log($localstorage.get('selected_region'));
    $state.go('modal.select-market');
  }
  console.log($localstorage.get('selected_region'));
  console.log($localstorage.get('selected_city'));
  ionicMaterialInk.displayEffect();

});
