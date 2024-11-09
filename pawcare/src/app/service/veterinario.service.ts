import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../model/user';
import { Observable } from 'rxjs';
import { veterinario } from '../model/veterinario/veterinario';
import { tratamiento } from '../model/tratamiento/tratamiento';
import { mascota } from '../model/mascota/mascota';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {
  findVeterinarioMascota(id: number): any {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient
  ) { }
  findVeterinarioTratamientos(id: number): Observable<tratamiento[]> {
    return this.http.get<tratamiento[]>('http://localhost:8080/veterinario/tratamientos/'+id);
  }

  findAll(): Observable<veterinario[]> {
    return this.http.get<veterinario[]>('http://localhost:8080/veterinario/all');
  }

  findById(id: number): Observable<veterinario> {
    return this.http.get<veterinario>('http://localhost:8080/veterinario/'+id);
  }

  findByCedula(cedula: number): Observable<veterinario> {
    return this.http.get<veterinario>('http://localhost:8080/veterinario/cedula/'+cedula);
  }

  deleteVeterinario(id: number) {
    this.http.delete('http://localhost:8080/veterinario/eliminar/'+id).subscribe();
  }

  addVeterinario(veterinario: veterinario) {
    this.http.post('http://localhost:8080/veterinario/add', veterinario).subscribe();
  }

  updateVeterinario(updatedVeterinario: veterinario): Observable<veterinario> {
    console.log('Datos enviados para actualización:', updatedVeterinario);
    return this.http.put<veterinario>('http://localhost:8080/veterinario/modificar/' + updatedVeterinario.id, updatedVeterinario);
  }

  ///mascotas/tratamiento/{id}
  findVeterinarioMascotas(id: number): Observable<mascota[]> {
    return this.http.get<mascota[]>('http://localhost:8080/veterinario/mascotas/tratamiento/'+id);
  }
  
  veterinarioHome(): Observable<veterinario> {
    return this.http.get<veterinario>('http://localhost:8080/veterinario/details');
  }

  login(user: user): Observable<String> {
    return this.http.post('http://localhost:8080/veterinario/login', user,
      {
      responseType: 'text'
      });
  }
}
