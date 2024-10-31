import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input()
  selectedMascota!: mascota;

  tratamientoDTO: tratamientoDTO = {
    id: 0,
    descripcion: '',
    fecha: new Date
  }

  drogaID: number = 0;

  drogas: droga[] = [];

  mascotas: mascota[] = [];

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
  
  getUserIdint(): number | null {
    const id = localStorage.getItem('id');
    return id === null ? null : parseInt(id, 10);
  }

  getMascotaId(event: any) {
    this.formTratamiento.nombremascota = event.nombre;
    this.formTratamiento.idmascota = event.id;
  }

  addTratamiento(){
    console.log(this.formTratamiento);
    this.drogaService.findByNombre(this.formTratamiento.nombredroga).subscribe((droga) => {
      this.drogaID = droga.id;
    })

    this.tratamientoDTO.id = this.tratamientos.length + 1;
    this.tratamientoDTO.descripcion = this.formTratamiento.descripcion;
    this.tratamientoDTO.fecha = this.formTratamiento.fecha;

 

    const userId = this.getUserIdint();


    if (userId !== null) {
      console.log("USER ID --> ", userId);
      console.log("MASCOTA ID --> ", this.selectedMascota.id);
      console.log("DROGA ID --> ", this.drogaID);
      console.log("TRATAMIENTO DTO --> ", this.tratamientoDTO);

      console.log(userId, this.selectedMascota.id, this.drogaID, this.tratamientoDTO);
      this.tratamientoService.agregarTratamientoID(userId, this.selectedMascota.id, this.drogaID, this.tratamientoDTO);
    } else {
      // handle the case where userId is null
    }
    this.router.navigate(['/veterinario/perfil/' + this.getUserId()]);  
  }

}
