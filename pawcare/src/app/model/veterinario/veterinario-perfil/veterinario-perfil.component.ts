import { Component, Input } from '@angular/core';
import { veterinario } from '../veterinario';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tratamiento } from '../../tratamiento/tratamiento';
import { mergeMap } from 'rxjs';
import { mascota } from '../../mascota/mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';

@Component({
  selector: 'app-veterinario-perfil',
  templateUrl: './veterinario-perfil.component.html',
  styleUrls: ['./veterinario-perfil.component.css']
})
export class VeterinarioPerfilComponent {
  tablaActual: string = 'mascotas'; // tabla mostrada por defecto
  
  @Input() 
  veterinario!: veterinario;

  @Input() 
  mascotas: mascota[] = [];
  
  @Input()
  tratamientos: tratamiento[] = [];

  tratamiento!: tratamiento;
  
  mascotasEnObservacion: mascota[] = []; // Lista de mascotas en observación

  mascotasEnTratamiento: mascota[] = [];

  constructor(private tratamientoService: TratamientoService,
              private veterinarioService: VeterinarioService,
              private mascotaService: MascotaService,
              private route: ActivatedRoute,
              private router: Router
  ) { 
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.veterinarioService.findById(id).pipe(
        mergeMap(
          (veterinarioInfo) => {
            this.veterinario = veterinarioInfo;
            console.log(this.veterinario);
            return this.veterinarioService.findVeterinarioTratamientos(this.veterinario.id);
          }
        )
      ).subscribe(
        (tratamientos) => {
          this.tratamientos = tratamientos;
        }
      )

      this.veterinarioService.findVeterinarioMascotas(id).subscribe({
        next: (mascotas) => {
          this.mascotasEnTratamiento = mascotas;
          console.log("Lista de mascotas obtenida:", mascotas);
        },
        error: (error) => {
          console.error("Error al obtener la lista de mascotas:", error);
        },
        complete: () => {
          console.log("Solicitud de lista de mascotas completada.");
        }
      });
    });

    
    
    // Obtener y filtrar mascotas
    this.mascotaService.findAll().subscribe((mascotas) => {
      this.mascotas = mascotas;
      this.filtrarMascotasEnObservacion();
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.veterinarioService.findById(id).subscribe({
        next: (veterinario) => {
          this.veterinario = veterinario;
          console.log("Datos del veterinario obtenidos:", veterinario);
        },
        error: (error) => {
          console.error("Error al obtener el veterinario:", error);
        },
        complete: () => {
          console.log("Solicitud de datos del veterinario completada.");
        }
      });
    });
  }
  

  filtrarMascotasEnObservacion() {
    this.mascotasEnObservacion = this.mascotas.filter(mascota => mascota.estado === "En observación");
    this.mascotas = this.mascotasEnObservacion;
  }

  mostrarTabla(tabla: string) {
    this.tablaActual = tabla;
  }

  finalizarTratamiento(mascota: mascota) {
    console.log("Finalizando tratamiento para la mascota:", mascota);

    this.tratamientoService.findByMascota(mascota.id).subscribe((tratamiento) => {
      this.tratamiento = tratamiento;
      console.log("Tratamiento finalizado:", tratamiento);
      this.tratamientoService.finalizarTratamiento(tratamiento.id);
    })

    var index = this.mascotasEnTratamiento.indexOf(mascota);
    this.mascotasEnTratamiento.splice(index, 1);
  }
}
