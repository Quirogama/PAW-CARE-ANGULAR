import { HttpClient, HttpParams } from '@angular/common/http';
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

  //@PostMapping("/tratamiento"/agregar/{idVET}/{idMASC}/{idDROGA}"")
  agregarTratamiento(idVET: number, idMASC: number, idDROGA: number, params: { params: HttpParams }) {
    return this.http.post(`http://localhost:8080/tratamiento/agregar/${idVET}/${idMASC}/${idDROGA}`, null, params);
  }

  finalizarTratamiento(id: number) {
    this.http.delete('http://localhost:8080/tratamiento/eliminar/'+id).subscribe();
  }

  findAll(): Observable<tratamiento[]> {
    return this.http.get<tratamiento[]>('http://localhost:8080/tratamiento/all');
  }

  findByMascota(id: number): Observable<tratamiento> {
    return this.http.get<tratamiento>('http://localhost:8080/tratamiento/mascota/'+id);
  }
}
