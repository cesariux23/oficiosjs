'use strict';

//crea el resource para Paquetes
angular.module('oficiosApp')
.factory('Paquete', ['$resource', function($resource){
	return $resource('ci/index.php/paquete/:id', {id:'@id'}, {
		'update':{
			method: 'PUT',
			isArray: false 
		}//,
		//'save':  {method:'POST', isArray:true}
		,
		'getall':  {method:'GET', isArray:true}

	});
}]);


angular.module('oficiosApp')
  .controller('PaqueteCtrl', function ($scope, Flash, Utils, Paquete, $filter, $timeout, catalogos) {
  	//variables 

  	//areas
  	catalogos.getareas().then(function (areas) {
  		$scope.areas=areas.data;
  	});

  	//departamentos
  	catalogos.getdepartamentos(5).then(function (deptos) {
  		$scope.deptos=deptos.data;
  	});

  	$scope.nombremeses=catalogos.meses;
  	
  	//variable para el collapse
  	$scope.nuevo=true;

  	//variable para saber si edita o no 
  	$scope.edit=false;

  	//variable que almacena el objeto a borrar
  	$scope.paqueteb;



  	//datepiker
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

  	
  	//metodos 

  	//genera el arreglo de los meses
    $scope.generateWeeks= function(a,m){
    	var startDay=new Date(a,m-1,1).getDay();
    	var numDays=new Date(a,m,0).getDate();
	  var weeks = [];
	  var numWeeks = (numDays + startDay) / 7;
	  for(var i=0; i<numWeeks; i++){
	    weeks[i] = [];
	    for(var j=0; j<7; j++){
	      if(i==0 && j<startDay){
	        weeks[i].push('');
	      }else{
	        var day = (j-startDay+1)+(i*7);
	        weeks[i].push(day<=numDays ? day : '');
	      }
	    }
	  }
	  return weeks;
	}

	//carga la fecha de hoy
  	$scope.hoy=function () {
	  	var hoy=new Date();
	  	var m=hoy.getMonth()+1;
	  	var a=hoy.getFullYear();
	  	var d=hoy.getDate();
	  	$scope.mes=m;
	  	$scope.messeleccionado=m;
	  	$scope.anio=a;
	  	$scope.dia=d;
	  	$scope.fecha=Utils.conviertefecha(hoy);
	  	$scope.paquetes=Paquete.getall({fecha:$scope.fecha});
	  	//mes actual
		$scope.weeks=$scope.generateWeeks($scope.anio,$scope.mes);
  	}

  	$scope.hoy();
  	//fechas con paquetes
  	$scope.fechas=Paquete.getall({anio:$scope.anio});


	//se cambia el mes seleccionado
	$scope.cambiames=function (m) {
		if(m==0){
			m=12;
			$scope.anio=$scope.anio-1;
			//fechas con paquetes
  			$scope.fechas=Paquete.getall({anio:$scope.anio});
		}
		if(m==13){
			m=1;
			$scope.anio=$scope.anio+1;
			//fechas con paquetes
  			$scope.fechas=Paquete.getall({anio:$scope.anio});

		}
		//se pone como actual al seleccionado y se 
		$scope.mes=m;
		$scope.weeks=$scope.generateWeeks($scope.anio,m);
	}

	$scope.seleccionarfecha=function (d) {
		// body...
		var fecha=$scope.anio+"-"+("0" + $scope.mes).slice(-2)+"-"+("0" + d).slice(-2);
		$scope.messeleccionado=$scope.mes;
		$scope.dia=d;
		if(fecha!=$scope.fecha || !$scope.nuevo)
		{
			$scope.paquetes=Paquete.getall({fecha:fecha});
			$scope.fecha=fecha;
		}
	}

	$scope.nuevopaquete=function () {
	//nuevo paquete
  		$scope.paquete={fechaRecepcion:new Date(), idArea:"1"};
		$scope.nuevo=false;
		$scope.edit=false;
	}
	$scope.editar=function (p) {
		//carga paquete para editar
		$scope.paquete=angular.copy(p);
		$scope.paquete.fechaRecepcion=Utils.fechaiso($scope.paquete.fechaRecepcion);
		$scope.nuevo=false;
		$scope.edit=true;
	}

	$scope.guardar=function () {
		//se almacena la fecha para hacer el cambio
		$scope.f=[
			$scope.paquete.fechaRecepcion.getFullYear(),
			$scope.paquete.fechaRecepcion.getMonth()+1,
			$scope.paquete.fechaRecepcion.getDate()
		]

		// se convierte la fecha a mysql
		$scope.paquete.fechaRecepcion=Utils.conviertefecha($scope.paquete.fechaRecepcion);
		//si es edicion:
		if ($scope.edit)
			Paquete.update({},$scope.paquete, function () {
				//se recarga el listado de fechas
				$scope.fechas=Paquete.getall({anio:$scope.anio});

				$scope.ok("Se ha guardado correctamente los cambios");

			});
		else
		//si es nuevo se guarda en la DB
		Paquete.save($scope.paquete, function () {
	    	if($scope.fechas.indexOf($scope.paquete.fechaRecepcion)<0){
	    		//se agrega a las fechas con paquetes
	    		$scope.fechas.push({fechaRecepcion:$scope.paquete.fechaRecepcion});
	    	}

	    	$scope.ok('Se ha guardado correctamente el registro.');
		});		
	}

	//se oculta el panel y se almacenan datos
	$scope.ok=function (msg) {
			//Se almacena la fecha
	    	$scope.fecha=$scope.paquete.fechaRecepcion;

			//se cambia al año del nuevo registro si no es el actual
			if($scope.anio!=$scope.f[0]){
		  		$scope.anio=$scope.f[0];
			}
		  	//se cambia mes si no es el actual
		  	if($scope.mes!=$scope.f[1]){
		  		$scope.cambiames($scope.f[1]);
		  	}

		  	//se recargan los paquetes cuando se edita
		  	$scope.seleccionarfecha($scope.f[2]);

	    	// se oculta el panel
	    	$scope.nuevo=true;

			// se notifica
			Flash.clear();
	    	Flash.addAlert({type:'success', msg:msg});
	}

	$scope.confirmarb= function(p){
		$scope.paqueteb=p;
	}


	$scope.borrar=function(){
		//Se borra el paquete
		Paquete.delete({id:$scope.paqueteb.id}, function () {
			//se elimina del arreglo
			$scope.paquetes.splice($scope.paquetes.indexOf($scope.paqueteb),1);

			//si no hay paquetes se elimina la fecha de las valida
			if($scope.paquetes.length==0){
				$scope.fechas.splice($scope.fechas.indexOf($scope.fecha),1);
			}
			// se notifica
			Flash.clear();
	    	Flash.addAlert({type:'success', msg:"Paquete borrado correctamente"});
		});
	}

	//metodo para imprimir
	$scope.print=function (id, dep) {
		// body...
		$scope.aimprimir=[];
		if(typeof id==='undefined'){
			console.log('todas las areas y deptos');
			$scope.aimprimir=$scope.areas;
			$scope.dimprimir=$scope.deptos;
		}else{
			if(dep){
				$scope.dimprimir=$filter('filter')($scope.deptos, {id:id}, true);
			}
			else{
				$scope.aimprimir=$filter('filter')($scope.areas, {id:id}, true);
			}
			console.log("solo "+id);
		}

		console.log($scope.aimprimir);

		$timeout(function () {
			window.print();
		},500, false);
		
	}

  });
