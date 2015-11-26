'use strict';

angular.module('oficiosApp')
  .controller('TurnoDestinatariosCtrl', function ($scope, Turno, Flash) {
  	Flash.clear();
    $scope.destinatarios=Turno.getall({turnado:true});
    $scope.destinatario={};

    $scope.ocultar=true;

    $scope.nuevo=function () {
    	// body...
    	$scope.destinatario={};
    	$scope.ocultar=false;
    }

    $scope.edit=function (d) {
    	angular.copy(d,$scope.destinatario)
    	$scope.ocultar=false;
    }

    $scope.guardar=function () {
    	// body...
    	Flash.clear();
    	Turno.updateturnado($scope.destinatario, function () {
    		// body...
    		$scope.ocultar=true;
    			$scope.destinatarios=Turno.getall({turnado:true});
    		Flash.addAlert({type:'success', msg:"Se ha guardado correctamente el registro."});

    	})
    }

    $scope.borrar=function (id) {
    	// body...
    	Flash.clear();
    	Turno.deleteturnado({id:id}, function () {
    		// body...
    		$scope.ocultar=true;
    			$scope.destinatarios=Turno.getall({turnado:true});
    		Flash.addAlert({type:'success', msg:"Se ha borrado correctamente el registro."});

    	})
    }
  });
