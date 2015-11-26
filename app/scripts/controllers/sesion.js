'use strict';

angular.module('oficiosApp')
  .controller('SesionCtrl', function ($scope, user) {
    $scope.user=user;
  $scope.logout=function(){
    user.logout();
  }
  });
