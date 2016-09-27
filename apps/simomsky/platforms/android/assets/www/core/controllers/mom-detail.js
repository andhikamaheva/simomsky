'use strict';

appControllers.controller('MomDetailCtrl', function($scope, $localstorage, $state, $ionicLoading, Api, $ionicModal, ionicMaterialInk, $ionicPopup) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = true;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderAdd = false;

  console.log($localstorage.get('selected_mom_id'));
  $scope.$parent.headerBackState = function(){
    $localstorage.remove('selected_mom_id');
    $state.go('app.histories')
  };

  $scope.$parent.disableDragContent(false);

  // Start Functionality
  $scope.add = true;
  $scope.available = true;
  var mom_id = $localstorage.get('selected_mom_id');
  $scope.getMom = function(){
   $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
    Api.getMom(mom_id).success(function(res){
      $scope.mom = res.data;
      Api.getPregnants(mom_id).success(function(res){
        $scope.pregnants = res.data;
        if(res.add == true){
         $scope.add = true;
        }
        else{
         $scope.add = false;
        }
        if(res.data == false){
          $scope.available = false;
        }
        else{
         $scope.available = true;
        }
        console.log($scope.pregnants);
      }).error(function(res){
        $ionicLoading.hide();
      });
      $ionicLoading.hide();
    }).error(function(res){
      $ionicLoading.hide();
    }).finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
  $scope.getMom();
  $scope.getStatusClass = function(status){
    if(status == 'Sangat Tinggi') return 'badge badge-assertive';
    if(status == 'Tinggi') return 'badge badge-energized';
    if(status == 'Rendah') return 'badge badge-calm';
    if(status == 'Masa Hamil') return 'badge badge-balanced';
  }

  //Add Modal Pregnant
  $ionicModal.fromTemplateUrl('add-pregnant.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addModal = modal;
  });

  $scope.openAddModal = function() {
   $scope.showHeaderBack = false;
   $scope.showHeaderMenu = true;
   $scope.showHeaderSearch = false;
   $scope.showHeaderAdd = false;
    $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
    $scope.addModal.show();
    $ionicLoading.hide();
    $scope.showHeaderBack = false;
    $scope.showHeaderMenu = false;
    $scope.showHeaderSearch = true;
    $scope.showHeaderAdd = true;
  };

  $scope.closeAddModal = function() {
   $scope.showHeaderBack = false;
   $scope.showHeaderMenu = false;
   $scope.showHeaderSearch = true;
   $scope.showHeaderAdd = true;
   $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
    $scope.addModal.hide();
    $ionicLoading.hide();
  };


  $scope.params = {
   last_period : null,
   estimate : null,
   pregnants : null,
   moms_id : $localstorage.get('selected_mom_id')
  }

  $scope.addPregnant = function(){
   $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
   Api.addPregnant($scope.params).success(function(res){
     $ionicLoading.hide();
     $scope.showAlertSuccess(res.title, res.messages);
   }).error(function(res){
     $ionicLoading.hide();
     $scope.showAlert(res.title, res.messages);
   }).finally(function() {
     $scope.$broadcast('scroll.refreshComplete');
   });
  }

    $scope.showAlertSuccess = function(title,messages) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: messages
      });
      alertPopup.then(function(res) {
        $scope.closeAddModal();
         $scope.getMom();
      });
    };

    $scope.showAlert = function(title,messages) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: listError(messages)
      });
      alertPopup.then(function(res) {
        //$state.go('app.cart');
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

    $scope.showPregnants = function(id){
     $localstorage.set('selected_pregnant_id', id);
     $state.go('modal.mom-pregnant');
    }

  ionicMaterialInk.displayEffect();

});
