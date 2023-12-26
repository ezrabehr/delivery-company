import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { clientAuth, deliverAuth } from './auth-guard.guard';

describe('authGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => (
    TestBed.runInInjectionContext(() => clientAuth(...guardParameters)),
    TestBed.runInInjectionContext(() => deliverAuth(...guardParameters))
  );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
