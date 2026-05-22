import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  url: string = '/macros/s/AKfycbw-acdrcjNE5CVm1s2jQZ22-o4DBJcRoAIFv532g8-DLMHJS19NtjJsJXpjvJOWu8-7Zw/exec';

  constructor(private apiServices: ApiService) { }

  // =====================================================
  // GET PRODUCT LIST
  // =====================================================

  getProductList(): Observable<any> {

    return this.apiServices.Post(this.url, {
      route: 'getProducts',
    });

  }

  // =====================================================
  // GET PRODUCT BY ID
  // =====================================================

  getProductById(id: any): Observable<any> {

    return this.apiServices.Post(this.url, {
      route: 'getProductById',
      id: id
    });

  }

  // =====================================================
  // ADD PRODUCT
  // =====================================================

  addProduct(data: any): Observable<any> {

    return this.apiServices.Post(this.url, {
      route: 'addProduct',
      data: data
    });

  }

  // =====================================================
  // UPDATE PRODUCT
  // =====================================================

  updateProduct(data: any): Observable<any> {

    return this.apiServices.Post(this.url, {
      route: 'updateProduct',
      data: data
    });

  }

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  deleteProduct(id: any): Observable<any> {

    return this.apiServices.Post(this.url, {
      route: 'deleteProduct',
      id: id
    });

  }
}