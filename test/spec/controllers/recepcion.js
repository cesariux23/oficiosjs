'use strict';

describe('Controller: RecepcionCtrl', function () {

  // load the controller's module
  beforeEach(module('oficiosApp'));

  var RecepcionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecepcionCtrl = $controller('RecepcionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
