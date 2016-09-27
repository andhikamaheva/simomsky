'use strict';

appControllers.controller('HomeCtrl', function($scope, $timeout, $stateParams, $localstorage, $ionicPopup, $state, $ionicLoading, Api, ionicMaterialInk) {

  // Init Styling
  $scope.$parent.showHeaderBack = false;
  $scope.$parent.showHeaderMenu = true;
  $scope.$parent.showHeaderSearch = true;
  $scope.$parent.showHeaderAdd = true;

  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.disableDragContent(true);


  // Start Functionality
   $scope.moms = [];
   $scope.user = JSON.parse($localstorage.get('user'))

 // $ionicLoading.show({template: 'Fetching data...'});
 $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
 Api.getMoms($scope.user.data.id).success(function(res){
    $scope.moms = res.data;
    console.log($scope.moms);
    $ionicLoading.hide();
  }).error(function(res){
    $ionicLoading.hide();
  });

  $scope.refreshHome = function(){
  $ionicLoading.show({template: '<ion-spinner></ion-spinner><br>Meperbarui list Moms'});

  Api.getMoms($scope.user.data.id).success(function(res){
     $scope.moms = res.data;
     console.log($scope.moms);
     $ionicLoading.hide();
   }).error(function(res){
     $ionicLoading.hide();
   }).finally(function() {
    // $ionicLoading.hide();
     $scope.$broadcast('scroll.refreshComplete');
   });
}

$scope.showDetails = function(id){
 $localstorage.set('selected_mom_id', id);
 $state.go('modal.mom-detail');
}

/*

 */

  //$scope.products = Api.getProducts();

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Ada Keranjang Belanja',
      template: 'Anda mempunyai keranjang belanja. Selesaikan atau kosongkan Cart anda terlebih dahulu!'
    });
    alertPopup.then(function(res) {
      $state.go('app.cart');
    });
  };

  ionicMaterialInk.displayEffect();

});
