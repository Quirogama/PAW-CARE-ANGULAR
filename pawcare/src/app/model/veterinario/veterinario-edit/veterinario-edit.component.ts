import { Component, Input } from '@angular/core';
import { veterinario } from '../veterinario';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-veterinario-edit',
  templateUrl: './veterinario-edit.component.html',
  styleUrls: ['./veterinario-edit.component.css']
})
export class VeterinarioEditComponent {

  @Input()
  veterinario: veterinario = {
    id: 0,
    cedula: 0,
    nombre: '',
    especialidad: '',
    numAtenciones: 0,
    imagen: '',
    clave: ''
  };

  constructor(private veterinarioService: VeterinarioService,
              private route: ActivatedRoute,
              private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.veterinarioService.findById(id).subscribe(
        (veterinario) => this.veterinario = veterinario
      )
    })
   }

   guardarCambios(){
    this.veterinarioService.updateVeterinario(this.veterinario).subscribe(() => {
      this.router.navigate(['/veterinarios']);
    })
  }

  cancelar() {
    this.router.navigate(['/veterinarios']);
  }
}
