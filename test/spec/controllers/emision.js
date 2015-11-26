'use strict';

describe('Controller: EmisionCtrl', function () {

  // load the controller's module
  beforeEach(module('oficiosApp'));

  var EmisionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmisionCtrl = $controller('EmisionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
