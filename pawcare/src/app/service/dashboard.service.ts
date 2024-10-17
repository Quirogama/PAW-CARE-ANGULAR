import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrlMascotas = 'http://localhost:8080/mascota';  // Ruta base para "mascota"

  constructor(private http: HttpClient) { }

  // Método para obtener la cantidad total de mascotas
  getCantidadTotalMascotas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrlMascotas}/total`); // Asegúrate de que la ruta sea correcta
  }

  // Método para obtener la cantidad total de tratamientos en el último mes (verifica si este es el endpoint correcto)
  getCantidadTratamientosUltimoMes(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/tratamientos/cantidadUltimoMes');
  }

  getCantidadMascotasActivas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrlMascotas}/activas`);  // Llama al endpoint del backend
  }
}
