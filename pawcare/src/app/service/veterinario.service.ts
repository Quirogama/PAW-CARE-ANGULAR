import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { veterinario } from '../model/veterinario/veterinario';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  constructor(
    private http: HttpClient
  ) { }

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
  
}
