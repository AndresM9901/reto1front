import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {
  private apiUrl = '/api?format=json';

  constructor(private http: HttpClient) { }

  getIpAddress(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
