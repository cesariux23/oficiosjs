'use strict';

angular.module('oficiosApp')
  .controller('TurnoViewCtrl', function ($scope, Turno, $routeParams) {
  	$scope.turno=Turno.get({id:$routeParams.id});
  	$scope.hoy=new Date();
  	$scope.via=["MENSAJERO","MENSAJERÍA"];

  	$scope.print=function () {
  		// body...
  		window.print();
  	}
  });
