<!-- BEGIN HEADER INNER -->
<div class="page-header-inner">
 <!-- BEGIN LOGO -->
 <div class="page-logo">
  <a href="{{URL('dashboard')}}">
  <img src="{{asset('img/SI Momsky-Full2.png')}}" style="height:70px;width:175px;margin-top:0px;" alt="logo" class="logo-default"/>
  </a>
  <div class="menu-toggler sidebar-toggler hide">
   <!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->
  </div>
 </div>
 <!-- END LOGO -->
 <!-- BEGIN RESPONSIVE MENU TOGGLER -->
 <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
 </a>
 <!-- END RESPONSIVE MENU TOGGLER -->
 <!-- BEGIN PAGE ACTIONS -->
 <!-- DOC: Remove "hide" class to enable the page header actions -->
<!-- END PAGE ACTIONS -->
 <!-- BEGIN PAGE TOP -->
 <div class="page-top">
  <!-- BEGIN HEADER SEARCH BOX -->
  <!-- DOC: Apply "search-form-expanded" right after the "search-form" class to have half expanded search box -->
 <!-- END HEADER SEARCH BOX -->
  <!-- BEGIN TOP NAVIGATION MENU -->
  <div class="top-menu">
   <ul class="nav navbar-nav pull-right">
    <li class="separator hide">
    </li>
   
    <li class="separator hide">
    </li>
    
    <li class="separator hide">
    </li>
    <!-- BEGIN TODO DROPDOWN -->
    <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
   <!-- END TODO DROPDOWN -->
    <!-- BEGIN USER LOGIN DROPDOWN -->
    <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
    <li class="dropdown dropdown-user dropdown-dark">

     <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"><i class="fa fa-user"></i>
     <span class="username username-hide-on-mobile">
     {{$user->name}} </span>
     <!-- DOC: Do not remove below empty space(&nbsp;) as its purposely used
     <img alt="" class="img-circle" src="../../assets/admin/layout4/img/avatar9.jpg"/>
     -->
     </a>
     <ul class="dropdown-menu dropdown-menu-default">
     
      <li>

       <a href="{{URL('logout')}}">
       <i class="icon-key"></i> Log Out </a>
      </li>
     </ul>
    </li>
    <!-- END USER LOGIN DROPDOWN -->
    <!-- BEGIN USER LOGIN DROPDOWN -->
    <!-- END USER LOGIN DROPDOWN -->
   </ul>
  </div>
  <!-- END TOP NAVIGATION MENU -->
 </div>
 <!-- END PAGE TOP -->
</div>
<!-- END HEADER INNER -->
