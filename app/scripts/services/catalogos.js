'use strict';

angular.module('oficiosApp')
  .factory('catalogos', function ($http, $q) {
    var areas;
    var deptos;
    return {
      getareas: function () {
        //singleton de areas
        var def=$q.defer();
        if(areas){
          console.log('Ya existia '+areas);
          def.resolve(areas);
        }
        else{
          console.log('se crea');
          $http.get('ci/index.php/area')
            .then(function(data) {
              areas=data;
              def.resolve(areas);
            });
           }
          return def.promise;

        },
        getdepartamentos: function (id) {
        //singleton de areas
        var def=$q.defer();
        if(deptos){
          def.resolve(deptos);
        }
        else{
          $http.get('ci/index.php/deptos',{params:{idArea:id}})
            .then(function(data) {
              deptos=data;
              def.resolve(deptos);
            });
           }
          return def.promise;

        },
        meses:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
        tipodoc:['OFICIO','TARJETA','CIRCULAR'],
        tipoemi:['INTERNO','EXTERNO','INTERNO DEL DEPARTAMENTO'],
      }
  });
