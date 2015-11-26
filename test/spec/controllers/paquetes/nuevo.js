'use strict';

describe('Controller: PaquetesNuevoCtrl', function () {

  // load the controller's module
  beforeEach(module('oficiosApp'));

  var PaquetesNuevoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PaquetesNuevoCtrl = $controller('PaquetesNuevoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
