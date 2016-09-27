'use strict';

appControllers.controller('ShippingCtrl', function($scope, $timeout, $state, $filter, $localstorage, $ionicLoading, $ionicPopup, $cordovaGeolocation, $ionicModal, ionicMaterialInk, Api, Cart) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = true;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderCart = false;

  $scope.mapAddress = {
    id: 0,
    street: null,
    distance_to_market: null,
    latitude: null,
    longitude: null
  };

  $scope.$parent.headerBackState = function(){
    $state.go('modal.cart')
  };

  $scope.$parent.disableDragContent(false);

  // Start Functionality
  $scope.user = JSON.parse($localstorage.get('user'));
  $scope.order = JSON.parse($localstorage.get('order'));
  var params = {
    user_id : $scope.user.id
  }

  //$ionicLoading.show({template: 'Fetching data...'});
  $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
  Api.getAddress(params).success(function(res){
    //$ionicLoading.hide();
    $scope.addresses = res.items;
  }).error(function(res){
    $ionicLoading.hide();
  });

  $scope.updateAddress = function(address){
    Cart.updateAddress(address);
    $scope.order = JSON.parse($localstorage.get('order'));
    $scope.updateShipping($scope.order); //update the shipping fee
    $scope.closeAddressModal();
  }

  $scope.updateShipping=function(order){
//get per_km shipping rate which id 3
    Api.getShipping(3).success(function(res){
      $ionicLoading.hide();
      $scope.distance_fee=Math.ceil(parseFloat(((order.distance/1000)*res.fee), 10));
      Cart.updateDistanceFee($scope.distance_fee);
    }).error(function(res){
      $ionicLoading.hide();
    });
  }

  $scope.updateAddressDetail = function(detail){
    Cart.updateAddressDetail(detail);
  }

  $scope.updatePhone = function(phone){
    Cart.updatePhone(phone);
  }

  $scope.updatePhone($scope.user.profile.phone);

  $scope.payment = function(){
    var order = JSON.parse($localstorage.get('order'));
    if(order.address.street == null || order.phone == '' || order.delivery_time.start == null ){
      $scope.showAlert()
    } else {
      $state.go('modal.order-summary');
      //$state.go('app.payment')
    }
  }

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: 'Pilih atau isikan semua data dahulu'
    });
    alertPopup.then(function(res) {
      console.log('Suwun jeh');
    });
  };

  var viewDay;// = 5; //n hari ke depan view timeslot yang tersedia.
  var todayRange;// = 2 * 3600000; //Range hari ini untuk memberi waktu belanja shopper. Tidak bisa pilih waktu saat ini dan n am kedepan pada hari ini.
  var timeSlotRange;// = 1 * 3600000; //Range Timeslot --> hours - 1 hours (miliseconds).
 var market = JSON.parse($localstorage.get('selected_market'));
 var marketOpenTime = market.open_hours.split(':');
 var marketCloseTime = market.close_hours.split(':');

 var today = new Date();
