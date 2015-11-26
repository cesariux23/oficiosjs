'use strict';

describe('Controller: BusquedaCtrl', function () {

  // load the controller's module
  beforeEach(module('oficiosApp'));

  var BusquedaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BusquedaCtrl = $controller('BusquedaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
