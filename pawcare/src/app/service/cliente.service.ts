import { Injectable } from '@angular/core';
import { cliente } from '../model/cliente/cliente';
import { mascota } from '../model/mascota/mascota';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<cliente[]> {
    return this.http.get<cliente[]>('http://localhost:8080/cliente/all');
  }

  findById(id: number): Observable<cliente> {
    return this.http.get<cliente>('http://localhost:8080/cliente/'+id);
  }

  findByCedula(cedula: number): Observable<cliente> {
    return this.http.get<cliente>('http://localhost:8080/cliente/cedula/'+cedula);
  }

  deleteCliente(id: number) {
    this.http.delete('http://localhost:8080/cliente/eliminar/'+id).subscribe();
  }

  addCliente(cliente: cliente) {
    this.http.post('http://localhost:8080/cliente/add', cliente).subscribe();
  }

  updateCliente(updatedCliente: cliente): Observable<cliente> {
    console.log('Datos enviados para actualización:', updatedCliente);
    return this.http.put<cliente>('http://localhost:8080/cliente/modificar/' + updatedCliente.id, updatedCliente);
  }
  
}
