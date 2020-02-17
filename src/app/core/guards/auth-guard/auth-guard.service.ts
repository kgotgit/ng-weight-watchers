import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
 
  constructor(private storageService:SessionStorageService,private router:Router) { }


  canActivate(): boolean {
    if (!this.storageService.isUserLoggedIn()) {
      this.router.navigateByUrl("pages/login");
      this.storageService.clearAll();
      return false;
    }
    this.storageService.emitIsLoggedin(true);
    return true;
  }

}
