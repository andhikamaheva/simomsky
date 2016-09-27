@extends('dashboard.template.index')
@section('css')
<link rel="stylesheet" type="text/css" href="{{asset('global/plugins/select2/select2.css')}}"/>
<link rel="stylesheet" type="text/css" href="{{asset('global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css')}}"/>
@stop

@section('content')
<div class="row">
 <div class="col-md-12">
  <!-- BEGIN EXAMPLE TABLE PORTLET-->
  <div class="portlet box grey-cascade">
   <div class="portlet-title">
    <div class="caption">
     List Pertanyaan
    </div>
   </div>
   <div class="portlet-body">
    <div class="table-toolbar">
   </div>
    <table class="table table-striped table-bordered table-hover" id="sample_1">
    <thead>
    <tr>
     <th class="table-checkbox">
      <input type="checkbox" class="group-checkable" data-set="#sample_1 .checkboxes"/>
     </th>
     <th>
       ID
     </th>
     <th>
       Nama
     </th>
     <th>
       Umur
     </th>
     <th>
       Kota
     </th>
     <th>
       Kehamilan Ke
     </th>
     <th>
       Status 
     </th>
    </tr>
    </thead>
    <tbody>

@foreach($moms as $mom)
<tr class="odd gradeX">
 <td>
  <input type="checkbox" class="checkboxes" value="1"/>
 </td>
 <td>
{{$mom->id}}
 </td>
 <td>
{{$mom->name}}
 </td>
 <td>
  {{$mom->age}}

 </td>
 <td>
{{$mom->city}}
 </td>

 <td  >
 {{$mom->pregnants}}
 </td>
 <td  >
 {{$mom->pregnant_status}}
 </td>
</tr>

@endforeach
  </tbody>
    </table>
   </div>
  </div>
  <!-- END EXAMPLE TABLE PORTLET-->
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
<script src=".{{asset('global/plugins/bootstrap-switch/js/bootstrap-switch.min.js')}}" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script type="text/javascript" src="{{asset('global/plugins/select2/select2.min.js')}}"></script>
<script type="text/javascript" src="{{asset('global/plugins/datatables/media/js/jquery.dataTables.min.js')}}"></script>
<script type="text/javascript" src="{{asset('global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js')}}"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="{{asset('global/scripts/metronic.js')}}" type="text/javascript"></script>
<script src="{{asset('admin/layout4/scripts/layout.js')}}" type="text/javascript"></script>
<script src="{{asset('admin/layout4/scripts/demo.js')}}" type="text/javascript"></script>
<script src="{{asset('admin/pages/scripts/table-managed.js')}}"></script>
<script>
jQuery(document).ready(function() {
   Metronic.init(); // init metronic core components
Layout.init(); // init current layout
Demo.init(); // init demo features
   TableManaged.init();
});
</script>
@stop

