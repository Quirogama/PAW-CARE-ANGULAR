import { Component, EventEmitter, Output } from '@angular/core';
import { tratamiento } from '../tratamiento';
import { ActivatedRoute, Router } from '@angular/router';
import { DrogaService } from 'src/app/service/droga.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { droga } from '../../droga/droga';

@Component({
  selector: 'app-tratamiento-form',
  templateUrl: './tratamiento-form.component.html',
  styleUrls: ['./tratamiento-form.component.css']
})
export class TratamientoFormComponent {

  @Output()
  addTratamientoEvent = new EventEmitter<tratamiento>()

  drogas: droga[] = [];

  formTratamiento: tratamiento = {
    id: 0,
    descripcion: '',
    fecha: new Date,
    nombredroga: '',
    cedulaVeterinario: 0
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private drogaService: DrogaService,
              private tratamientoService: TratamientoService
  ) { 

  }

  ngOnInit(): void {
    this.drogaService.findAll().subscribe((drogas) => {
      this.drogas = drogas;
    })
  }

  addTratamiento(){
    alert("Tratamiento agregado");
  }

}
