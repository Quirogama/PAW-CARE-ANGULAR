import { HttpClient } from '@angular/common/http';
import { tratamiento } from '../model/tratamiento/tratamiento';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tratamientoDTO } from '../model/tratamiento/tratamiento-form/tratamientoDTO';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  constructor(private http: HttpClient
  ) { }

  addTratamiento(tratamiento: tratamiento) {
    return this.http.post('http://localhost:8080/tratamiento/add',tratamiento);
  }

  ///agregar/{cedula}/{nombredroga}/{id}
  agregarTratamiento(cedula: number, nombredroga: string, idmascota: number, tratamientoDTO: tratamientoDTO) {
    return this.http.post('http://localhost:8080/tratamiento/agregar/'+cedula+'/'+nombredroga+'/'+idmascota, tratamientoDTO);
  }

  findAll(): Observable<tratamiento[]> {
    return this.http.get<tratamiento[]>('http://localhost:8080/tratamiento/all');
  }
}
