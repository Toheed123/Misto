import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private isLogin = new BehaviorSubject<boolean>(true);
  public isLoggedIn$ = this.isLogin.asObservable();

  private authResult = new BehaviorSubject<any>(null);
  public authResult$ = this.authResult.asObservable();



  constructor() { }

  setIsLoggedIn(isLoggedInYN: boolean){
    this.isLogin.next(isLoggedInYN);
  }

  setAuthResult(data: any){
    if(environment.storageType == 'localStorage'){
      localStorage.setItem('LoggedInUser', JSON.stringify(data));
    }else{
      sessionStorage.setItem('LoggedInUser', JSON.stringify(data));
    }
  }

  get getAuthResult(){
     let data = null;
     if(environment.storageType == 'localStorage'){
      data = localStorage.getItem('LoggedInUser');
      return data ? JSON.parse(data) : null;
     }else{
      data = sessionStorage.getItem('LoggedInUser');
      return data ? JSON.parse(data) : null;
     }
  }

  logOut(){
    if(environment.storageType == 'localStorage'){
      return localStorage.removeItem('LoggedInUser');
     }else{
      return sessionStorage.removeItem('LoggedInUser');
     }
     
  }
}
