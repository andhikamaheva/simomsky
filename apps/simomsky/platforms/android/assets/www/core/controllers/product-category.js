'use strict';

appControllers.controller('ProductCategoryCtrl', function($scope, $timeout, $stateParams, $localstorage, $ionicPopup, $state, $ionicLoading, Api, ionicMaterialInk) {

  // Init Styling
  $scope.$parent.showHeaderBack = true;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderCart = false;

  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.noMoreItemsAvailable = false;
  $scope.counter=0;

  $scope.$parent.disableDragContent(false);

  $scope.$parent.headerBackState = function(){
    $localstorage.remove('selected_category');
    $state.go('modal.category')
  };

  // Start Functionality
  $scope.products = [];
  $scope.productsdisplay=[];
  $scope.selected_market = JSON.parse($localstorage.get('selected_market'));
  $scope.selected_category = JSON.parse($localstorage.get('selected_category'));

  $scope.empty = false;
  var params = {
    category_id : $scope.selected_category.id,
    market_id:$scope.selected_market.id,
    grade_id : $scope.user.company_profile.grade_id
  }

  $scope.getProducts = function(){
    Api.getProducts(params).success(function(res){
      $scope.products = res.items;
      $ionicLoading.hide();
      if($scope.products.length == 0){
        $scope.empty = true;
      } else {
        $scope.empty = false;
      }
    }).error(function(){
      $ionicLoading.hide();
    }).finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
  $scope.getProducts();


  $scope.loadMore = function() {

    $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});

    if($scope.products[$scope.counter]!=undefined)
      $scope.productsdisplay.push($scope.products[$scope.counter]);

    if ( $scope.products.length-1 == $scope.counter ) {
      $scope.noMoreItemsAvailable = true;
    }

    if($scope.products.length>0)
      $scope.counter++;

    $ionicLoading.hide();
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');

  };

  $scope.showDetails = function(id){
    $localstorage.set('selected_product_id', id);
    $state.go('modal.product-detail');
  }

  ionicMaterialInk.displayEffect();

});
