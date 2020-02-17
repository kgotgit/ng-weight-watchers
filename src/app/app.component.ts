import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from './core/abstract-base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent{
  title = 'ng-weight-watchers';

  constructor(private router:Router){
      super();
  }
  ngOnInit(){
    super.ngOnInit();
  }
  goHome(){
    this.router.navigateByUrl("pages/home");
  }
}
