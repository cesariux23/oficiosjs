'use strict';

describe('Service: seguimiento', function () {

  // load the service's module
  beforeEach(module('oficiosApp'));

  // instantiate service
  var seguimiento;
  beforeEach(inject(function (_seguimiento_) {
    seguimiento = _seguimiento_;
  }));

  it('should do something', function () {
    expect(!!seguimiento).toBe(true);
  });

});
