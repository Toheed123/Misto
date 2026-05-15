import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private sideMenuName = new BehaviorSubject<string>('')

  constructor(
  ) { }

  setTitleName(title: string){
    this.sideMenuName.next(title);
  }
}
