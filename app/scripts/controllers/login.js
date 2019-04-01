'use strict';

angular.module('oficiosApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, user, Flash, $http, $window) {

  if(user.isLogged){
    $location.path( "/");
  }

  $scope.login=function (submit) {
  	$scope.user={
  		login: $("#login").val(),
        password: $("#password").val()
  	};

    Flash.clear();

    if((/\s/).test($scope.user.login) || (/\s/).test($scope.user.login))
      Flash.addAlert({type:'danger', msg:'Sus datos de acceso <b>no</b> deben contener espacios en blanco.'});

    var config = {
    	url:'ci/index.php/user/login',
    	params:$scope.user,
    	method:"POST"
    }
    $http(config)
    .success(function(data, status, headers, config) {
      if (data.status) {
        user.login(data.user);
       $window.location.reload()
      }
      else {
        user.isLogged = false;
        Flash.addAlert({type:'danger', msg:'Usuario y/o contraseña no validos'});
      }
    })
    .error(function(data, status, headers, config) {
      user.isLogged = false;
      Flash.addAlert({type:'danger', msg:'Error inesperado.'});
    });

    function ajaxCallback() {
        submit();
    }
    return false;
  }

  });
