'use strict';
//crea el resource para Emision
angular.module('oficiosApp')
.factory('Emision', ['$resource', function($resource){
	return $resource('ci/index.php/emision/:id', {id:'@id'}, {
		'update':{
			method: 'PUT',
			isArray: false 
		},
		'save':  {method:'POST', isArray:true}

	});
}])
.controller('EmisionCtrl', function ($scope, Emision, Flash, catalogos, user, $http, $filter) {
	$scope.doc={};
  $scope.tipo=catalogos.tipodoc;
  $scope.tipoe=catalogos.tipoemi;
  //tiene depto??
  $scope.d=!!user.data.depto;

  if(!$scope.d){
    //se cargan los departamentos
    catalogos.getdepartamentos(user.data.idArea).then(
      function (d) {
        $scope.deptos=d.data;
      }
    );
  }
  

  //carga la fecha de hoy
    $scope.actual=function () {
      $http.get('ci/index.php/utils/hoy').success(function (data) {
        //recupera la fecha del servidor
        $scope.hoy=$filter('dateToISO')(data);
        //Se quita 1 hora de tolerancia
        $scope.hoy.setHours($scope.hoy.getHours() -1);
        var m=$scope.hoy.getMonth();
        var a=$scope.hoy.getFullYear(); 
        $scope.mes=m;
        $scope.messeleccionado=m;
        $scope.anio=a;
        //se carga el mes actual
        //$scope.emision=Emision.query({a:$scope.anio,m:$scope.messeleccionado+1, area:user.data.idArea});
        $scope.cambiames(m);
      });      
    }

    $scope.actual();
    $scope.meses=catalogos.meses;
    

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
      var r={a:$scope.anio,m:$scope.messeleccionado+1, area:user.data.idArea};
      if($scope.d){
        r.depto=user.data.idDepartamento;
      }
      $scope.emision=Emision.query(r);
    }

	$scope.detalles=function (e,c) {
  		// body...
  		$scope.doc=e;
  		$scope.cancelar=c;
  		$scope.motivo='';
  	}

  	$scope.cancelardoc=function() {
  		
  		var doc={id:$scope.doc.id,estado:2,motivocancelacion:$scope.motivo};
  		console.log(doc);
  		Emision.update({},doc, function() {
  			Flash.clear();
  			$scope.doc.estado=2;
  			Flash.addAlert({type:'success', msg:'Se ha cancelado correctamente el documento.'});
  		})
  	}


    //valida que la fecha para cancelar
    $scope.validacancelar=function (h,e) {
      // se comparan las fechas
      var d1=new Date(h.getFullYear(), h.getMonth(), h.getDate());
      var d2=new Date(e.getFullYear(), e.getMonth(), e.getDate());
      return (d1.getTime()==d2.getTime());
    }

  });

