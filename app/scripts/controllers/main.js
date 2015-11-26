'use strict';

angular.module('oficiosApp')
  .controller('MainCtrl', function (user, $location) {
  	$location.path(user.home);
  });
