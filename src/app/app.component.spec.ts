import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { DebugElement, Injector } from '@angular/core';
import { CoreInjectorService } from './core/services/core-injector/core-injector.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;
  let inject:Injector;
  


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    })
      .compileComponents()
      .then(() => {
        inject=TestBed.get(Injector);
        CoreInjectorService.injector=inject;
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

      });
  }));
   it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app
      
      ).toBeTruthy();
  });

  it(`should have as title 'ng-weight-watchers'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ng-weight-watchers');
  });

  
});
