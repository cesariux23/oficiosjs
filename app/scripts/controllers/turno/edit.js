'use strict';

angular.module('oficiosApp')
  .controller('TurnoEditCtrl', function ($scope, Turno, $routeParams, Flash, $location) {
  	Flash.clear();

    $scope.isopen=true;
    $scope.isopen2=true;
    $scope.max=new Date();
    $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
    };
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = !$scope.opened;
    };
    $scope.open2 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened2 =!$scope.opened2;
    };
    
  	$scope.turno=Turno.get({id:$routeParams.id});

    $scope.cambiaturno=function () {
        if($scope.turno.urgente==0){
            $scope.turno.urgente=1;
        }else
        $scope.turno.urgente=0;

        console.log('cambia! '+$scope.turno.urgente);
    }

  	$scope.guardar=function () {
  		$scope.notienedestinatario=false;
  		//si tiene destinatario el turno se guarda
  		if($scope.turno.turnado && $scope.turno.cargoturnado){
  			Turno.update({},$scope.turno,function () {
  				// se notifica
                Flash.clear();
                Flash.addAlert({type:'success', msg:"Se ha guardado correctamente los cambios al turno <b>"+$scope.turno.turno+"</b>."});
                $location.path('/turno');
  			})
  		}
  		else{
  			$scope.notienedestinatario=true;
  		}
  	}
  });
