import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  url: string = '/macros/s/AKfycbwSvWyGSkt8p8ODytw_es_pYKtjwMvXs5gYDyxdarV7GNSfnpM_hhD4J5zl118lLIB1xw/exec';

  constructor(private apiServices: ApiService) { }
  
  getOrderList() : Observable<any>{
    return this.apiServices.Post(this.url, {
      route: 'getOrders',
    });
  }

  getOrderById(id: any): Observable<any> {
    return this.apiServices.Post(this.url, {
      route: 'getOrderById',
      id: id
    });
  }

  addOrder(data: any): Observable<any> {
    return this.apiServices.Post(this.url, {
      route: 'addOrder',
      data: data
    });
  }

  updateOrder(data: any): Observable<any> {
    return this.apiServices.Post(this.url, {
      route: 'updateOrder',
      data: data
    });
  }

  deleteOrder(data: any): Observable<any> {
    return this.apiServices.Post(this.url, {
      route: 'deleteOrder',
      id: data
    });
  }
}

