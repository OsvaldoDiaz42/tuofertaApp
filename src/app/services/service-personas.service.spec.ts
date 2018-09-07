import { TestBed, inject } from '@angular/core/testing';

import { ServicePersonasService } from './service-personas.service';

describe('ServicePersonasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicePersonasService]
    });
  });

  it('should be created', inject([ServicePersonasService], (service: ServicePersonasService) => {
    expect(service).toBeTruthy();
  }));
});
