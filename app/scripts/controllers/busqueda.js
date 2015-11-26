'use strict';

angular.module('oficiosApp')
  .controller('BusquedaCtrl', function ($scope, catalogos, $http, user) {
  	$scope.b={area:user.data.idArea};
    $scope.tipodoc=catalogos.tipodoc;
    $scope.mostrarpanel=true;
    $scope.anios=[];
    var actual=new Date().getFullYear();
    for (var i = actual; i>=2013; i--) {
    	$scope.anios.push(i);
    };

    $scope.buscar=function () {
    	//Se busca en la base de datos
    	$http.post('ci/index.php/emision/search',$scope.b).success(function (data) {
    		$scope.resultados=data;
    		$scope.mostrarpanel=false;

    	})
    	

    }
  });
