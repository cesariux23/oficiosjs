'use strict';

describe('Controller: EmisionDetalleCtrl', function () {

  // load the controller's module
  beforeEach(module('oficiosApp'));

  var EmisionDetalleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmisionDetalleCtrl = $controller('EmisionDetalleCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
