'use strict';

appControllers.controller('OrdersCtrl', function($scope, $timeout, Api, $ionicLoading, $localstorage, $state, $ionicScrollDelegate, ionicMaterialInk) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = false;
  $scope.$parent.showHeaderMenu = true;
  $scope.$parent.showHeaderSearch = true;
  $scope.$parent.showHeaderCart = false;

  $scope.$parent.disableDragContent(true);
  $scope.emptyDone = false;
  $scope.emptyProgress = false;
  // Start Functionality
  $scope.params = {
    customer_id: JSON.parse($localstorage.get('user')).id,
  }
  $scope.empty = false;
  $scope.done = false;

  var makeStatusFlag = function(lists){
    var arr = [];
    angular.forEach(lists, function(value, index){
      var obj = value;
      if(Number(obj.status) == 5 ||
         Number(obj.status) == 6){
        obj.done = true;
        $scope.emptyDone = true;
      } else {
        obj.done = false;
        $scope.emptyProgress = true;
      }
      arr.push(obj);
    })
    return arr;
  }

  $scope.getOrders = function(){
    Api.getOrders($scope.params).success(function(res){
      $ionicLoading.hide();
      $scope.lists = makeStatusFlag(res.items);
      if($scope.lists.length == 0){
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
  $scope.getOrders();

  $scope.filterInProgress = function(){
    $scope.done = false;
    $ionicScrollDelegate.scrollTop();
  }
  $scope.filterDone = function(){
    $scope.done = true;
    $ionicScrollDelegate.scrollTop();
  }

  $scope.getStatusText = function(status_id){
    var id = Number(status_id);
    if(id == 1) return 'Menunggu Shopper';
    if(id == 2) return 'Belanja';
    if(id == 3) return 'Menunggu Driver';
    if(id == 4) return 'Pengiriman';
    if(id == 5) return 'Selesai';
    if(id == 6) return 'Batal';
  }

  $scope.getStatusClass = function(status_id){
    var id = Number(status_id);
    if(id == 1) return 'badge-positive';
    if(id == 2) return 'badge-calm';
    if(id == 3) return 'badge-energized';
    if(id == 4) return 'badge-royal';
    if(id == 5) return 'badge-balanced';
    if(id == 6) return 'badge-assertive';
  }

  $scope.showDetails = function(id){
    $localstorage.set('selected_mom_id', id);
    $state.go('modal.order-detail');
  }


  ionicMaterialInk.displayEffect();

});
