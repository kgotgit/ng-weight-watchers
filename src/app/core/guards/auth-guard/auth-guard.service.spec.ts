import { TestBed, async } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoreInjectorService } from '../../services/core-injector/core-injector.service';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let router:Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule.withRoutes([])],
    })
      .compileComponents()
      .then(() => {
        CoreInjectorService.injector=TestBed.get(Injector);
        router = TestBed.get(Router);
        service = TestBed.get(AuthGuardService);

      });
  }));
 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
