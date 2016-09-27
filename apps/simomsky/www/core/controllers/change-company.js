'use strict';

appControllers.controller('ChangeCompanyCtrl', function($scope, $ionicPopup, $localstorage, $ionicLoading, $state, Api, ionicMaterialInk) {



  // Start Functionality

  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = true;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderCart = false;

  $scope.$parent.headerBackState = function(){
    $state.go('app.account')
  };

  $scope.$parent.disableDragContent(false);

  $scope.user = JSON.parse($localstorage.get('user'))
  console.log($scope.user);
  $scope.error = [];
  $scope.params = {
   phone: $scope.user.company_profile.phone,
   company_id: $scope.user.company_profile.id,
   name: $scope.user.company_profile.name,
   address: $scope.user.company_profile.address,
   grade_id: $scope.user.company_profile.grade_id
  }

$ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
$scope.updateGrade = function(id){
 $scope.params.grade_id = id;
 console.log($scope.params.grade_id);
}

$scope.addCompany = function(){
console.log($scope.params);
$ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
if($scope.params.name == null || $scope.params.address == null || $scope.params.grade_id == null){
 $ionicLoading.hide();
 $scope.showAlert();
}else{
 Api.addCompany($scope.params).success(function(res){
   $ionicLoading.hide();
   $localstorage.remove('user');
   $scope.user.company_profile = $scope.params;
   $localstorage.set('user', JSON.stringify($scope.user));


  // console.log($scope.params);

   $state.go('app.account');

   $localstorage.set('user.company_profile', $scope.params);
   //$scope.profile = res.profile;
 }).error(function(){
   $ionicLoading.hide();
 });
}

}

Api.getGrades().success(function(res){
  $ionicLoading.hide();
  $scope.grades = res.items;
  console.log($scope.grades);
}).error(function(){
  $ionicLoading.hide();
});



  ionicMaterialInk.displayEffect();
});
