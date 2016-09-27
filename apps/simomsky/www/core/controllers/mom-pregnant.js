'use strict';

appControllers.controller('MomPregnantCtrl', function($scope, $localstorage, $state, $ionicLoading, Api, $ionicModal, ionicMaterialInk, $ionicPopup) {

  // Init Styling
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();

  $scope.$parent.showHeaderBack = true;
  $scope.$parent.showHeaderMenu = false;
  $scope.$parent.showHeaderSearch = false;
  $scope.$parent.showHeaderAdd = false;


  $scope.$parent.headerBackState = function(){
    $localstorage.remove('selected_mom_id');
    $state.go('app.histories')
    $localstorage.remove('selected_quarter_id');
  };

  $scope.$parent.disableDragContent(false);

  // Start Functionality
  $scope.add = true;
  $scope.available = true;
  var mom_id = $localstorage.get('selected_mom_id');
  var pregnants_id = $localstorage.get('selected_pregnant_id');

  $scope.getMom = function(){
   $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
    Api.getMom(mom_id).success(function(res){
      $scope.mom = res.data;
      Api.getPregnants(mom_id).success(function(res){
        $scope.pregnants = res.data;
        Api.getQuarterly(pregnants_id).success(function(res){

         $scope.quarterly = res.data;
         if(res.available == false){
           $scope.available = false;
         }
         else{
          $scope.available = true;
         }
        }).error(function(res){
          $ionicLoading.hide();
          $scope.showAlert(res.title, res.messages);
        });
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
    if(status == 'Normal') return 'badge badge-balanced';
  }

  //Add Modal Pregnant
  $ionicModal.fromTemplateUrl('modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.Modal = modal;
  });

  $scope.openModal = function(id) {
   $localstorage.set('selected_quarter_id', id);
   $scope.quarterly_id = $localstorage.get('selected_quarter_id');
   $scope.showHeaderBack = false;
   $scope.showHeaderMenu = true;
   $scope.showHeaderSearch = false;
   $scope.showHeaderAdd = false;
    $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
    $scope.Modal.show();
    $ionicLoading.hide();
    $scope.showHeaderBack = false;
    $scope.showHeaderMenu = false;
    $scope.showHeaderSearch = true;
    $scope.showHeaderAdd = true;
  };

  $scope.closeModal = function() {
   $localstorage.remove('selected_quarter_id');
   $scope.showHeaderBack = false;
   $scope.showHeaderMenu = false;
   $scope.showHeaderSearch = true;
   $scope.showHeaderAdd = true;
   $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
    $scope.Modal.hide();
    $ionicLoading.hide();
  };



  $scope.params = {
   last_period : null,
   estimate : null,
   pregnants : null,
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
         $scope.closeModal();
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

    //perhitungan
    $scope.answer = {
     satu : 0,
     dua_a : 0,
     dua_b : 0,
     tiga : 0,
     empat : 0,
     lima : 0,
     enam : 0,
     tujuh : 0,
     delapan : 0,
     sembilan_a : 0,
     sembilan_b : 0,
     sembilan_c : 0,
     sepuluh : 0,
     sebelas_a : 0,
     sebelas_b : 0,
     sebelas_c : 0,
     sebelas_d : 0,
     sebelas_e : 0,
     sebelas_f : 0,
     duabelas : 0,
     tigabelas : 0,
     empatbelas : 0,
     limabelas : 0,
     enambelas : 0,
     tujuhbelas : 0,
     delapanbelas : 0,
     sembilanbelas : 0,
     duapuluh : 0

    };
    $scope.total_rendah = 0;
    $scope.total_tinggi = 0;
    $scope.total_sangat_tinggi = 0;

    $scope.calculateNow = function(){
     $scope.grendah = 0;
     $scope.gtinggi = 0;
     $scope.gsangattinggi = 0;
     $scope.zrendah = 0;
     $scope.ztinggi = 0;
     $scope.zstinggi = 0;
     $scope.inferensi = 0;
     $scope.kategori = 0;


     $scope.total_rendah = 2 + $scope.answer.satu + $scope.answer.dua_a + $scope.answer.dua_b + $scope.answer.tiga + $scope.answer.empat + $scope.answer.lima + $scope.answer.enam + $scope.answer.tujuh + $scope.answer.delapan + $scope.answer.sembilan_a + $scope.answer.sembilan_b + $scope.answer.sembilan_c;


     $scope.total_tinggi = $scope.answer.sebelas_a + $scope.answer.sebelas_b + $scope.answer.sebelas_c + $scope.answer.sebelas_d + $scope.answer.sebelas_e + $scope.answer.sebelas_f + $scope.answer.duabelas + $scope.answer.tigabelas + $scope.answer.empatbelas + $scope.answer.lima + $scope.answer.enambelas;

     $scope.total_sangat_tinggi = $scope.answer.sepuluh + $scope.answer.tujuhbelas + $scope.answer.delapanbelas + $scope.answer.sembilanbelas + $scope.answer.duapuluh;

    $scope.grendah = $scope.grupRendah($scope.total_rendah);
   $scope.gtinggi = $scope.grupTinggi($scope.total_tinggi);
   $scope.gsangattinggi = $scope.grupSangatTinggi($scope.total_sangat_tinggi);
   $scope.inferensi = $scope.inference($scope.grendah, $scope.gtinggi, $scope.gsangattinggi);
   $scope.inferensi = $scope.inferensi/118;
   $scope.hasil = Math.round($scope.inferensi*100);
   $scope.print;
    if($scope.hasil <= 16.67){
    $scope.print = "Tingkat risiko kehamilan Anda masuk ke dalam kategori risiko rendah. Hal ini menunjukkan bahwa Anda perlu mempersiapkan rencana persalinan yang mampu ditangani oleh bidan dengan tempat rujukan poliklinik desa atau dapat dilakukan di rumah."+
               "Perencanaan ini perlu dilakukan agar Anda lebih siap dalam melakukan proses persalinan di kemudian hari.";
    $scope.status = 'Rendah';
    }else if($scope.hasil <= 83.33){
      $scope.print = "Tingkat risiko kehamilan Anda masuk ke dalam kategori risiko tinggi. Hal ini menunjukkan bahwa Anda perlu mempersiapkan rencana persalinan yang mampu ditangani oleh bidan atau dokter dengan tempat rujukan poliklinik desa atau rumah sakit."+
                 "Penanganan dari dokter diperlukan dikarenakan kehamilan dengan risiko tinggi memerlukan penanganan khusus yang mampu dilakukan oleh dokter. Meskipun, dalam beberapa hal sederhana seperti kelahiran normal dapat dibantu oleh bidan."+
                 "Perencanaan ini perlu dilakukan agar Anda lebih siap dalam melakukan proses persalinan di kemudian hari.";
    $scope.status = 'Tinggi';
    }else{
      $scope.print = "Tingkat risiko kehamilan Anda masuk ke dalam kategori risiko sangat tinggi. Hal ini menunjukkan bahwa Anda perlu mempersiapkan rencana persalinan yang mampu ditangani oleh dokter dengan tempat rujukan rumah sakit."+
                 "Penanganan dari dokter diperlukan dikarenakan kehamilan dengan risiko tinggi memerlukan penanganan khusus yang hanya mampu dilakukan oleh dokter."+
                 "Perencanaan ini perlu dilakukan agar Anda lebih siap dalam melakukan proses persalinan di kemudian hari.";
     $scope.status = 'Sangat Tinggi';
    }

    if($scope.hasil >=100){
     $scope.hasil = 100;
    }

    $scope.moms_id = $localstorage.get('selected_mom_id');

    $scope.params = {
      score : $scope.hasil,
      risk : $scope.print,
      id : $localstorage.get('selected_quarter_id'),
      status : $scope.status,
      moms_id : $scope.moms_id
    }
    $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
    Api.updateQuarterly($scope.params).success(function(res){
      $ionicLoading.hide();
      $scope.showAlertSuccess2();

    }).error(function(res){
      $ionicLoading.hide();
      $scope.showAlert2();
    });




    }

    $scope.showAlertSuccess2 = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Berhasil Disimpan',
        template: 'Analisis Berhasil Disimpan'
      });
      alertPopup.then(function(res) {
       var id = $localstorage.get('selected_quarter_id');
        $scope.closeModal();
        $localstorage.set('selected_quarter_id', id);
        $state.go('modal.done');
      });
    };

    $scope.showAlert2 = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Terjadi Kesalahan',
        template: 'Terjadi kesalahan saat menyimpan data'
      });
      alertPopup.then(function(res) {
        //$state.go('app.cart');
      });
    };

    $scope.inference = function(rendah, sedang, tinggi){
     var z,z1,z2,z3,z4,z5,z6,z7,z8,z9,z10,z11,z12,z13,z14,z15,z16,z17,z18;


     //implikasi rule
     var	r1 = Math.min(rendah[0],sedang[0],tinggi[0]);
     var	r2 = Math.min(rendah[0],sedang[0],tinggi[1]);
     var	r3 = Math.min(rendah[0],sedang[1],tinggi[0]);
     var	r4 = Math.min(rendah[1],sedang[1],tinggi[1]);
     var	r5 = Math.min(rendah[1],sedang[2],tinggi[0]);
     var	r6 = Math.min(rendah[1],sedang[2],tinggi[1]);
     var	r7 = Math.min(rendah[2],sedang[0],tinggi[0]);
     var	r8 = Math.min(rendah[2],sedang[0],tinggi[1]);
     var	r9 = Math.min(rendah[2],sedang[1],tinggi[0]);
     var	r10 = Math.min(rendah[0],sedang[1],tinggi[1]);
     var	r11 = Math.min(rendah[0],sedang[2],tinggi[0]);
     var	r12 = Math.min(rendah[0],sedang[2],tinggi[1]);
     var	r13 = Math.min(rendah[1],sedang[0],tinggi[0]);
     var	r14 = Math.min(rendah[1],sedang[0],tinggi[1]);
     var	r15 = Math.min(rendah[1],sedang[1],tinggi[0]);
     var	r16 = Math.min(rendah[2],sedang[1],tinggi[1]);
     var	r17 = Math.min(rendah[2],sedang[2],tinggi[0]);
     var	r18 = Math.min(rendah[2],sedang[2],tinggi[1]);

     //menghitung z
     z1 = parseFloat(118 - (r1*(118-2)));
     z2 = parseFloat(118 - (r2*(118-2)));
     z3 = parseFloat(118 - (r3*(118-2)));
     z4 = parseFloat(118 - (r4*(118-2)));
     z5 = parseFloat(118 - (r5*(118-2)));
     z6 = parseFloat(118 - (r6*(118-2)));
     z7 = parseFloat(118 - (r7*(118-2)));
     z8 = parseFloat(118 - (r8*(118-2)));
     z9 = parseFloat(118 - (r9*(118-2)));
     z10 = parseFloat(118 - (r10*(118-2)));
     z11 = parseFloat(118 - (r11*(118-2)));
     z12 = parseFloat(118 - (r12*(118-2)));
     z13 = parseFloat(118 - (r13*(118-2)));
     z14 = parseFloat(118 - (r14*(118-2)));
     z15 = parseFloat(118 - (r15*(118-2)));
     z16 = parseFloat(118 - (r16*(118-2)));
     z17 = parseFloat(118 - (r17*(118-2)));
     z18 = parseFloat(118 - (r18*(118-2)));


     //defuzzifikasi
     z = ((z1*r1)+(z2*r2)+(z3*r3)+(z4*r4)+(z5*r5)+(z6*r6)+(z7*r7)+(z8*r8)+(z9*r9)+(z10*r10)+(z11*r11)+(z12*r12)+(z13*r13)+(z14*r14)+(z15*r15)+(z16*r16)+(z17*r17)+(z18*r18))/(r1+r2+r3+r4+r5+r6+r7+r8+r9+r10+r11+r12+r13+r14+r15+r16+r17+r18);

     return z;
    }

    $scope.grupRendah = function(total_rendah){
     var xrendah, xsedang, xtinggi;

    	//menghitung nilai range kecil
    	if (total_rendah <= 2) {	// x < 2
    		xrendah=1;
    	}else if((total_rendah >= 2) && (total_rendah <= 18)) { // 2<=x && x<=18
    		xrendah = parseFloat((18 - total_rendah)/(18 - 2));
    	}else{ // x>18
    		xrendah = 0;
    	}


    	//menghitung nilai range sedang
    	if ((total_rendah <= 12) || (total_rendah >= 32)) {	//x<=12 atau x>= 32
    		xsedang=0;
    	}else if ((total_rendah >= 12) && (total_rendah <= 22)) { // 12<=x && x<=22
    		xsedang = parseFloat((total_rendah - 12)/(22 - 12));
    	}else if ((total_rendah >= 22) && (total_rendah <= 32)) { // 22<=x && x<=32
    		xsedang = parseFloat((32 - total_rendah)/(32 - 22));
    	}


    	//menghitung nilai range tinggi
    	if (total_rendah <= 24) {	//x<=24
    		xtinggi=0;
    	}else if(total_rendah >= 24 && total_rendah <= 42){ // 24<x && x<=42
    		xtinggi = parseFloat((total_rendah - 24)/(42 - 24));
    	}else	{ //x > 42
    		xtinggi= 1;
    	}


    	/*===========================================================
    			TAHAPAN OPERASI FUZZY LOGIC MENGGUNAKAN "OR" ATAU "MAX"
    	  ===========================================================*/
    	//mfuzzy = Math.max(xrendah,xsedang,xtinggi);
    	var mfuzzy = [xrendah,xsedang,xtinggi];
    	return mfuzzy;
    }

    $scope.grupTinggi = function(total_tinggi){
     var xrendah, xsedang, xtinggi;

     /*======================
       TAHAPAN FUZZIFIKASI
       ======================*/
     //menghitung nilai range kecil
     if (total_tinggi <= 0) {	// x<=0
      xrendah=1;
     }else if ((total_tinggi >= 0) && (total_tinggi <= 20)) { // 0<=x && x<=20
      xrendah = parseFloat((20 - total_tinggi)/(20 - 0));
     }else{ // x>20
      xrendah = 0;
     }


     //menghitung nilai range sedang
     if ((total_tinggi <= 12) || (total_tinggi => 32)) {	//x<=12 atau x>= 32
      xsedang=0;
     }else if ((total_tinggi >= 12) && (total_tinggi <= 22)) { // 12<=x && x<=22
      xsedang = parseFloat((total_tinggi - 12)/(22 - 12));
     }else if ((total_tinggi >= 22) && (total_tinggi <= 32)) { // 22<=x && x<=32
      xsedang = parseFloat((32 - total_tinggi)/(32 - 22));
     }



     //menghitung nilai range tinggi
     if (total_tinggi <= 24) {	//x<=24
      xtinggi=0;
     }else if ((total_tinggi >= 24) && (total_tinggi <= 44)) { // 24<=x && x<=44
      xtinggi = parseFloat((total_tinggi - 24)/(44 - 24));
     }else	{ //x > 44
      xtinggi = 1;
     }


     /*===========================================================
       TAHAPAN OPERASI FUZZY LOGIC MENGGUNAKAN "OR" ATAU "MAX"
       ===========================================================*/
     //mfuzzy = Math.max(xrendah,xsedang,xtinggi);
     var mfuzzy = [xrendah,xsedang,xtinggi];
     return mfuzzy;
    }

    $scope.grupSangatTinggi = function(total_sangat_tinggi){
     var xrendah, xtinggi;

    	/*======================
    			TAHAPAN FUZZIFIKASI
    	  ======================*/
    	//menghitung nilai range sedang
    	if (total_sangat_tinggi <= 0) {	//x<=0
    		xrendah=1;
    	}else if ((total_sangat_tinggi >= 0) && (total_sangat_tinggi <= 24)) { // 0<=x && x<=24
    		xrendah = parseFloat((24 - total_sangat_tinggi)/(24 - 0));
    	}else{
    		xrendah = 0;
    	}


    	//menghitung nilai range tinggi
    	if (total_sangat_tinggi <= 6) {	//x<=6 atau x>= 32
    		xtinggi=0;
    	}else if ((total_sangat_tinggi >= 6) && (total_sangat_tinggi <= 32)) { // 6<=x && x<=32
    		xtinggi = parseFloat((total_sangat_tinggi - 6)/(32 - 6));
    	}else{ // x>32
    		xtinggi =1;
    	}


    	/*===========================================================
    			TAHAPAN OPERASI FUZZY LOGIC MENGGUNAKAN "OR" ATAU "MAX"
    	  ===========================================================*/
    	//mfuzzy = Math.max(xrendah,xtinggi);
    	var mfuzzy = [xrendah,xtinggi];
    	return mfuzzy;
    }


  ionicMaterialInk.displayEffect();

});
