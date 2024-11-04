import { Component, Input } from '@angular/core';
import { veterinario } from '../veterinario';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tratamiento } from '../../tratamiento/tratamiento';
import { mergeMap } from 'rxjs';
import { mascota } from '../../mascota/mascota';
import { MascotaService } from 'src/app/service/mascota.service';

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

  
  mascotasEnObservacion: mascota[] = []; // Lista de mascotas en observación

  constructor(private veterinarioService: VeterinarioService,
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
    this.tablaActual = tabla; // Cambia entre 'mascotas' y 'tratamientos'
  }
}
