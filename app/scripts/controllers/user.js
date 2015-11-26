'use strict';

angular.module('oficiosApp')
  .controller('UserCtrl', function ($scope, user, catalogos, Flash) {
  	$scope.user={};
  	$scope.u={id:user.data.id};
  	if(user.data.cambioContra=='1')
  		$scope.primeruso=true;
  	else
  		$scope.primeruso=false;
  	$scope.isCollapsed=$scope.primeruso;
  	$scope.contra=$scope.primeruso;
  	//departamentos
  	console.log(user.data.idArea);
  	catalogos.getdepartamentos(user.data.idArea).then(function (deptos) {
  		$scope.deptos=deptos.data;
  		console.log($scope.deptos);
  	});

  	angular.copy(user.data,$scope.user);

  	$scope.continuar=function () {
  		// se valida la información de usuario (nombre, apellido)
  		Flash.clear();
  		if($scope.user.nombre){
  			if((/usuario/i).test($scope.user.nombre)){
  				Flash.addAlert({type:'danger', msg:'Ingrese un nombre real.'});
  				$scope.user.nombre="";
  			}else
  			{
  				//comparamos apellido
  				if($scope.user.apellidos){
  					if((/ivea/i).test($scope.user.apellidos)){
  						Flash.addAlert({type:'danger', msg:'Ingrese un apellido real.'});
  						$scope.user.apellidos="";
  					}
  					else{
  						//valido
  						$scope.isCollapsed=true;
  						$scope.u.nombre=$scope.user.nombre;
  						$scope.u.apellidos=$scope.user.apellidos;
  						$scope.u.idDepartamento=$scope.user.idDepartamento;
  					}
  				}
  				else
  				Flash.addAlert({type:'danger', msg:'Ingrese los apellidos.'});

  			}
  		}
  		else{
  			Flash.addAlert({type:'danger', msg:'Ingrese un nombre.'});
  		}
  	}

  	$scope.nuevacontra=function () {
  		//se prepara para el cambio
  		$scope.contra=!$scope.contra;
  		$scope.contra1="";
  		$scope.contra2="";
  	}

  	$scope.fin=function () {
  		Flash.clear();
  		//Se validan las contraseñas
  		if($scope.contra){
  			//lleno contra1
  			if($scope.contra1){
  				if($scope.contra2){
		  			if($scope.contra1==$scope.contra2){
		  				if($scope.contra1.length>4){
		  					if( (/\s/).test($scope.contra1))
		  						Flash.addAlert({type:'danger', msg:'Las contraseñas <b>no</b> debe contener espacios en blanco.'});
		  					else {
		  						//se guardan los cambios en la base de datos
		  						$scope.u.password=$scope.contra1;
		  						var msj;
		  						if(!$scope.primeruso)
		  							msj="Se ha finalizado correctamente la configuracion inicial";
		  						else
		  							msj="Se ha actualizado correctamente la contraseña";

					  			user.update($scope.u).then(function (res) {
					  				// body...
					  				if(res.data){
					  					Flash.addAlert({type:'success', msg:'<h3>'+msj+'.</h3> Ingrese nuevamente sus datos de acceso.'});
					  					user.logout();
					  				}

					  			});
					  		
		  					}

		  				}
		  				else
		  					Flash.addAlert({type:'danger', msg:'Las contraseñas debe tener una longitud minima de <b>5</b> caracteres.'});

		  			}
		  			else
		  				Flash.addAlert({type:'danger', msg:'Las contraseñas no coinciden.'});
		  		}else
		  		Flash.addAlert({type:'danger', msg:'Repita la contraseña.'});
	  		}
	  		else
	  			Flash.addAlert({type:'danger', msg:'Ingrese una contraseña.'});
  		}
  		else{
  			if(!$scope.primeruso){
  				user.update($scope.u).then(function (res) {
  					// body...
  					if(res.data){
  						Flash.addAlert({type:'success', msg:'<h3>Se ha finalizado correctamente la configuracion inicial.</h3> Ingrese nuevamente sus datos de acceso.'});
  						user.logout();
  					}

  				});
  			}
  			else{
  				Flash.addAlert({type:'warning', msg:'No hay cambios que guardar.'});
  			}
  		}

  	}
    
  });
