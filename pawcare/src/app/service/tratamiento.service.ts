import { HttpClient } from '@angular/common/http';
import { tratamiento } from '../model/tratamiento/tratamiento';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  constructor(private http: HttpClient
  ) { }

  addTratamiento(tratamiento: tratamiento) {
    return this.http.post('http://localhost:8080/tratamiento/add',tratamiento);
  }
}
