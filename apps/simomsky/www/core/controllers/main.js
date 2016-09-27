'use strict';

appControllers.controller('MainCtrl', function($scope, $ionicModal, $ionicPopover, $ionicSideMenuDelegate, $state, Api, $localstorage, $ionicPopup, $ionicLoading, $timeout) {

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

 $scope.user = JSON.parse($localstorage.get('user'));

  $scope.showHeaderBack = false;
  $scope.showHeaderMenu = false;
  $scope.showHeaderSearch = true;
  $scope.showHeaderAdd = true;

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

  //Search Box
  //Search Box

  $scope.searchx ={
    keyword:null
  }

  $scope.is_keyword_null=false;



  $scope.search=function(){

      $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});

    var params = {
      keyword : $scope.searchx.keyword
    }


     //proses pencarian
      Api.search(params).success(function(res){
      $ionicLoading.hide();

      console.log(res);
      if(res.success == false){
          $scope.is_keyword_null=true;
          $ionicLoading.hide();
      }else{
       $scope.is_keyword_null=false;
       $scope.moms=res.data;
      }

    }).error(function(res){
      $scope.is_keyword_null=true;
      $ionicLoading.hide();
    });



  };


  $scope.showAlertSuccess = function(title,messages,data) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: messages
    });
    alertPopup.then(function(res) {
      $localstorage.set('selected_mom_id', data);
      $state.go('modal.mom-detail');
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
  $scope.params = {
   name : null,
   birthdate : null,
   age : null,
   address : null,
   city : null,
   husband_name : null,
   education : null,
   work : null,
   pregnants : null,
   users_id : $scope.user.data.id
  }

  //Function add Moms
  $scope.addMoms = function(){
   $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
   Api.addMoms($scope.params).success(function(res){
     $ionicLoading.hide();
     console.log($scope.params);
     $scope.closeAddModal();
     $scope.showAlertSuccess(res.title, res.messages, res.data);
     $scope.params = {
      name : null,
      birthdate : null,
      age : null,
      address : null,
      city : null,
      husband_name : null,
      education : null,
      work : null,
      pregnants : null,
      users_id : $scope.user.data.id
     }
   }).error(function(res){
     $ionicLoading.hide();
     $scope.showAlert(res.title, res.messages);
   });
  }



   //Modal Add Moms
   $ionicModal.fromTemplateUrl('add-modal.html', {
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

   //Modal Search
    $ionicModal.fromTemplateUrl('search-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.searchModal = modal;
    });

    $scope.openSearchModal = function() {
     $scope.showHeaderBack = false;
     $scope.showHeaderMenu = true;
     $scope.showHeaderSearch = false;
     $scope.showHeaderCart = false;
      $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
      $scope.searchModal.show();

      $ionicLoading.hide();
      $scope.showHeaderBack = false;
      $scope.showHeaderMenu = false;
      $scope.showHeaderSearch = true;
      $scope.showHeaderCart = true;
    };
    $scope.closeSearchModal = function() {
     $scope.showHeaderBack = false;
     $scope.showHeaderMenu = false;
     $scope.showHeaderSearch = true;
     $scope.showHeaderCart = true;
     $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
      $scope.searchModal.hide();
      $ionicLoading.hide();
    };

    $scope.$on('modal.shown', function() {
    });

    $scope.showDetails = function(id){
     $scope.closeSearchModal();
     $localstorage.set('selected_mom_id', id);
     $state.go('modal.mom-detail');
    }


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

 // $scope.user = JSON.parse($localstorage.get('user'))

});
