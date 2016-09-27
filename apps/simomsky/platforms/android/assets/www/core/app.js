var appControllers = angular.module('enterpriseApp.controllers', []);
var appServices = angular.module('enterpriseApp.services', []);
var appDirectives = angular.module('enterpriseApp.directives', []);

angular.module('enterpriseApp', ['ionic', 'enterpriseApp.controllers', 'enterpriseApp.services', 'enterpriseApp.directives', 'ngCordova', 'ionic-material', 'ionMdInput', 'wu.masonry','uiGmapgoogle-maps'])

//.constant('apiAddress', 'http://128.199.200.218/groceria/html/api/web/v1')
.constant('apiAddress', 'http://188.166.231.64/api')
//.constant('apiAddress', 'http://128.199.200.218/selfproject/groceria/html/api/web/v1')

.run(function($rootScope, $ionicPlatform, $ionicHistory, $state, $localstorage, $cordovaPush, $cordovaDialogs, $http) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
    if($localstorage.get('device_token') == undefined) registerPush();
    //registerPush();
  });

  // Register push notification and store token to localstorage
  function registerPush(){
    var config = null;
    if (ionic.Platform.isAndroid()) {
      config = {
        "senderID": "481621065886" //GCM Project Number
      };
    }
    else if (ionic.Platform.isIOS()) {
      config = {
        "badge": "true",
        "sound": "true",
        "alert": "true"
      }
    }
    $cordovaPush.register(config).then(function (token) {
      //alert('reg push');
      // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
      if (ionic.Platform.isIOS()) {
        $localstorage.set('device_token', token);
      }
    }, function (err) {
      //alert("Register error " + err)
    });

  }

  // Notification Received
  $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
    //alert('diterima');
    if (ionic.Platform.isAndroid()) {
      handleAndroid(notification);
    } else if (ionic.Platform.isIOS()) {
      handleIOS(notification);
    }
  });

  // Android Notification Received Handler
  function handleAndroid(notification) {
    // ** NOTE: ** You could add code for when app is in foreground or not, or coming from coldstart here too
    //             via the console fields as shown.
    if (notification.event == "registered") {
      $localstorage.set('device_token', notification.regid);
    }
    else if (notification.event == "message") {
      $cordovaDialogs.alert(notification.message, "Push Notification Received");
    }
    else if (notification.event == "error") {
      $cordovaDialogs.alert(notification.msg, "Push notification error event");
    }
    else {
      $cordovaDialogs.alert(notification.event, "Push notification handler - Unprocessed Event");
    }
  }

  // IOS Notification Received Handler
  function handleIOS(notification) {
    // The app was already open but we'll still show the alert and sound the tone received this way. If you didn't check
    // for foreground here it would make a sound twice, once when received in background and upon opening it from clicking
    // the notification when this code runs (weird).
    if (notification.foreground == "1") {
      // Play custom audio if a sound specified.
      if (notification.sound) {
        var mediaSrc = $cordovaMedia.newMedia(notification.sound);
        mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
      }

      if (notification.body && notification.messageFrom) {
        $cordovaDialogs.alert(notification.body, notification.messageFrom);
      }
      else $cordovaDialogs.alert(notification.alert, "Push Notification Received");

      if (notification.badge) {
        $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
          console.log("Set badge success " + result)
        }, function (err) {
          console.log("Set badge error " + err)
        });
      }
    }
    // Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
    // in this case. You probably wouldn't be displaying anything at this point, this is here to show that you can process
    // the data in this situation.
    else {
      if (notification.body && notification.messageFrom) {
        $cordovaDialogs.alert(notification.body, "(RECEIVED WHEN APP IN BACKGROUND) " + notification.messageFrom);
      }
      else $cordovaDialogs.alert(notification.alert, "(RECEIVED WHEN APP IN BACKGROUND) Push Notification Received");
    }
  }


  if($localstorage.get('user') != undefined){
    $http.defaults.headers.common['key'] = JSON.parse($localstorage.get('user')).auth_key;
  }
  /*
  $ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name == 'login'){
      alert('ini d login');
    } else {
      alert('ini bukan d login');
    }
  }, 100);
  */
})


.config(function($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.views.maxCache(0);
  //$ionicConfigProvider.tabs.style(standard);
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $stateProvider
  .state('intro', {
    url: '/intro',
    templateUrl: 'core/views/intro.html',
    controller: 'IntroCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'core/views/login.html',
    controller: 'LoginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'core/views/signup.html',
    controller: 'SignupCtrl'
  })
  .state('modal', {
    url: '/modal',
    abstract: true,
    templateUrl: 'core/views/modal.html',
    controller: 'ModalCtrl'
  })
    .state('modal.select-city', {
      url: '/select-city',
      views: {
        'menuContent': {
          templateUrl: 'core/views/select-city.html',
          controller: 'SelectCityCtrl'
        },
        'fabContent': {
          template: ''
        }
      }
    })


    .state('modal.done', {
      url: '/done',
      views: {
        'menuContent': {
          templateUrl: 'core/views/done.html',
          controller: 'DoneCtrl'
        },
        'fabContent': {
          template: ''
        }
      }
    })


  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'core/views/main.html',
    controller: 'MainCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'home-tab': {
        templateUrl: 'core/views/home.html',
        controller: 'HomeCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })

  .state('app.help', {
    url: '/help',
    views: {
      'help-tab': {
        templateUrl: 'core/views/help.html',
        controller: 'HelpCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })
  .state('modal.mom-detail', {
    url: '/mom-detail',
    views: {
      'menuContent': {
        templateUrl: 'core/views/mom-detail.html',
        controller: 'MomDetailCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })

  .state('modal.mom-pregnant', {
    url: '/mom-pregnant',
    views: {
      'menuContent': {
        templateUrl: 'core/views/mom-pregnant.html',
        controller: 'MomPregnantCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })

  .state('modal.change-password', {
  url: '/change-password',
  views: {
    'menuContent': {
      templateUrl: 'core/views/change-password.html',
      controller: 'ChangePasswordCtrl'
    },
    'fabContent': {
      template: '',
    }
  }
})

  .state('forgot-password', {
  url: '/forgot-password',
  templateUrl: 'core/views/forgot-password.html',
  controller: 'ForgotPasswordCtrl'
})


  .state('app.account', {
    url: '/account',
    views: {
      'account-tab': {
        templateUrl: 'core/views/profile.html',
        controller: 'ProfileCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })
  .state('app.histories', {
    url: '/histories',
    views: {
      'histories-tab': {
        templateUrl: 'core/views/histories.html',
       // controller: 'OrdersCtrl'
        controller: 'HistoriesCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })

  $urlRouterProvider.otherwise('/intro');

});
