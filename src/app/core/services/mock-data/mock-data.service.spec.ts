import { TestBed, async } from '@angular/core/testing';

import { MockDataService } from './mock-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MockDataService', () => {
  let service: MockDataService;

  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
     
    })
      .compileComponents()
      .then(() => {
       
        service = TestBed.inject(MockDataService);

      });
  }));
 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
