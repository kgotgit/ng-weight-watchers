import { TestBed, async } from '@angular/core/testing';

import { SessionStorageService } from './session-storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoreInjectorService } from '../core-injector/core-injector.service';
import { Injector } from '@angular/core';

describe('SessionStorageService', () => {
  let service: SessionStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
     
    })
      .compileComponents()
      .then(() => {
        CoreInjectorService.injector=TestBed.get(Injector);
        service = TestBed.inject(SessionStorageService);

      });
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
