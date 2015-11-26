'use strict';

describe('Controller: TurnoIdCtrl', function () {

  // load the controller's module
  beforeEach(module('oficiosApp'));

  var TurnoIdCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TurnoIdCtrl = $controller('TurnoIdCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
