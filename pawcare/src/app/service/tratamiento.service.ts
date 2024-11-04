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

  //@PostMapping("/tratamiento/agregar/{idVET}/{idMASC}/{idDROGA}")
  agregarTratamiento(idVET: number, idMASC: number, idDROGA: number, tratamientoDTO: tratamientoDTO) {
    console.log("\n\nTratamiento ENVIADO al backend --> ",tratamientoDTO+"\n\n");
    return this.http.post(`http://localhost:8080/tratamiento/agregar/${idVET}/${idMASC}/${idDROGA}`, tratamientoDTO);
  }

  findAll(): Observable<tratamiento[]> {
    return this.http.get<tratamiento[]>('http://localhost:8080/tratamiento/all');
  }
}
