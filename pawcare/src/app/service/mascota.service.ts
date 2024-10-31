import { Injectable } from '@angular/core';
import { mascota } from '../model/mascota/mascota';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mascotaDTO } from '../model/mascota/mascota-form/mascotaDTO';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(
    private http: HttpClient
  ) { }

findAll(): Observable<mascota[]> {
    return this.http.get<mascota[]>('http://localhost:8080/mascota/all');
  }

  findById(id: number): Observable<mascota> {
    return this.http.get<mascota>('http://localhost:8080/mascota/'+id);
  }

  findClienteMascota(id: number): Observable<mascota[]> {
  //  return of(this.mascotaList.filter(mascota => mascota.id === id));
    return this.http.get<mascota[]>('http://localhost:8080/mascota/cliente/'+id);
  }

  updateMascota(updatedMascota: mascota): Observable<mascota> {
    return this.http.put<mascota>('http://localhost:8080/mascota/modificar/'+updatedMascota.id, updatedMascota);
  }

  deleteMascota(id: number) {
    this.http.delete('http://localhost:8080/mascota/eliminar/'+id).subscribe();
  }

  addMascota(nuevaMascota: mascota) {
    this.http.post('http://localhost:8080/mascota/registro', nuevaMascota).subscribe();
  }

  agregarMascota(cedula: number, mascotaDTO: mascotaDTO): Observable<any>{
    return this.http.post('http://localhost:8080/mascota/agregar/'+cedula, mascotaDTO);
  }

  addMascotaForm(mascota: mascota) {
    this.http.get('http://localhost:8080/mascota/registro').subscribe();
  }
}