@extends('dashboard.template.index')
@section('css')
<link href="{{asset('global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('global/plugins/fullcalendar/fullcalendar.min.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('global/plugins/jqvmap/jqvmap/jqvmap.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('global/plugins/morris/morris.css')}}" rel="stylesheet" type="text/css">
@stop
@section('content')

<!-- BEGIN PAGE BREADCRUMB -->

<!-- END PAGE BREADCRUMB -->
<!-- BEGIN PAGE CONTENT INNER -->
<div class="row margin-top-10">
 <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
  <div class="dashboard-stat2">
   <div class="display">
    <div class="number">
     <h3 class="font-green-sharp">{{$momscount}}<small class="font-green-sharp"></small></h3>
     <small>TOTAL MOM'S</small>
    </div>
    <div class="icon">
     <i class="icon-heart"></i>
    </div>
   </div>
   <div class="progress-info">
    <div class="progress">
     <span style="width: 100%;" class="progress-bar progress-bar-success green-sharp">

     </span>
    </div>
   </div>
  </div>
 </div>
 <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
  <div class="dashboard-stat2">
   <div class="display">
    <div class="number">
     <h3 class="font-red-haze">{{$userscount}}</h3>
     <small>TENAGA KESEHATAN</small>
    </div>
    <div class="icon">
     <i class="icon-users"></i>
    </div>
   </div>
   <div class="progress-info">
    <div class="progress">
     <span style="width: 100%;" class="progress-bar progress-bar-success red-haze">

     </span>
    </div>
 </div>
  </div>
 </div>
 <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
  <div class="dashboard-stat2">
   <div class="display">
    <div class="number">
     <h3 class="font-blue-sharp">{{$pregnantscount}}</h3>
     <small>KEHAMILAN</small>
    </div>
    <div class="icon">
     <i class="icon-emoticon-smile"></i>
    </div>
   </div>
   <div class="progress-info">
    <div class="progress">
     <span style="width: 100%;" class="progress-bar progress-bar-success blue-sharp">
     </span>
    </div>
  </div>
  </div>
 </div>
 <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
  <div class="dashboard-stat2">
   <div class="display">
    <div class="number">
     <h3 class="font-purple-soft">{{$feedbackcount}}</h3>
     <small>UMPAN BALIK</small>
    </div>
    <div class="icon">
     <i class="icon-envelope-open"></i>
    </div>
   </div>
   <div class="progress-info">
    <div class="progress">
     <span style="width: 100%;" class="progress-bar progress-bar-success purple-soft">
     </span>
    </div>
 </div>
  </div>
 </div>
</div>
<div class="row">
 <div class="col-md-6 col-sm-12">
  <!-- BEGIN PORTLET-->
  <div class="portlet light ">
   <div class="portlet-title">
    <div class="caption caption-md">
     <i class="icon-bar-chart theme-font-color hide"></i>
     <span class="caption-subject theme-font-color bold uppercase">Aktifitas Pengguna</span>
   </div>
   </div>
   <div class="portlet-body">
   <div class="table-scrollable table-scrollable-borderless">
     <table class="table table-hover table-light">
     <thead>
     <tr >
      <th>
        Username
      </th>
      <th>
        Terakhir Login
      </th>

     </tr>
     </thead>
     <tbody>
      @foreach($latestlogin as $listlogin)
       <tr>
         <td>
          {{$listlogin->username}}
         </td>
         <td>
          {{$listlogin->latest_login}}
        </td>
       </tr>
      @endforeach
     </tbody>
</table>
    </div>
   </div>
  </div>
  <!-- END PORTLET-->
 </div>
</div>

<!-- END PAGE CONTENT INNER -->
@stop
@section('js')
<script src="{{asset('global/plugins/jquery.min.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/jquery-migrate.min.js')}}" type="text/javascript"></script>
<!-- IMPORTANT! Load jquery-ui.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
<script src="{{asset('global/plugins/jquery-ui/jquery-ui.min.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/bootstrap/js/bootstrap.min.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/jquery-slimscroll/jquery.slimscroll.min.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/jquery.blockui.min.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/jquery.cokie.min.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/uniform/jquery.uniform.min.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/bootstrap-switch/js/bootstrap-switch.min.js')}}" type="text/javascript"></script>
<!-- END CORE PLUGINS -->

<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="{{asset('global/plugins/jqvmap/jqvmap/jquery.vmap.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/jqvmap/jqvmap/maps/jquery.vmap.russia.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/jqvmap/jqvmap/maps/jquery.vmap.world.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/jqvmap/jqvmap/maps/jquery.vmap.europe.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/jqvmap/jqvmap/maps/jquery.vmap.germany.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/jqvmap/jqvmap/maps/jquery.vmap.usa.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/jqvmap/jqvmap/data/jquery.vmap.sampledata.js')}}" type="text/javascript"></script>
<!-- IMPORTANT! fullcalendar depends on jquery-ui.min.js for drag & drop support -->
<script src="{{asset('global/plugins/morris/morris.min.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/morris/raphael-min.js')}}" type="text/javascript"></script>
<script src="{{asset('global/plugins/jquery.sparkline.min.js')}}" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="{{asset('global/scripts/metronic.js')}}" type="text/javascript"></script>
<script src="{{asset('admin/layout4/scripts/layout.js')}}" type="text/javascript"></script>
<script src="{{asset('admin/layout2/scripts/quick-sidebar.js')}}" type="text/javascript"></script>
<script src="{{asset('admin/layout4/scripts/demo.js')}}" type="text/javascript"></script>
<script src="{{asset('admin/pages/scripts/index3.js')}}" type="text/javascript"></script>
<script src="{{asset('admin/pages/scripts/tasks.js')}}" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<script>
jQuery(document).ready(function() {
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
   Demo.init(); // init demo features
   QuickSidebar.init(); // init quick sidebar
    Index.init(); // init index page
 Tasks.initDashboardWidget(); // init tash dashboard widget
});
</script>

@stop
