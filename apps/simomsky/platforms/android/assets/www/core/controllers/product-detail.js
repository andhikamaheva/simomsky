'use strict';

appControllers.controller('ProductDetailCtrl', function($scope, $timeout, $stateParams, $state, Api, Cart, $localstorage, $ionicLoading, $ionicPopup, ionicMaterialInk) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = true;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderCart = true;
  $scope.$parent.disableDragContent(false);

  $scope.$parent.headerBackState = function(){
    $localstorage.remove('selected_product_id');
    if($localstorage.get('selected_category')){
     $state.go('modal.product-category');
    }
    else if($localstorage.get('selected_category') == undefined){
      $state.go('app.home')
    } else {
      $state.go('app.home')
    }
  };



  $scope.$parent.cartItemLength = 0;
  if($localstorage.get('order') != undefined){
    $scope.$parent.cartItemLength = JSON.parse($localstorage.get('order')).items.length;
  }

  $scope.selected_market = JSON.parse($localstorage.get('selected_market'));

  // Start Functionality
  var product_id = $localstorage.get('selected_product_id');

   var params = {
    market_id : $scope.selected_market.id,
    user_id : $scope.user.id,
    grade_id : $scope.user.company_profile.grade_id
  }
  //$ionicLoading.show({template: 'Fetching data...'});
   $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
  Api.getProduct(product_id, params).success(function(res){
   console.log(params);
    $ionicLoading.hide();
    $scope.product = res.item;
    console.log($scope.product);
  }).error(function(res){
    $ionicLoading.hide();
  });

  $scope.qty = 1;
  $scope.increase = function(){
    $scope.qty = $scope.qty + 1;
  }
  $scope.decrease = function(){
    if($scope.qty != 1){
      $scope.qty = $scope.qty - 1;
    }
  }

  $scope.changeUnit = function(unitid){
    var index = $scope.product.unit.map(function(u) { return Number(u['id']); }).indexOf(Number(unitid));
    $scope.unit = $scope.product.unit[index];
  }

  $scope.unit = "";
  $scope.addToCart = function(qty){
    if ($scope.unit != ""){
      $ionicLoading.show({
        //template: 'Menambahkan...',
        template:'<ion-spinner></ion-spinner>',
        duration: 500
      });
       console.log("ini unitnya");
       console.log($scope.unit);
      Cart.addItems($scope.product, $scope.qty, $scope.unit);
      $scope.qty = 1;
      $scope.untd = "";
      $scope.unit = "";
      $scope.$parent.cartItemLength = JSON.parse($localstorage.get('order')).items.length;
    } else {
      $scope.showAlert();
    }
  }

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: '<i class="ion-information-circled"> Pilih Unit</i>',
      template: 'Silahkan pilih unit belanja terlebih dahulu!'
    });
    alertPopup.then(function(res) {
      console.log('Suwun jeh');
    });
  };

  ionicMaterialInk.displayEffect();

});
