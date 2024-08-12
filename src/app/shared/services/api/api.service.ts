import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getUbicaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ubicaciones/`);
  }

  getConexiones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/conexiones/`);
  }

  createUbicacion(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ubicaciones1/`, data);
  }

  createConexion(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/conexiones1/`, data);
  }

  createRuta(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ruta/`, data);
  }
}
