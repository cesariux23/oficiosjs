'use strict';

angular
.module('oficiosApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'angularShamSpinner'
  ])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    isFree:true,
    pageKey:'I',
  })
  .when('/emision/', {
    templateUrl: 'views/emision.html',
    controller: 'EmisionCtrl',
    pageKey:'E'
  })
  .when('/emision/nuevo', {
    templateUrl: 'views/emision/nuevo.html',
    controller: 'EmisionNuevoCtrl',
    pageKey:'E'
  })
  .when('/recepcion', {
    templateUrl: 'views/recepcion.html',
    controller: 'RecepcionCtrl',
    pageKey:'R'
  })
  .when('/turno', {
    templateUrl: 'views/turno.html',
    controller: 'TurnoCtrl',
    pageKey:'T',
  })
  .when('/turno/nuevo', {
    templateUrl: 'views/turno/nuevo.html',
    controller: 'TurnoNuevoCtrl',
    pageKey:'T',
  })
  .when('/paquete/nuevo', {
    templateUrl: 'views/paquete/nuevo.html',
    controller: 'PaqueteNuevoCtrl',
    pageKey:'P'
  })
  .when('/user', {
    templateUrl: 'views/user.html',
    controller: 'UserCtrl',
    pageKey:'C'
  })
  .when('/busqueda', {
    templateUrl: 'views/busqueda.html',
    controller: 'BusquedaCtrl',
    pageKey:'B'
  })
  .when('/paquete', {
    templateUrl: 'views/paquete.html',
    controller: 'PaqueteCtrl',
    pageKey:'P'
  })
  .when('/emision/edit/:id', {
    templateUrl: 'views/emision/edit.html',
    controller: 'EmisionEditCtrl',
    pageKey:'E'
  })
  .when('/turno/edit/:id', {
    templateUrl: 'views/turno/nuevo.html',
    controller: 'TurnoEditCtrl',
    pageKey:'T'
  })
  .when('/turno/view/:id', {
    templateUrl: 'views/turno/view.html',
    controller: 'TurnoViewCtrl',
    pageKey:'T'
  })
  .when('/turno/destinatarios', {
    templateUrl: 'views/turno/destinatarios.html',
    controller: 'TurnoDestinatariosCtrl',
    pageKey:'T'
  })
  .otherwise({
    redirectTo: '/'
  });
})
.factory("Flash", function($rootScope){
  $rootScope.flash=[];
  return {
    addAlert : function(message){
      $rootScope.flash.push(message);
    },
    clear : function(){
      $rootScope.flash = [];
    }
  }
})
.factory("Utils", function($rootScope){
  return {
    conviertefecha : function(fecha){
      var date;
      date = fecha.getFullYear() + '-' +
      ('00' + (fecha.getMonth()+1)).slice(-2) + '-' +
      ('00' + fecha.getDate()).slice(-2);
      return date;
    },
    conviertefechayhora : function(fecha){
        var date;
        date = fecha.getFullYear() + '-' +
        ('00' + (fecha.getMonth()+1)).slice(-2) + '-' +
        ('00' + fecha.getDate()).slice(-2) + ' ' +
        ('00' + fecha.getHours()).slice(-2) + ':' +
        ('00' + fecha.getMinutes()).slice(-2) + ':00';// +
        //('00' + fecha.getSeconds()).slice(-2);
        console.log(date);
        return date;
        },
    fechaiso: function (fecha) {
// body...
var p = fecha.split(/[- :]/);
/* new Date(year, month [, day, hour, minute, second, millisecond]); */
fecha = new Date(p[0], p[1]-1, p[2],"00","00","00");
//input = new Date(input).toISOString();
return fecha;

}
}
})
.filter('dateToISO', function() {
  return function(input) {
    if(typeof(input) != 'undefined' && input!==null){
      var p = input.split(/[- :]/);
      /* new Date(year, month [, day, hour, minute, second, millisecond]); */
      input = new Date(p[0], p[1]-1, p[2], p[3], p[4], p[5]);
//input = new Date(input).toISOString();
return input;
}
};
})
.directive("ngLoginSubmit", function(){
return {
    restrict: "A",
    scope: {
        onSubmit: "=ngLoginSubmit"
    },
    link: function(scope, element, attrs) {
        $(element)[0].onsubmit = function() {
            $("#login-login").val($("#login", element).val());
            $("#login-password").val($("#password", element).val());

            scope.onSubmit(function() {
                $("#login-form")[0].submit();
            });
            return false;
        };
    }
};
})
.run( function ($rootScope, user, $http, $route, Flash, $location, $cookieStore)
{
//al cambiar de rutas
$rootScope.$on('$routeChangeStart', function(angularEvent,
 currentRoute,
 previousRoute)
{
  var anterior=$cookieStore.get('rutaAnterior');
  if(!currentRoute.isFree && !user.isLogged){
    Flash.clear();
    Flash.addAlert({type:'warning', msg:'Se requiere autenticación.'});
    if(!anterior)
      $cookieStore.put('rutaAnterior',$location.path());
    $location.path("/login");
  }
  else{
    //si ha iniciado sesion
    if(user.isLogged){
    //si no ha cambiado su contraseña entonces se redireccionara siempre a configuracion inicial
    if(user.data.cambioContra=="0"){
      $location.path("/user");
    }else{
      if($location.path().toLowerCase()=="/login"){
        if(anterior){
          console.log('anterior', anterior);
          $location.path(anterior);
          $cookieStore.remove("rutaAnterior");
          }
          else{
            //manda al inicio
              $location.path(user.home);
              //$location.path("/");
          }
      }
    }
  }
}
  /*
else{


  if(!currentRoute.isFree){
    if(currentRoute.rol.indexOf(User.rol)>0)
      console.log('si');
    else{
      if(User.rol==2){
        $location.path("/bitacora");
      }
    }
  }
}*/
});


$rootScope.$on("$routeChangeSuccess",
 function (angularEvent,
   currentRoute,
   previousRoute) {

  var pageKey = currentRoute.pageKey;
  $(".pagekey").toggleClass("active", false);
  $(".pagekey_" + pageKey).toggleClass("active", true);
});
})


function AlertCtrl($rootScope) {
  $rootScope.closeAlert = function(index) {
    $rootScope.flash.splice(index, 1);
  };

}
function sesionCtrl($scope, user) {
  $scope.user=user;
  $scope.logout=function(){
    user.logout();
  }
}
