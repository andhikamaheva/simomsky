'use strict';

appControllers.controller('OrderTestimonialCtrl', function($scope, $localstorage, $state, $ionicLoading, Api, ionicMaterialInk) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = true;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderCart = false;

  $scope.$parent.headerBackState = function(){
    $state.go('modal.order-detail')
  };

  $scope.$parent.disableDragContent(false);

  // Start Functionality
  $scope.rating = {
    current: 1,
    max: 5
  };

  $scope.params = {
    user_id: JSON.parse($localstorage.get('user')).id,
    order_id: $localstorage.get('selected_order_id'),
    message: null,
    rate: 1
  };

  $scope.getSelectedRating = function(rating){
    $scope.params.rate = rating
  };


  $scope.addTestimonial = function(){
    $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
    console.log($scope.params);
    Api.addTestimonial($scope.params).success(function(data){
      $ionicLoading.hide();
      $state.go('modal.order-detail');
    }).error(function(data){
      $ionicLoading.hide();
      alert('Ada Kesalahan. Mohon Ulangi Lagi')
    })
  }


  ionicMaterialInk.displayEffect();

});
