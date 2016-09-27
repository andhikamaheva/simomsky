'use strict';

appControllers.controller('HistoriesCtrl', function($scope, $timeout, Api, $ionicLoading, $localstorage, $state, $ionicScrollDelegate, $ionicModal, ionicMaterialInk) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = false;
  $scope.$parent.showHeaderMenu = true;
  $scope.$parent.showHeaderSearch = true;
  $scope.$parent.showHeaderCart = false;

  $scope.$parent.disableDragContent(true);

  // Start Functionality
  $scope.empty = false;
  $scope.emptyDone = false;
  $scope.emptyProgress = false;
  $scope.done = false;
  $scope.orders = [];
  $scope.payment;
  //$scope.productOrders = []
  var makeStatusFlag = function(lists){
    var arr = [];
    angular.forEach(lists, function(value, index){
      var obj = value;
      if(obj.status == 'Selesai'){
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

  $scope.user = JSON.parse($localstorage.get('user'));
  $scope.getMoms = function(){
  $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});

    Api.getMoms($scope.user.data.id).success(function(res){
      $ionicLoading.hide();
     $scope.lists = makeStatusFlag(res.data);
     // console.log($scope.lists);
      if($scope.lists.length == 0){
       $scope.empty = true;
      }
    }).error(function(){
      $ionicLoading.hide();
    }).finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  $scope.getMoms();

  $scope.filterInProgress = function(){
    $scope.done = false;
    $ionicScrollDelegate.scrollTop();
  }
  $scope.filterDone = function(){
    $scope.done = true;
    $ionicScrollDelegate.scrollTop();
  }



  $scope.getStatusClass = function(status){
    if(status == 'Sangat Tinggi') return 'badge badge-assertive';
    if(status == 'Tinggi') return 'badge badge-energized';
    if(status == 'Rendah') return 'badge badge-calm';
    if(status == 'Normal') return 'badge badge-balanced';
  }

    $ionicModal.fromTemplateUrl('order-details.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.orderDetailsModal = modal;
    });

    $scope.closeOrderDetailsModal = function() {
     $scope.orders = [];
      $scope.orderDetailsModal.hide();
    };

  $scope.showDetails = function(listId){
   $localstorage.set('selected_mom_id', listId);
    $state.go('modal.mom-detail');
  }




  ionicMaterialInk.displayEffect();

});
