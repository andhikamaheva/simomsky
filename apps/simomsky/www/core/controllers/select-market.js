'use strict';

appControllers.controller('SelectMarketCtrl', function($scope, $ionicModal, $localstorage, $ionicLoading, $state, Api, ionicMaterialMotion, ionicMaterialInk) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = true;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderCart = false;

  $scope.$parent.headerBackState = function(){
    $localstorage.remove('selected_region');
    $state.go('modal.select-region')
  };

  $scope.$parent.disableDragContent(true);

  // Start Functionality
  $scope.markets = [];
  $scope.selected_region = JSON.parse($localstorage.get('selected_region'));
      $scope.user = JSON.parse($localstorage.get('user'));

  var params = {
    region_id : $scope.selected_region.id,
     user_id:$scope.user.id
  }

  $scope.empty = false;
  $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});

/*
  Api.getMarkets(params).success(function(res){
    $ionicLoading.hide();
    $scope.markets = res.items;
    console.log($scope.markets);
    if($scope.markets.length == 0) $scope.empty = true;
  }).error(function(res){
    $ionicLoading.hide();
  });
*/
 Api.getMarketsWithType(params).success(function(res){
    $ionicLoading.hide();
    console.log(params);
    $scope.markets = res.items;
    console.log($scope.markets);
    if($scope.markets.length == 0) $scope.empty = true;
  }).error(function(res){
    $ionicLoading.hide();
  });

  $scope.selectMarket = function(market){
    $localstorage.set('selected_market', JSON.stringify(market));
    $state.go('app.home');
  }

  $ionicModal.fromTemplateUrl('description-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.descriptionModal = modal;
  });

  $scope.openModalDescription = function(market) {
   
   $scope.details = market;
   console.log($scope.details);
    $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
    $scope.descriptionModal.show();
    $ionicLoading.hide();
  };

  $scope.closeModalDescription = function() {
    $scope.descriptionModal.hide();
  };

  ionicMaterialInk.displayEffect();
});
