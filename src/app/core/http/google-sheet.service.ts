import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetService {

  url: string = 'https://script.google.com/macros/s/AKfycbyQ-2H9SGhWi3atxvCWtd21UGlSbtbr2eTEmmUeSneVj0cFHRYjJbyZrJuZbl4ghUM/exec';
  proxyUrl : any =
  'https://api.allorigins.win/raw?url=' + encodeURIComponent(this.url);

  constructor(private apiServices: ApiService) { }
  
  getExpenceList() : Observable<any>{
    return this.apiServices.Post(this.proxyUrl, {
      route: 'getExpenses',
    });
  }

  getExpenceById(id: any): Observable<any> {
    return this.apiServices.Post(this.proxyUrl, {
      route: 'getExpenseById',
      id: id
    });
  }

  addExpense(data: any): Observable<any> {
    return this.apiServices.Post(this.proxyUrl, {
      route: 'addExpense',
      data: data
    });
  }

  updateExpense(data: any): Observable<any> {
    return this.apiServices.Post(this.proxyUrl, {
      route: 'updateExpense',
      data: data
    });
  }

  deleteExpense(data: any): Observable<any> {
    return this.apiServices.Post(this.proxyUrl, {
      route: 'deleteExpense',
      id: data
    });
  }
}
