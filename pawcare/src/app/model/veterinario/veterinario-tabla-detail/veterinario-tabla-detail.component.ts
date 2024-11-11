import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { veterinario } from '../veterinario';
import { mascota } from '../../mascota/mascota';

@Component({
  selector: 'app-veterinario-tabla-detail',
  templateUrl: './veterinario-tabla-detail.component.html',
  styleUrls: ['./veterinario-tabla-detail.component.css']
})
export class VeterinarioTablaDetailComponent {

  veterinario: veterinario = {
    id: 0,
    nombre: '',
    cedula: 0,
    especialidad: '',
    numAtenciones: 0,
    imagen: '',
    clave: ''
  };

  mascotasEnTratamiento: mascota[] = [];

  mascota: mascota = {
    id: 0,
    nombre: '',
    raza: '',
    peso: '',
    enfermedad: '',
    estado: '',
    edad: 0,
    imagen: '',
    cedulaCliente: 0
  };

  @Input()
  mascotas: mascota[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veterinarioService: VeterinarioService,
    private mascotaService: MascotaService
  ) { }

  ngOnInit(): void {
    const vetID = Number(this.route.snapshot.paramMap.get('id'));
    if (vetID) {
      this.veterinarioService.findById(vetID).subscribe(
        (veterinarioInfo) => {
          this.veterinario = veterinarioInfo;
          this.veterinarioService.findVeterinarioMascotas(vetID).subscribe(
            (mascotas: mascota[]) => {
              this.mascotasEnTratamiento = mascotas;
              console.log("Lista de mascotas obtenida:", mascotas);
            },
          );
        },
        (error) => console.error("Error al obtener detalles del veterinario", error)
      );
    }
  }

}
