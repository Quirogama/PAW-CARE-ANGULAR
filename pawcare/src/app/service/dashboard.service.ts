import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8080/api/tratamientos'; // URL del backend

  constructor(private http: HttpClient) { }

  getCantidadTratamientosUltimoMes(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/cantidadUltimoMes`);
  }
}
