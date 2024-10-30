import { Component, EventEmitter, Output } from '@angular/core';
import { tratamiento } from '../tratamiento';
import { ActivatedRoute, Router } from '@angular/router';
import { DrogaService } from 'src/app/service/droga.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { droga } from '../../droga/droga';
import { mascota } from '../../mascota/mascota';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-tratamiento-form',
  templateUrl: './tratamiento-form.component.html',
  styleUrls: ['./tratamiento-form.component.css']
})
export class TratamientoFormComponent {

  @Output()
  addTratamientoEvent = new EventEmitter<tratamiento>()



  drogas: droga[] = [];

  mascotas: mascota[] = [];

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
  }

  selectedMascota: any;

  getMascotaId(event: any) {
    this.formTratamiento.nombremascota = event.nombre;
    this.formTratamiento.idmascota = event.id;
  }

  addTratamiento(){
    alert("Tratamiento agregado");
    this.route.params.subscribe(params => {
      this.formTratamiento.cedulaVeterinario = params['id'];
    })
    const mascotaId = this.formTratamiento.idmascota;
    this.mascotaService.findById(mascotaId).subscribe((mascota) => {
      this.formTratamiento.nombremascota = mascota.nombre;
    })

    this.tratamientoService.addTratamiento(this.formTratamiento);
    this.router.navigate(['/veterinario/perfil/{id}']);
  }

}
