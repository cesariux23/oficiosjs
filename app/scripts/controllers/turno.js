'use strict';
//crea el resource para Paquetes
angular.module('oficiosApp')
.factory('Turno', ['$resource', function($resource){
	return $resource('ci/index.php/turno/:id', {id:'@id'}, {
		'update':{
			method: 'PUT',
			isArray: false 
		}//,
		//'save':  {method:'POST', isArray:true}
		,
		'getall':  {method:'GET', isArray:true},
		'updateturnado':{url:'ci/index.php/turno/updateturnado', method:'POST'},
		'deleteturnado':{url:'ci/index.php/turno/deleteturnado/:id', method:'DELETE'}

	});
}])
  .controller('TurnoCtrl', function ($scope,Turno, catalogos, Flash) {
  	$scope.tipo=catalogos.tipodoc;


  	//carga la fecha de hoy
    $scope.actual=function () {
      var hoy=new Date();
      var m=hoy.getMonth();
      var a=hoy.getFullYear();
      //var d=hoy.getDate();
      $scope.mes=m;
      $scope.messeleccionado=m;
      $scope.anio=a;
      $scope.hoy=hoy;
    //Se quita 1 hora de tolerancia
    $scope.hoy.setHours(hoy.getHours() -1);
    }

    $scope.actual();
    $scope.meses=catalogos.meses;
    //se carga el mes actual
    $scope.turnos=Turno.query({a:$scope.anio,m:$scope.messeleccionado+1});

    $scope.cambiames=function (m){
      if(m<0){
        $scope.anio-=1;
        m=11;
      }
      else{
        if(m>11){
          $scope.anio+=1;
          m=0;
        }
      }
      $scope.messeleccionado=m;
      $scope.turnos=Turno.query({a:$scope.anio,m:$scope.messeleccionado+1});
    }


  	$scope.confirmarb= function(t){
		$scope.turnob=t;
	}


	$scope.borrar=function(){
		//Se borra el paquete
		Turno.delete({id:$scope.turnob.id}, function () {
			//se elimina del arreglo
			$scope.turnos.splice($scope.turnos.indexOf($scope.turnob),1);

			// se notifica
			Flash.clear();
	    	Flash.addAlert({type:'success', msg:"Paquete borrado correctamente"});
		});
	}
  });
