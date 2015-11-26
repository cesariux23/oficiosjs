'use strict';

angular.module('oficiosApp')
.factory('Recepcion', ['$resource', function($resource){
	return $resource('ci/index.php/recepcion/:id', {id:'@id'}, {
		'update':{
			method: 'PUT',
			isArray: false 
		}//,
		//'save':  {method:'POST', isArray:true}
		,
		'getall':  {method:'GET', isArray:true}

	});
}])
  .controller('RecepcionCtrl', function ($scope, $http, Recepcion, Flash, $filter, Utils, user, catalogos, Seguimiento) {
  	Flash.clear();
    $scope.tipo=['OFICIO','TARJETA','CIRCULAR','TURNO'];

    $scope.area=user.data.area.area;
    

    //regresa los péndientes
    $scope.getconcentrado=function (t) {
        if(t){
            $scope.filtropendientes=true;
            $scope.recibidos=Seguimiento.query({area:user.data.idArea,tipo:t});
        }
        else{
            $scope.filtropendientes=false;
            $scope.concentrado=Seguimiento.get({area:user.data.idArea,count:1});
        }
    }

    //datepiker
    $scope.isopen=true;
    $scope.max=new Date();
    $scope.print={};
    $scope.r={};
    $scope.print.selected=[];
    $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
    };
    
    $scope.isCollapsed=true;


    //carga la fecha de hoy
    $scope.actual=function () {
        $http.get('ci/index.php/utils/hoy').success(function (data) {
        //recupera la fecha del servidor
        $scope.hoy=$filter('dateToISO')(data);
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
            $scope.actualiza();
        });
    }

    //selccion actual
    $scope.actualiza=function () {
        //carga las cifras de pendientes
        $scope.getconcentrado();
        //se carga el mes actual
        $scope.recibidos=Recepcion.query({a:$scope.anio,m:$scope.messeleccionado+1, area:user.data.idArea});
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
      $scope.recibidos=Recepcion.query({a:$scope.anio,m:$scope.messeleccionado+1, area:user.data.idArea});
    }



    $scope.nuevo=function () {
    	$scope.isCollapsed = false;
        $scope.recepcion={idArea:user.data.idArea, idUsuario:user.data.id};
        $http.get('ci/index.php/utils/hoy').success(function (data) {
            //recupera la fecha del servidor
            var hoy=$filter('dateToISO')(data);
             $scope.recepcion.fechaRecepcion=hoy;
             $scope.recepcion.fechaDocumento=hoy;
    	});
        $scope.cargado=false;
        $scope.turno=false;
    }

    $scope.cargar=function () {
    	$scope.error="";

    	if($scope.recepcion.tipoDoc){
    	// Se busca un turno
    	$scope.turno=false;
    	if($scope.recepcion.tipoDoc==3)
    	{
    		if($scope.recepcion.numero.match(/^CD\/(1)?\d{4}\/20((1[4-9])|([2-9]\d))$/)!=null){
    			$http.get('ci/index.php/turno',{params:{num:$scope.recepcion.numero}}).success(function (data) {
    					if(data === 'null'){
    						$scope.error="No se ha encontrado el turno <b>"+$scope.recepcion.numero+"</b>.";
    						$scope.cargado=false;
    					}
    					else{
    						$scope.recepcion.numero=data.numeroDoc;
    						$scope.recepcion.tipoDoc=data.tipoDocumento;
    						$scope.recepcion.envia=data.remitente;
    						$scope.recepcion.cargo=data.cargoremitente;
    						$scope.recepcion.asunto=data.asunto;
    						$scope.recepcion.dependencia=data.dependencia;
    						$scope.recepcion.fechaDocumento=data.fechaDoc;
    						$scope.recepcion.turno=data.turno;
                            $scope.recepcion.urgente=data.urgente;
    						$scope.recepcion.fechaTurno=data.fechaRecepcion;
    						$scope.recepcion.indicaciont=data.indicacion;
                            $scope.recepcion.indicacion="";
    						$scope.cargado=true;
    						$scope.turno=true;
    					}
    				});
	    	}
	    	else{
	    		$scope.error="<b>"+$scope.recepcion.numero+"</b> no es un turno valido.";
	    		$scope.cargado=false;
	    	}
    	}
    	else{
    		//se busca un documento interno
    		if ($scope.recepcion.numero.match(/^(DG\/|(DG\/)?(SPPP|SESO|(SAF(\/(RH|AF))?)|SAS|SSE|UAL|UAJ|CD|UT|UG|CRC)\/)/)!=null) {
    			if($scope.recepcion.numero.match(/^(DG\/|(DG\/)?(SPPP|SESO|(SAF(\/(RH|AF))?)|SAS|SSE|UAL|UAJ|UDS|UT|UG|CRC)\/)(1)?\d{4}\/20((1[4-9])|([2-9]\d))$/)!=null){
    				$http.get('ci/index.php/emision',{params:{num:$scope.recepcion.numero, t: $scope.recepcion.tipoDoc}}).success(function (data) {
    					if(data === 'null'){
    						$scope.error="No se ha encontrado el documento con número <b>"+$scope.recepcion.numero+"</b>.";
    						$scope.cargado=false;
    					}
    					else{
    						$scope.recepcion.envia="";
    						$scope.recepcion.cargo="";
    						$scope.recepcion.asunto=data.asunto;
    						$scope.recepcion.dependencia="INTERNO";
    						$scope.recepcion.fechaDocumento=data.fecha;
    						$scope.recepcion.indicacion="";
    						$scope.recepcion.fechaturno="";
    						$scope.recepcion.turno="";
    						$scope.cargado=true;
    					}

    				});

    			}
    			else{
    				$scope.error="<b>"+$scope.recepcion.numero+"</b> no es un documento valido.";
    				$scope.cargado=false;
    			}

    		}
    		else{
    			$scope.error="<b>"+$scope.recepcion.numero+"</b> no es un documento interno.";
    				$scope.cargado=false;
    		}
    	}
    }
    else{
    	$scope.error="Selecccione un tipo de documento.";
    }
    	
    }

    $scope.limpiar=function () {
    	$scope.cargado=false;
    	$scope.turno=false;
    	$scope.recepcion={};
    }

    $scope.guardar=function () {
    	Flash.clear();
    	$scope.error="";
    	if($scope.recepcion.tipoDoc==3){
    		$scope.error="No se puede registrar un documento externo como turno.";
    		$scope.recepcion.tipoDoc='';
    	}
    	else{
            //si no es cargado se ajusta fecha del doc
            if(!$scope.cargado)
               $scope.recepcion.fechaDocumento=Utils.conviertefecha($scope.recepcion.fechaDocumento); 
            $scope.recepcion.fechaRecepcion=Utils.conviertefechayhora($scope.recepcion.fechaRecepcion);
            if($scope.recepcion.id){
                $scope.recepcion.modificacion=Utils.conviertefechayhora(new Date());
                Recepcion.update($scope.recepcion,function () {
                    Flash.addAlert({type:'success', msg:'Se ha actualizado correctamente el registro.'});
                    $scope.isCollapsed=true;
                    $scope.recibidos=Recepcion.getall();
                }
                );
            }
            else
            {
    		Recepcion.save($scope.recepcion,function () {
    			Flash.addAlert({type:'success', msg:'Se ha guradado correctamente.'});
    			$scope.isCollapsed=true;
    			$scope.actual();
    		}
    		);
            }
    		
    	}
    }

    $scope.edit=function (r) {
        // body...
        $scope.recepcion=angular.copy(r);
        $scope.recepcion.fechaRecepcion=$filter('dateToISO')(r.fechaRecepcion);
        $scope.turno=false;
        $scope.cargado=false;
        if(r.turno){
            $scope.turno=true;
            $scope.cargado=true;
        }
        if(r.dependencia=="INTERNO"){
            $scope.cargado=true;
        }
        $scope.isCollapsed=false;
    }

    $scope.quitar=function () {
        // body...
        $scope.print.selected=[];
        //$scope.recibidos=Recepcion.getall();
    }

    $scope.imprimir=function () {
        //guarda los camibios e imprime
        $scope.print.selected.forEach(function (d) {
            //gurdando en la base
            d.indicacion=$scope.pr.indicacion;
            d.turnado=$scope.pr.turnado;
            d.estado=1;
            Recepcion.update(d);
        });
        window.print();
        $scope.quitar();
        $scope.actualiza();
    }


    //valida el periodo de atencion
    $scope.periodo=function (registro) {
        var diferencia=$scope.hoy-registro;
        $scope.p=Math.round(((((diferencia/1000)/60)/60)/24)); //regresa los dias
        //return registro;
    }

    //muestra los pendientes
    $scope.pendientes=function (tipo) {
        // body...
        $scope.tipopendiente=tipo;
        $scope.getconcentrado(tipo);
    }

    //muestra el modal para el seguimiento
    $scope.registrarseguimiento=function  (doc) {
        $scope.doc=angular.copy(doc);
    $('#detalles').modal('show');
    }

    //guarda las acciones y marca el seguimiento
    $scope.registraracciones=function () {
        Flash.clear();
        var d={};
        d.id=$scope.doc.id;
        d.seguimiento=$scope.doc.seguimiento;
        d.estado=2;
        Recepcion.update(d, function (r) {
            //se notifica
            Flash.addAlert({type:'success', msg:'Se ha guradado correctamente.'});
            if($scope.filtropendientes){
                $scope.getconcentrado();
                $scope.getconcentrado($scope.tipopendiente);
            }
            else
                $scope.actual();
        });
    }
    

  });
