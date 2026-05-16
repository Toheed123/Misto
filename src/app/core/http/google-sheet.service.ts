import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetService {

  url: string = 's/AKfycbweJaevtRzg1HBxCIPlO9MRgA1zBFdg6OXcmDp79PvDrWzIocIO6iCA0l6pSC7DwOaAVg/exec';
  

  constructor(private apiServices: ApiService) { }
  
  getExpenceList() : Observable<any>{
    return this.apiServices.Get(this.url);
  }

  addUser(data: any): Observable<any> {
    return this.apiServices.Post(this.url, data);
  }

  updateUser(data: any): Observable<any> {
    return this.apiServices.Put(this.url, data);
  }

  deleteUser(data: any): Observable<any> {
    return this.apiServices.Delete(this.url + '/' + data.id);
  }
}
