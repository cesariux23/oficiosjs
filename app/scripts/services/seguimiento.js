'use strict';

angular.module('oficiosApp')
.factory('Seguimiento', ['$resource', function($resource){
  return $resource('ci/index.php/seguimiento/:id', {id:'@id'}, {
    'update':{
      method: 'PUT',
      isArray: false 
    }

  });
}])
