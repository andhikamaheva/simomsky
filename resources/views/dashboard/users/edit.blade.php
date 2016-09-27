@extends('dashboard.template.index')
@section('css')
 <link rel="stylesheet" type="text/css" href="{{asset('global/plugins/select2/select2.css')}}"/>
@stop
@section('content')
<div class="tab-content">
 <div class="tab-pane active" id="tab_0">
  <div class="portlet box green">
   <div class="portlet-title">
    <div class="caption">
     <i class="fa fa-gift"></i>
    </div>
    <div class="tools">
     <a href="javascript:;" class="collapse">
     </a>
     <a href="#portlet-config" data-toggle="modal" class="config">
     </a>
     <a href="javascript:;" class="reload">
     </a>
     <a href="javascript:;" class="remove">
     </a>
    </div>
   </div>
   <div class="portlet-body form">
    <!-- BEGIN FORM-->
    <form action="{{URL('dashboard/users/')}}/{{$data->id}}" method="post" class="form-horizontal">
     <input type="hidden" name="_token" value="{{csrf_token()}}"/>
     <div class="form-body">
      <div class="form-group">
       <label class="col-md-3 control-label">Username</label>
       <div class="col-md-4">
        <input type="text" disabled class="form-control input-circle" name="username" placeholder="Masukkan Username" value="{{$data->username}}">
       </div>
      </div>
      <div class="form-group">
       <label class="col-md-3 control-label">Password</label>
       <div class="col-md-4">
        <div class="input-group">
         <input type="password" class="form-control input-circle-left" name="password" placeholder="Masukkan Password">
         <span class="input-group-addon input-circle-right">
         <i class="fa fa-lock"></i>
         </span>
        </div>
       </div>
      </div>
      <div class="form-group">
       <label class="col-md-3 control-label">Alamat Email</label>
       <div class="col-md-4">
        <div class="input-group">
         <span class="input-group-addon input-circle-left">
         <i class="fa fa-envelope"></i>
         </span>
         <input type="email" name="email" class="form-control input-circle-right" placeholder="Masukkan Alamat Email" value="{{$data->email}}">
        </div>
       </div>
      </div>
      <div class="form-group">
       <label class="col-md-3 control-label">Nama Lengkap</label>
       <div class="col-md-4">
        <input type="text" name="name" class="form-control input-circle" placeholder="Masukkan Nama Lengkap" value="{{$data->name}}">
       </div>
      </div>
      <div class="form-group">
       <label class="col-md-3 control-label">Alamat</label>
       <div class="col-md-4">
        <input type="text" name="address" class="form-control input-circle" placeholder="Masukkan Alamat Lengkap" value="{{$data->address}}">
       </div>
      </div>
      <div class="form-group last">
       <label class="col-md-3 control-label">No. Telp</label>
       <div class="col-md-4">
        <input type="text" name="phone" class="form-control input-circle" placeholder="Masukkan Nomor Telepon" value="{{$data->phone}}">
       </div>
      </div>

     </div>
     <div class="form-actions">
      <div class="row">
       <div class="col-md-offset-3 col-md-9">
        <button type="submit" class="btn btn-circle blue">Simpan</button>
        <button type="button" class="btn btn-circle default">Batal</button>
       </div>
      </div>
     </div>
    </form>
    <!-- END FORM-->
   </div>
  </div>
</div>
</div>
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
<script type="text/javascript" src="{{asset('global/plugins/select2/select2.min.js')}}"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="{{asset('global/scripts/metronic.js')}}" type="text/javascript"></script>
<script src="{{asset('admin/layout4/scripts/layout.js')}}" type="text/javascript"></script>
<script src="{{asset('admin/layout4/scripts/demo.js')}}" type="text/javascript"></script>
<script src="{{asset('admin/pages/scripts/form-samples.js')}}"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<script>
jQuery(document).ready(function() {
   // initiate layout and plugins
   Metronic.init(); // init metronic core components
Layout.init(); // init current layout
Demo.init(); // init demo features
   FormSamples.init();
});
</script>
@stop
