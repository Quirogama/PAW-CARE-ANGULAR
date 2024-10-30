import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { droga } from '../model/droga/droga';

@Injectable({
  providedIn: 'root'
})
export class DrogaService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<droga[]> {
    return this.http.get<droga[]>('http://localhost:8080/droga/all');
  }

  findById(id: number): Observable<droga> {
    return this.http.get<droga>('http://localhost:8080/droga/'+id);
  }

  findByNombre(nombre: string): Observable<droga[]> {
    return this.http.get<droga[]>('http://localhost:8080/droga/'+nombre);
  }
}
