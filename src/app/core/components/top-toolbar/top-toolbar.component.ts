import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../abstract-base/base.component';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';
import { Router } from '@angular/router';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent extends BaseComponent {

  constructor(private router:Router) {
    super();
   }

  ngOnInit(): void {
    super.ngOnInit();
  }

  

  logout(){
    this._storageService.clearAll();
    this.router.navigateByUrl("pages/login");

  }

}
