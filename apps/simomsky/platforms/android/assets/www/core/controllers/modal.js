'use strict';

appControllers.controller('ModalCtrl', function($scope, $ionicModal, $ionicPopover, $ionicSideMenuDelegate, $state, Api, $localstorage, $ionicPopup, $ionicLoading, $timeout) {

  var navIcons = document.getElementsByClassName('ion-navicon');
  for (var i = 0; i < navIcons.length; i++) {
    navIcons.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  }

  $scope.hideNavBar = function() {
    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
  };

  $scope.showNavBar = function() {
    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
  };

  $scope.noHeader = function() {
    var content = document.getElementsByTagName('ion-content');
    for (var i = 0; i < content.length; i++) {
      if (content[i].classList.contains('has-header')) {
        content[i].classList.toggle('has-header');
      }
    }
  };

  $scope.hasHeader = function() {
    var content = document.getElementsByTagName('ion-content');
    for (var i = 0; i < content.length; i++) {
      if (!content[i].classList.contains('has-header')) {
        content[i].classList.toggle('has-header');
      }
    }

  };

  $scope.hideHeader = function() {
    $scope.hideNavBar();
    $scope.noHeader();
  };

  $scope.showHeader = function() {
    $scope.showNavBar();
    $scope.hasHeader();
  };

  $scope.clearFabs = function() {
    var fabs = document.getElementsByClassName('button-fab');
    if (fabs.length && fabs.length > 1) {
      fabs[0].remove();
    }
  };

  $scope.showHeaderBack = false;
  $scope.showHeaderMenu = true;
  $scope.showHeaderSearch = false;
  $scope.showHeaderCart = false;

  $scope.headerBackState = function(){}

  $scope.$watch(function () {
    return $ionicSideMenuDelegate.getOpenRatio();
  }, function (ratio) {
    $scope.sidemenuopened = (ratio == 1);
    $scope.opaqueopacity = 90/100 * ratio;
  });

  $ionicSideMenuDelegate.canDragContent(true);
  $scope.disableDragContent = function(bool){
    $ionicSideMenuDelegate.canDragContent(bool);
  }


  $scope.cartItemLength = 0;
  if ($localstorage.get('order') != undefined){
    $scope.cartItemLength = JSON.parse($localstorage.get('order')).items.length;
  }


  $scope.startShopping = function(){
    var total = 0;
    if ($localstorage.get('order') != undefined){
      total = JSON.parse($localstorage.get('order')).total;
    }
    if(total != 0){
      $scope.showAlert();
    } else {
      if($localstorage.get('selected_market') != undefined){
        $state.go('app.products');
      } else {
        $state.go('app.home');
      }
    }
  }

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Ada Keranjang Belanja',
      template: 'Anda mempunyai keranjang belanja. Selesaikan atau kosongkan Cart anda terlebih dahulu!'
    });
    alertPopup.then(function(res) {
      $state.go('app.cart');
    });
  };

  $scope.logout = function(){
    var confirmPopup = $ionicPopup.confirm({
      title: 'Logout',
      template: 'Apa anda yakin?'
    });
    confirmPopup.then(function(res) {
      if(res){
        var credentials = {
          user_id : JSON.parse($localstorage.get('user')).id
        }
        $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
        Api.logout(credentials).success(function(data){
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

  $scope.user = JSON.parse($localstorage.get('user'))

});
