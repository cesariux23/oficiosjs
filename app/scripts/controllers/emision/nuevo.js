'use strict';

angular.module('oficiosApp')
  .controller('EmisionNuevoCtrl', function ($scope, $location,Flash, $http, user, catalogos, $filter) {
    //limpia mensajes
    Flash.clear();
    // inician variables
    $scope.destinatarios=[];
    $scope.destinatario={};
    var emision={}
    $scope.notienedestinatario=false;

    $http.get('ci/index.php/utils/hoy').success(function (data) {
        //recupera la fecha del servidor
        emision.fecha=$filter('dateToISO')(data);
    });
    

    $scope.tipoemi=[];

    //se cargan los departamentos
    catalogos.getdepartamentos(user.data.idArea).then(
        function (d) {
            // body...
            $scope.deptos=d.data;
        }
        );
    //tiene depto??
    $scope.d=!!user.data.depto;
    // se obtiene todos los tipos de emision
    angular.copy(catalogos.tipoemi,$scope.tipoemi);
    //se elimina el interno del dep.
    $scope.tipoemi.splice(2, 1);

    //se valida que el departamento tenga cuenta interna
    if(user.data.depto){
        //emite el depto?
        if(user.data.depto.emite=='1')
            //se agrega el tipo de emision
            $scope.tipoemi.push("INTERNO DEL DEPARTAMENTO");
        
    }
    $scope.tipodoc=catalogos.tipodoc;

    //los id's y las abreviaciones se obtienen del usuario
    emision.idArea=user.data.idArea;
    emision.idUsuario=user.data.id;

    //se agrega el id del departamento al doc.
    if(user.data.idDepartamento){
        emision.idDepartamento=user.data.idDepartamento;
    }
    else
        emision.idDepartamento=null;
    $scope.emision=emision;



    //se valida quetenga destinatarios
    $scope.validadestinatario=function (d) {
    	if(d.nombre && d.cargo){
    		$scope.notienedestinatario=false;
    	}
    }

    //se agrega el destinatario a la lista
    $scope.agregadestinatario=function (d) {
    	if(d.nombre && d.cargo){
    		$scope.destinatarios.push(d);
    		$scope.destinatario={};	
    	}
    	
    }

    //se elimina de la lista de destinatarios
    $scope.eliminardestinatario=function (index) {
    	$scope.destinatarios.splice(index, 1);
    }

    //guarda el documento emitido
    $scope.guardar=function() {
        //tiene destinatarios
    	if($scope.destinatarios.length>0 || ($scope.destinatario.nombre&&$scope.destinatario.cargo)){
            if($scope.destinatario.nombre){
                $scope.destinatarios.push($scope.destinatario);
                $scope.destinatario={};
            }

            //si se define solo un numero de oficio se concatenan los nombres
            if(!$scope.variosd){
                var n="", c="";
                $scope.destinatarios.forEach(function (des,i) {
                    console.log(des);
                    n+=des.nombre;
                    c+=des.cargo;
                    if(i<$scope.destinatarios.length-1){
                        n+=", ";
                        c+=", ";
                    }
                });
                $scope.destinatarios=[];
                $scope.destinatarios.push({nombre:n, cargo:c});
                console.log('un solo numero '+n);
            }
            


            var abs=user.data.area.abreviacion;
            //si es interno del depto.
            if($scope.emision.tipoEmision=='2'){
                //se agregaa labs del depto.
                abs=abs+"/"+user.data.depto.abreviacion;
            }

            //se valida que sea null el id del depto, en caso de no tener
            if($scope.emision.idDepartamento==""){
                $scope.emision.idDepartamento=null;
            }
            //se guarda en la base de datos, se envia abreviacion
            $http.post('ci/index.php/emision',{destinatarios:$scope.destinatarios, doc:$scope.emision, abreviacion:abs}).success(function (data) {
                var mensaje="Se han guardado correctamente los siguentes documentos:";
                //se notifica cada docuemento emitido
                data.forEach(function(d) {
                    mensaje=mensaje+'<hr><h3>'+d.numero+'</h3> <b>Asunto: </b>'+d.asunto+"<br> <b>Destinatario:</b> "+d.destinatario+"<br> <b>Cargo:</b> "+d.cargo;
                });
                Flash.addAlert({type:'info', msg:mensaje});
                    $location.path('/emision');
            });
    	}
    	else{
            //se muestra mensaje
    		$scope.notienedestinatario=true;
    	}
    }
  });
