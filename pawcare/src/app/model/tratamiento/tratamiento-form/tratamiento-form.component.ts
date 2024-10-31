import { Component, EventEmitter, Output } from '@angular/core';
import { tratamiento } from '../tratamiento';
import { ActivatedRoute, Router } from '@angular/router';
import { DrogaService } from 'src/app/service/droga.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { droga } from '../../droga/droga';
import { mascota } from '../../mascota/mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { tratamientoDTO } from './tratamientoDTO';

@Component({
  selector: 'app-tratamiento-form',
  templateUrl: './tratamiento-form.component.html',
  styleUrls: ['./tratamiento-form.component.css']
})
export class TratamientoFormComponent {

  @Output()
  addTratamientoEvent = new EventEmitter<tratamiento>()

  tratamientoDTO: tratamientoDTO = {
    id: 0,
    descripcion: '',
    fecha: new Date
  }

  drogas: droga[] = [];

  mascotas: mascota[] = [];

  selectedMascota: mascota = {
    id: 0,
    nombre: '',
    peso: '',
    raza: '',
    enfermedad: '',
    estado: '',
    edad: 1,
    imagen: '',
    cedulaCliente: 0
  };

  tratamientos: tratamiento[] = [];

  formTratamiento: tratamiento = {
    id: 0,
    descripcion: '',
    fecha: new Date,
    nombredroga: '',
    nombremascota: '',
    idmascota: 0,
    cedulaVeterinario: 0
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private drogaService: DrogaService,
              private tratamientoService: TratamientoService,
              private mascotaService: MascotaService
  ) { 

  }

  ngOnInit(): void {
    this.drogaService.findAll().subscribe((drogas) => {
      this.drogas = drogas;
    })
    this.mascotaService.findAll().subscribe((mascotas) => {
      this.mascotas = mascotas;
    })
    this.tratamientoService.findAll().subscribe((tratamientos) => {
      this.tratamientos = tratamientos;
    })
  }

  getUserId(): string | null {
    return localStorage.getItem('id');
  }

  getMascotaId(event: any) {
    this.formTratamiento.nombremascota = event.nombre;
    this.formTratamiento.idmascota = event.id;
  }

  addTratamiento(){
    this.tratamientoDTO.id = this.tratamientos.length + 1;
    this.tratamientoDTO.descripcion = this.formTratamiento.descripcion;
    this.tratamientoDTO.fecha = this.formTratamiento.fecha;

    console.log("TRATAMIENTO DTO --> ", this.tratamientoDTO);
    console.log("MASCOTA --> ", this.selectedMascota);

    this.tratamientoService.agregarTratamiento(9991234,"ACOLAN", 9, this.tratamientoDTO);

    this.addTratamientoEvent.emit(this.formTratamiento);

    this.router.navigate(['/veterinario/perfil/' + this.getUserId()]);  
  }

}
