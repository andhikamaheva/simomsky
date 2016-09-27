'use strict';

appControllers.controller('CompanyCtrl', function($scope, $ionicPopup, $localstorage, $ionicLoading, $state, Api, ionicMaterialInk) {



  // Start Functionality
  $scope.user = JSON.parse($localstorage.get('user'))

  $scope.params = {
   user_id: $scope.user.id,
   company_id: null,
   name: null,
   address: null,
   grade_id: null
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
   $state.go('modal.select-city');
   //$localstorage.set('user.company_profile')
   $localstorage.set('user.company_profile', $scope.params);
   //$scope.profile = res.profile;
 }).error(function(){
   $ionicLoading.hide();
 });
}

}

$scope.showAlert = function() {
  var alertPopup = $ionicPopup.alert({
    title: 'Ada Field Kosong',
    template: 'Semua field harus diisi!'
  });
  alertPopup.then(function(res) {
    console.log("isi lagi ya");
  });
};

Api.getGrades().success(function(res){
  $ionicLoading.hide();
  $scope.grades = res.items;
  console.log($scope.grades);
}).error(function(){
  $ionicLoading.hide();
});

  ionicMaterialInk.displayEffect();
});