//  $scope.apiTimeSlot = {};
  $scope.timeslot = [];
  Api.getTimeSlot().success(function(res){
    $scope.apiTimeSlot = res.items;
    viewDay = $scope.apiTimeSlot[2].value;
    todayRange = $scope.apiTimeSlot[0].value*3600000;
    timeSlotRange = $scope.apiTimeSlot[1].value*3600000;
    console.log(viewDay);
    console.log(todayRange);
    console.log(timeSlotRange);



      var openTimestamp = new Date ((today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + marketOpenTime[0] + ':' + marketOpenTime[1] ).getTime();
      var closeTimestamp = new Date ((today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + marketCloseTime[0] + ':' + marketCloseTime[1] ).getTime();

      $scope.openTimestamp = closeTimestamp;

      var times = [];

      var time = {
        start: openTimestamp,
        end: openTimestamp + timeSlotRange
      }

      var t = 0;
      function addTimes(){
        var newTime = {
          start: openTimestamp + (t * timeSlotRange),
          end: openTimestamp + (t * timeSlotRange) + timeSlotRange
        }
        times.push(newTime);

        time.end = time.end + timeSlotRange;

        t = t+1;
        if(time.end <= closeTimestamp){
          addTimes();
        }
      }
      addTimes();

      for (var i = 0; i < viewDay; i++){
        var newTimes = [];
        angular.copy(times, newTimes);
        for(var j= 0; j < newTimes.length; j++){
          newTimes[j].start = newTimes[j].start + (i * 24 * 3600000);
          newTimes[j].end = newTimes[j].end + (i * 24 * 3600000);
        }
        var day = {
          date: openTimestamp + (i * 24 * 3600000),
          text: '',
          times: newTimes
        }
        // Ganti Text untuk mempermudah user aja. :)
        if(i === 0){ day.text = 'Hari Ini'}
        else if(i === 1) {day.text = 'Besok'}
        else {day.text = $filter('date')(day.date, 'EEEE, d MMM yy')}

        //Remove Unavailable Timeslot today
        var todayIndex = 0;
        if(i === 0){
          var now = new Date().getTime();
          angular.forEach(day.times, function(time, index){
            if(time.end < (now + todayRange)){
              todayIndex = index;
            }
          })
          for(var rm = 0; rm <= todayIndex; rm++){
            day.times.splice(0, 1);
          }
        }

        $scope.timeslot.push(day);
      }
    $ionicLoading.hide();
  }).error(function(res){
    $ionicLoading.hide();
  });

console.log($scope.apiTimeSlot);



  $scope.selectTimeslot = function(start, end){
    Cart.updateTime(start, end);
    $scope.order = JSON.parse($localstorage.get('order'));
    $scope.closeTimeModal();
  }


  //begin map
  $scope.map = {
    center: {
      latitude: market.latitude,
      longitude: market.longitude
    },
    zoom: 13,
    options:{
      //disableDefaultUI: true
      mapTypeControl: false,
      streetViewControl: false
    },
    events: {
      dragend: function(map){
        $scope.marker.coords.latitude = map.getCenter().lat();
        $scope.marker.coords.longitude = map.getCenter().lng();
        $scope.getDistance($scope.marker.coords.latitude, $scope.marker.coords.longitude);
      }
    }
  };
  var mapCache = angular.copy($scope.map);

  $scope.marker = {
    id: 0,
    coords: {
      latitude: market.latitude,
      longitude: market.longitude
    },
    options: {
      icon: 'img/map-marker-small.png',
      draggable: true,
    },
    events: {
      dragend: function (marker, eventName, args) {
        //alert($scope.mapAddress.street);
        //$scope.mapAddress=$scope.mapAddress;
        $scope.getDistance(marker.getPosition().lat(), marker.getPosition().lng());
      }
    }
  };

  $scope.refreshMap = function(){
    $scope.map = mapCache;
  }
  $scope.pointNewAddress = function(latitude, longitude){
    $scope.map.center.latitude = latitude;
    $scope.map.center.longitude = longitude;
    $scope.map.zoom = 13;
    $scope.marker.coords.latitude = latitude;
    $scope.marker.coords.longitude = longitude;
  }

  $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
    if (_.isEqual(newVal, oldVal)) return;
    $scope.mapAddress = $scope.mapAddress;
  });


  $scope.updateAddressFromMap = function(){
    if($scope.mapAddress.street != null){
      $scope.updateAddress($scope.mapAddress);
      $scope.closeAddressModal();
    }
  }

  $scope.updateAddressFromList = function(address){
    var market = JSON.parse($localstorage.get('selected_market'));

    var location1 = new google.maps.LatLng(market.latitude, market.longitude);
    var location2 = new google.maps.LatLng(address.latitude, address.longitude);

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer(
    {
      suppressMarkers: true,
      suppressInfoWindows: true
    });

    var request = {
      origin: location1,
      destination:location2,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status)
    {

      if (status == google.maps.DirectionsStatus.OK)
      {
        address.distance_to_market = response.routes[0].legs[0].distance.value;
        console.log(address);
        $scope.updateAddress(address);

      }
    });
  }


  $ionicModal.fromTemplateUrl('address-list.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addressModal = modal;
  });
  $scope.openAddressModal = function() {
    $scope.addressModal.show();
  };
  $scope.closeAddressModal = function() {
    $scope.addressModal.hide();
  };
  $scope.$on('modal.shown', function() {
    $scope.refreshMap();
  });


  $ionicModal.fromTemplateUrl('slot-time.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.timeModal = modal;
  });
  $scope.openTimeModal = function() {
    $scope.timeModal.show();
  };
  $scope.closeTimeModal = function() {
    $scope.timeModal.hide();
  };

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $scope.getMyLocation = function(){
    $cordovaGeolocation.getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
      $scope.getDistance($scope.latitude, $scope.longitude);
      $scope.pointNewAddress($scope.latitude, $scope.longitude);
    }, function(err) {
      console.log(err)
    });
  }

  $scope.getDistance = function(latitude, longitude, updateAddress) {

    var market = JSON.parse($localstorage.get('selected_market'));

    var location1 = new google.maps.LatLng(market.latitude, market.longitude);
    var location2 = new google.maps.LatLng(latitude,longitude);

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer(
    {
      suppressMarkers: true,
      suppressInfoWindows: true
    });

    var request = {
      origin: location1,
      destination:location2,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status)
    {
      if (status == google.maps.DirectionsStatus.OK)
      {
        $scope.mapAddress.street = response.routes[0].legs[0].end_address.split(',')[0];
        $scope.mapAddress.distance_to_market = response.routes[0].legs[0].distance.value;
        $scope.mapAddress.latitude = latitude;
        $scope.mapAddress.longitude = longitude;
        console.log(response);
        console.log($scope.mapAddress);
        $scope.$apply();
      }

    });

  };

  ionicMaterialInk.displayEffect();

});
