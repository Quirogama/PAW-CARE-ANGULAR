import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrlMascotas = 'http://localhost:8080/mascota';  // Ruta base para mascota
  private apiUrlDrogas = 'http://localhost:8080/droga';  // Nueva ruta base para droga

  constructor(private http: HttpClient) { }

  // Método para obtener la cantidad total de mascotas
  getCantidadTotalMascotas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrlMascotas}/total`);  // Asegúrate de que la ruta sea correcta
  }

  // Método para obtener la cantidad total de tratamientos en el último mes
  getCantidadTratamientosUltimoMes(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/tratamientos/cantidadUltimoMes');
  }

  // Método para obtener la cantidad de mascotas activas (en tratamiento)
  getCantidadMascotasActivas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrlMascotas}/activas`);
  }

  // Método para obtener ventas totales
  getTotalVentas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrlDrogas}/ventas`);
  }

  // Método para obtener ganancias totales
  getTotalGanancias(): Observable<number> {
    return this.http.get<number>(`${this.apiUrlDrogas}/ganancias`);
  }
}
