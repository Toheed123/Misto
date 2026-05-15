import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild,CanDeactivate<any>, CanLoad  {
  constructor( private router: Router, private authenticationService : AuthenticationService) {}

  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }

  canDeactivate(): boolean {
    // if (component.hasUnsavedChanges()) {
    //   return window.confirm('You have unsaved changes. Do you really want to leave?');
    // }
    return true;
  }

  canLoad(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (this.authenticationService.getAuthResult) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }

}