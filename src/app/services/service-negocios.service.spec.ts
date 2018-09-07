import { TestBed, inject } from '@angular/core/testing';

import { ServiceNegociosService } from './service-negocios.service';

describe('ServiceNegociosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceNegociosService]
    });
  });

  it('should be created', inject([ServiceNegociosService], (service: ServiceNegociosService) => {
    expect(service).toBeTruthy();
  }));
});
