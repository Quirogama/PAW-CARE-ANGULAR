import { Component, EventEmitter, Input, Output } from '@angular/core';
import { tratamiento } from '../tratamiento';
import { ActivatedRoute, Router } from '@angular/router';
import { DrogaService } from 'src/app/service/droga.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { droga } from '../../droga/droga';
import { mascota } from '../../mascota/mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { tratamientoDTO } from './tratamientoDTO';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-tratamiento-form',
  templateUrl: './tratamiento-form.component.html',
  styleUrls: ['./tratamiento-form.component.css']
})
export class TratamientoFormComponent {

  @Output()
  addTratamientoEvent = new EventEmitter<tratamiento>()

  @Input()
  mascotaSeleccionada!: mascota;

  tratamientoDTO: tratamientoDTO = {
    id: 0,
    descripcion: '',
    fecha: ''
  }

  drogaID: number = 0;

  drogas: droga[] = [];

  mascotas: mascota[] = [];

  tratamientos: tratamiento[] = [];

  formTratamiento: tratamiento = {
    id: 0,
    descripcion: '',
    fecha: '',
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
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.mascotaService.findById(id).subscribe(
        (mascota) => this.mascotaSeleccionada = mascota
      );
    })
  }

  ngOnInit(): void {
    this.drogaService.findAlldisp().subscribe((drogas) => {
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

  addTratamiento() {
    this.drogaService.findByNombre(this.formTratamiento.nombredroga).subscribe(
      (droga) => {
        this.drogaID = droga.id;
        const userId = this.getUserIdint();
        if (userId !== null) {
            // Construir la URL con parámetros de consulta
            const params = new HttpParams()
                .set('descripcion', this.formTratamiento.descripcion)
                .set('fecha', this.formTratamiento.fecha.toString());
    
            this.tratamientoService.agregarTratamiento(userId, this.mascotaSeleccionada.id, this.drogaID, { params })
                .subscribe(
                    (response) => {
                        console.log("Tratamiento agregado al backend con éxito", response);
                        this.router.navigate(['/veterinario/perfil/' + this.getUserId()]);
                    },
                    (error) => {
                        console.error("Error al agregar el tratamiento", error);
                    }
                );
        } else {
            console.error("User ID es nulo, no se puede agregar el tratamiento.");
        }
      }
    );
}
}
