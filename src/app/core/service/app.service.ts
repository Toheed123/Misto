import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  
  private isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading.asObservable();

  private refreshMainMenu = new BehaviorSubject<boolean>(false);
  public refreshMainMenu$ = this.refreshMainMenu.asObservable();

  constructor() {}

  setLoading(loading: boolean) {
    this.isLoading.next(loading);
  }

  setRefreshMainMenu(refresh: boolean) {
    this.refreshMainMenu.next(refresh);
  };
}
