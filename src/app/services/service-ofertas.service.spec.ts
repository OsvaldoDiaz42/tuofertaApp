import { TestBed, inject } from '@angular/core/testing';

import { ServiceOfertasService } from './service-ofertas.service';

describe('ServiceOfertasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceOfertasService]
    });
  });

  it('should be created', inject([ServiceOfertasService], (service: ServiceOfertasService) => {
    expect(service).toBeTruthy();
  }));
});
