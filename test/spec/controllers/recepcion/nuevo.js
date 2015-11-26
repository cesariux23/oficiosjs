'use strict';

describe('Controller: RecepcionNuevoCtrl', function () {

  // load the controller's module
  beforeEach(module('oficiosApp'));

  var RecepcionNuevoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecepcionNuevoCtrl = $controller('RecepcionNuevoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
