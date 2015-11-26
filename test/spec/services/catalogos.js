'use strict';

describe('Service: catalogos', function () {

  // load the service's module
  beforeEach(module('oficiosApp'));

  // instantiate service
  var catalogos;
  beforeEach(inject(function (_catalogos_) {
    catalogos = _catalogos_;
  }));

  it('should do something', function () {
    expect(!!catalogos).toBe(true);
  });

});
