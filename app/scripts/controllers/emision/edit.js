'use strict';

angular.module('oficiosApp')
  .controller('EmisionEditCtrl', function ($scope, Emision, $routeParams,$location, Flash, catalogos, user, $http, $filter) {
    //limpiar ensajes
    Flash.clear();

    //inicializa variables
    $scope.doc=Emision.get({id:$routeParams.id});
    $scope.tipodoc=catalogos.tipodoc;

    $http.get('ci/index.php/utils/hoy').success(function (data) {
        //recupera la fecha del servidor
        $scope.hoy=$filter('dateToISO')(data);
        //Se quita 1 hora de tolerancia
        $scope.hoy.setHours( $scope.hoy.getHours() -1);
    });

    //se cargan los departamentos
    catalogos.getdepartamentos(user.data.idArea).then(
        function (d) {
            // body...
            $scope.deptos=d.data;
        }
        );
    //tiene depto??
    $scope.d=!!user.data.depto;

    

    $scope.guardar=function () {
    	// body...
    	$scope.doc.estado=1;
    	Emision.update({},$scope.doc, function () {
    		Flash.clear();
  			Flash.addAlert({type:'success', msg:'Se han guardado correctamente los cambios.'});
  			$location.path('/emision');
    	});
    }
  });
