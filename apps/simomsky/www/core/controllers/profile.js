'use strict';

appControllers.controller('ProfileCtrl', function($scope, $ionicPopup, $localstorage, $ionicLoading, $state, Api, ionicMaterialInk) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = false;
  $scope.$parent.showHeaderMenu = true;
  $scope.$parent.showHeaderSearch = true;
  $scope.$parent.showHeaderAdd = true;

  $scope.$parent.disableDragContent(true);

  // Start Functionality
  $scope.params = {}
  $scope.user = JSON.parse($localstorage.get('user'))
  console.log($scope.user);
/*
  $scope.getProfile = function(){
    Api.getProfile($scope.user.id, $scope.params).success(function(res){
      $ionicLoading.hide();
      $scope.profile = res.profile;
    }).error(function(){
      $ionicLoading.hide();
    }).finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
*/
  $scope.logout = function(){
    var confirmPopup = $ionicPopup.confirm({
      title: 'Logout',
      template: 'Apa anda yakin?'
    });
    confirmPopup.then(function(res) {
      if(res){

        Api.logout().success(function(data){
          var device_token = angular.copy($localstorage.get('device_token'));
          $ionicLoading.hide();
          $localstorage.clear();
          $localstorage.set('play_intro', 1);
          $localstorage.set('device_token', device_token);
          $state.go('login');

        }).error(function(data){
          $ionicLoading.hide();
        })
      } else {
        console.log('ga jadi logout bro');
      }
    });
  }


 // $scope.getProfile();

  ionicMaterialInk.displayEffect();
});
