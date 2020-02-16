import { TestBed } from '@angular/core/testing';

import { CoreInjectorService } from './core-injector.service';

describe('CoreInjectorService', () => {
  let service: CoreInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
