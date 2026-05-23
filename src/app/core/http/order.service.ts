import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  url: string = 'https://script.google.com/macros/s/AKfycbwSvWyGSkt8p8ODytw_es_pYKtjwMvXs5gYDyxdarV7GNSfnpM_hhD4J5zl118lLIB1xw/exec';
  proxyUrl : any =
  'https://api.allorigins.win/raw?url=' + encodeURIComponent(this.url);

  constructor(private apiServices: ApiService) { }
  
  getOrderList() : Observable<any>{
    return this.apiServices.Post(this.proxyUrl, {
      route: 'getOrders',
    });
  }

  getOrderById(id: any): Observable<any> {
    return this.apiServices.Post(this.proxyUrl, {
      route: 'getOrderById',
      id: id
    });
  }

  addOrder(data: any): Observable<any> {
    return this.apiServices.Post(this.proxyUrl, {
      route: 'addOrder',
      data: data
    });
  }

  updateOrder(data: any): Observable<any> {
    return this.apiServices.Post(this.proxyUrl, {
      route: 'updateOrder',
      data: data
    });
  }

  deleteOrder(data: any): Observable<any> {
    return this.apiServices.Post(this.proxyUrl, {
      route: 'deleteOrder',
      id: data
    });
  }
}

