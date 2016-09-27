'use strict';

appControllers.controller('PaymentCtrl', function($scope, $timeout, $state, $localstorage, $ionicPopup, $ionicLoading, Api, ionicMaterialInk, Cart) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = true;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderCart = false;

  $scope.$parent.headerBackState = function(){
    $state.go('modal.order-summary');
  };

  $scope.$parent.disableDragContent(false);

  // Start Functionality
  $scope.order = JSON.parse($localstorage.get('order'));
  Cart.updateMarket(JSON.parse($localstorage.get('selected_market')).id);


  //$ionicLoading.show({template: 'Fetching data...'});
  $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
  Api.getPayments().success(function(res){
    $ionicLoading.hide();
    $scope.payments = res.items;
  }).error(function(res){
    $ionicLoading.hide();
  });

  $scope.updatePayment = function(id){
    Cart.updatePayment(id);
  }

  $scope.pay = function(){
    var order = JSON.parse($localstorage.get('order'));
    console.log(order);
    if(order.payment_method_id == null){
      $scope.showAlert();
    } else {
     // $ionicLoading.show({template: 'Placing Order...'});
     $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
      Api.placeOrder(order).success(function(res){
        $ionicLoading.hide();
        Cart.deleteAll();
        Cart.reset(0);
        $state.go('modal.done');
      }).error(function(res){
        $ionicLoading.hide();
      });

    }
  }

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: 'Pilih Payment Method dulu'
    });
    alertPopup.then(function(res) {
      console.log('Suwun jeh');
    });
  };

  ionicMaterialInk.displayEffect();

  $scope.tes = function(){
    console.log(angular.fromJson($localstorage.get('order')))
  }

});
