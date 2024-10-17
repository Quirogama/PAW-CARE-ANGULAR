import { Component, Input } from '@angular/core';
import { veterinario } from '../veterinario';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tratamiento } from '../../tratamiento/tratamiento';
import { merge, mergeMap } from 'rxjs';
import { mascota } from '../../mascota/mascota';

@Component({
  selector: 'app-veterinario-perfil',
  templateUrl: './veterinario-perfil.component.html',
  styleUrls: ['./veterinario-perfil.component.css']
})
export class VeterinarioPerfilComponent {
  @Input() 
  veterinario!: veterinario;

  @Input() 
  mascotas: mascota[] = [];

  @Input()
  tratamientos: tratamiento[] = [];


  constructor(private veterinarioService: VeterinarioService,
              private route: ActivatedRoute,
              private router: Router
  ) { 
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.veterinarioService.findById(id).pipe(
        mergeMap(
          (veterinarioInfo) => {
            this.veterinario = veterinarioInfo;
            return this.veterinarioService.findVeterinarioTratamientos(this.veterinario.id);
          }
        )
      ).subscribe(
        (tratamientos) => {
          this.tratamientos = tratamientos;
        }
      )
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.veterinarioService.findById(id).subscribe(
        (veterinario) => this.veterinario = veterinario
      )
    })
  }
}
