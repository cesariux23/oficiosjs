'use strict';

describe('Controller: EmisionNuevoCtrl', function () {

  // load the controller's module
  beforeEach(module('oficiosApp'));

  var EmisionNuevoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmisionNuevoCtrl = $controller('EmisionNuevoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
