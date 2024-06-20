/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutorizadoService } from './autorizado.service';

describe('Service: Autorizado', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutorizadoService]
    });
  });

  it('should ...', inject([AutorizadoService], (service: AutorizadoService) => {
    expect(service).toBeTruthy();
  }));
});
