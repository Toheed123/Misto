import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetService {

  url: string = '/macros/s/AKfycbyQ-2H9SGhWi3atxvCWtd21UGlSbtbr2eTEmmUeSneVj0cFHRYjJbyZrJuZbl4ghUM/exec';

  constructor(private apiServices: ApiService) { }
  
  getExpenceList() : Observable<any>{
    return this.apiServices.Post(this.url, {
      route: 'getExpenses',
    });
  }

  getExpenceById(id: any): Observable<any> {
    return this.apiServices.Post(this.url, {
      route: 'getExpenseById',
      id: id
    });
  }

  addExpense(data: any): Observable<any> {
    return this.apiServices.Post(this.url, {
      route: 'addExpense',
      data: data
    });
  }

  updateExpense(data: any): Observable<any> {
    return this.apiServices.Post(this.url, {
      route: 'updateExpense',
      data: data
    });
  }

  deleteExpense(data: any): Observable<any> {
    return this.apiServices.Post(this.url, {
      route: 'deleteExpense',
      id: data
    });
  }
}
