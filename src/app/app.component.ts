import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-weight-watchers';

  constructor(private router:Router){
    
  }
  goHome(){
    this.router.navigateByUrl("pages/home");
  }
}
