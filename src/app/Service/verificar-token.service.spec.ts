import { TestBed } from '@angular/core/testing';

import { VerificarTokenService } from './verificar-token.service';

describe('VerificarTokenService', () => {
  let service: VerificarTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificarTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
