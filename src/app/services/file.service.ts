import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private basedUrl = 'http://localhost:8080/api/dolci';
  private protectedUrl = 'http://localhost:8080/api/members/dolci';

  constructor(private httpClient: HttpClient) { }

  upload(fileData: FormData): Observable<any> {
    return this.httpClient.post(`${this.protectedUrl}/upload`, fileData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  
  download(filename: String): Observable<Blob> {
    return this.httpClient.get(`${this.basedUrl}/download/${filename}`, { responseType: 'blob' });
  }
}
