import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourceDetailService {

  private Url = 'https://6245bda4f89d1cacd808536d.mockapi.io/api/detalle/'
  constructor(private http: HttpClient) { }

  getDetail(id: number){
    return this.http.get<any>(`${this.Url}${id}`);
  }
}
