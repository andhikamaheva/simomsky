<!-- BEGIN SIDEBAR -->
<div class="page-sidebar-wrapper">
 <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
 <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
 <div class="page-sidebar md-shadow-z-2-i  navbar-collapse collapse">
  <!-- BEGIN SIDEBAR MENU -->
  <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
  <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
  <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
  <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
  <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
  <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
  <ul class="page-sidebar-menu page-sidebar-menu-closed" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
   <li class="start active ">
    <a href="{{URL('dashboard')}}">
    <i class="icon-home"></i>
    <span class="title">Dashboard</span>
    </a>
   </li>
   <li>
     <a href="javascript:;">
     <i class="icon-user"></i>
     <span class="title">Pengguna</span>
     <span class="arrow "></span>
     </a>
     <ul class="sub-menu">
      <li>
       <a href="{{URL('dashboard/users/create')}}">
      Tambah Pengguna</a>
      </li>
      <li>
       <a href="{{URL('dashboard/users/')}}">
       Lihat Pengguna</a>
      </li>
   </ul>
  </li>
  <li>
    <a href="{{URL('dashboard/feedback')}}">
    <i class="fa fa-comment"></i>
    <span class="title">Feedback</span>
    <span class="arrow "></span>
    </a>
  </li>

  <li>
    <a href="javascript:;">
    <i class="icon-docs"></i>
    <span class="title">Analisis</span>
    <span class="arrow "></span>
    </a>
    <ul class="sub-menu">
     <li>
      <a href="{{URL('dashboard/analysis')}}">
     Analisis</a>
     </li>
     <li>
      <a href="{{URL('dashboard/result')}}">
      Hasil Analisis</a>
     </li></ul>
   </li>
   



  </ul>
  <!-- END SIDEBAR MENU -->
 </div>
</div>
<!-- END SIDEBAR -->
