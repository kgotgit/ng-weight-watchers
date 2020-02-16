import { TestBed, async } from '@angular/core/testing';

import { PersonDetailsService } from './person-details.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { CoreInjectorService } from 'src/app/core/services/core-injector/core-injector.service';


describe('PersonDetailsService', () => {
  let service: PersonDetailsService;
  let httpMock:HttpTestingController;
  let inject:Injector;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
      .compileComponents()
      .then(() => {
        //start --> required by AbstractBaseUtil to create HttpClient instance.
        inject=TestBed.get(Injector);
        CoreInjectorService.injector=inject;
        //end-->Injector Service
        service=TestBed.get(PersonDetailsService);
        httpMock=TestBed.get(HttpTestingController);
       
      });
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
