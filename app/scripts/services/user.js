'use strict';

angular.module('oficiosApp')
.factory('user', function ($cookieStore, $location, $q, $http) {
  //se busca si esta loggeado en las cookies
  var isLogged=$cookieStore.get('isLogged');
  //objeto user
  var user={};
  //si existe la cookie, se cargan los datos a la app
  if(isLogged){
    user.isLogged=isLogged;
    user.data=$cookieStore.get('userData');
    user.home=$cookieStore.get('userHome', user.home);
  }
  else
    //si no, no esta logueado
    user={isLogged:false};

  //al loguear, se crea la cookie y el objeto user
  user.login=function(data){
    $cookieStore.put('isLogged',true);
    $cookieStore.put('userData', data);
    user.isLogged=true;
    user.data=data;
    console.log(data.idArea);
    //se guarda el home
    if(data.idArea=="3")
      user.home="/turno";
    else
      user.home="/";

    $cookieStore.put('userHome', user.home);
  }

  //al salir se borran los datos
  user.logout=function(){
    $cookieStore.remove("isLogged");
    $cookieStore.remove("userData");
    $cookieStore.remove("userHome");
    user.isLogged=false;
    user.data="";
    //redirecciona al login
    $location.path("/login");
  }

  //actualizar
  user.update= function (u) {
    var def=$q.defer();
    u.cambioContra=1;
    $http.post('ci/index.php/user',u)
      .then(function(data) {
        def.resolve(data);
      });
    return def.promise;
  }

  return user;
});
