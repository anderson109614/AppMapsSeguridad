import { TestBed } from '@angular/core/testing';

import { EstadoConeccionService } from './estado-coneccion.service';

describe('EstadoConeccionService', () => {
  let service: EstadoConeccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoConeccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
