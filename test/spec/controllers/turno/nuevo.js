'use strict';

describe('Controller: TurnoNuevoCtrl', function () {

  // load the controller's module
  beforeEach(module('oficiosApp'));

  var TurnoNuevoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TurnoNuevoCtrl = $controller('TurnoNuevoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
