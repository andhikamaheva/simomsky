'use strict';

appControllers.controller('HelpCtrl', function($scope, $timeout, $state, $filter, $localstorage, $ionicLoading, $ionicPopup, $cordovaGeolocation, $ionicModal, ionicMaterialInk, Api) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = false;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderCart = false;

  $scope.$parent.headerBackState = function(){
    $state.go('app.cart')
  };

  $scope.$parent.disableDragContent(false);

  //FAQ Modal
 $ionicModal.fromTemplateUrl('faq.html', {
   scope: $scope,
   animation: 'slide-in-up'
 }).then(function(modal) {
   $scope.faqModal = modal;
 });
 $scope.openFaqModal = function() {
   $scope.faqModal.show();
 };
 $scope.closeFaqModal = function() {
   $scope.faqModal.hide();
 };

  $ionicModal.fromTemplateUrl('contact-us.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.contactUsModal = modal;
  });
  $scope.openContactUsModal = function() {
    $scope.contactUsModal.show();
  };
  $scope.closeContactUsModal = function() {
    $scope.contactUsModal.hide();
  };

$scope.user = JSON.parse($localstorage.get('user'))
$scope.params = {
 username : $scope.user.data.username,
 email : $scope.user.data.email,
 message : null,
}

$scope.submitFeedback = function(){
 $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
 Api.addFeedback($scope.params).success(function(res){
$ionicLoading.hide();
$scope.closeFaqModal();
$scope.showAlertSuccess();
 }).error(function(res){
  console.log(res);
   $ionicLoading.hide();
   $scope.showAlert(res.messages);
 });
}

$scope.showAlertSuccess = function(title,messages) {
  var alertPopup = $ionicPopup.alert({
    title: 'Pesan terkirim',
    template: 'Data Berhasil Disimpan!'
  });
  alertPopup.then(function(res) {
    $scope.closeFaqModal();

  });
};

$scope.showAlert = function(messages) {
  var alertPopup = $ionicPopup.alert({
    title: 'Error',
    template: listError(messages)
  });
  alertPopup.then(function(res) {

  });
};
var listError = function(arr){
  var html = '<ul>';
  for (var i = 0; i < arr.length; i++){
    html += '<li>' + arr[i] + '</li>';
  }
  html += '</ul>';
  return html;
}


  ionicMaterialInk.displayEffect();

});
