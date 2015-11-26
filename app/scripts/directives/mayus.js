'use strict';

angular.module('oficiosApp').directive('mayus', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(input) {
          if(typeof(input) != 'undefined' && input!==null){
           var capitalized = input.toUpperCase();
           if(capitalized !== input) {
              modelCtrl.$setViewValue(capitalized);
              modelCtrl.$render();
            }         
            return capitalized;
          }
         }
         modelCtrl.$parsers.push(capitalize);
         capitalize(scope[attrs.ngModel]);  // capitalize initial value
     }
   };
});