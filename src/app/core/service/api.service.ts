import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  baseUrl = '/googleapi';

  constructor(private http: HttpClient) { 
  }  

  Get(endpoint: string, data: any) : Observable<any> {
    return this.http.get(endpoint, data);    
  }

  Post(endpoint: string, data: any) {
    return this.http.post(endpoint, data);    
  }

  Put(endpoint: string, data: any) : Observable<any> {
    return this.http.put(endpoint, data);    
  }

  Delete(endpoint: string) : Observable<any> {
    return this.http.delete(endpoint);    
  }
}
