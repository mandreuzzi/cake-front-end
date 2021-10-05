import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DolceService {
    
  private baseUrl = 'http://localhost:8080/api/dolci';
  private protectedUrl = 'http://localhost:8080/api/members/dolci';
  
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<any> {  
    return this.httpClient.get(`${this.baseUrl}`);  
  }

  findById(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }
  
  create(data: any): Observable<any> {
    console.log("service create ", data);
    return this.httpClient.post(`${this.protectedUrl}/create`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.httpClient.put(`${this.protectedUrl}/update/${id}`, data);
  }

  delete(id: any): Observable<any>  {
    return this.httpClient.delete(`${this.protectedUrl}/delete/${id}`); 
  }

  findByName(keyword: any): Observable<any>  {
    return this.httpClient.get(`${this.baseUrl}?nome=${keyword}`); 
  }

  calcDiffDay(creationDate: Date): number{
    let currentDate = new Date();
    let oldDate = new Date(creationDate);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate()) ) /(1000 * 60 * 60 * 24));
   }
  
}

