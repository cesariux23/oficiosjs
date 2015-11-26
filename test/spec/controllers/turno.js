'use strict';

describe('Controller: TurnoCtrl', function () {

  // load the controller's module
  beforeEach(module('oficiosApp'));

  var TurnoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TurnoCtrl = $controller('TurnoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
