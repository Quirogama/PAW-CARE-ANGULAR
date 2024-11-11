import { Component, Input } from '@angular/core';
import { mascota } from '../mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mascota-edit',
  templateUrl: './mascota-edit.component.html',
  styleUrls: ['./mascota-edit.component.css']
})
export class MascotaEditComponent {

  @Input()
  mascota!: mascota;

  constructor(private mascotaService: MascotaService,
              private route: ActivatedRoute,
              private router: Router
  ) {
   
  }

  ngOnInit(): void {
    console.log("ngOnInit de Edit");
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.mascotaService.findById(id).subscribe(
        (mascota) => this.mascota = mascota
      );
    })
  }

  guardarCambios() {
    if (!this.mascota.nombre) {
      alert('El campo nombre es obligatorio');
      return;
    }

    if (!this.mascota.peso) {
      alert('El campo peso es obligatorio');
      return;
    }

    if (!this.mascota.raza) {
      alert('El campo raza es obligatorio');
      return;
    }

    if (!this.mascota.enfermedad) {
      alert('El campo enfermedad es obligatorio');
      return;
    }

    if (!this.mascota.estado) {
      alert('Seleccione un estado de la mascota');
      return;
    }

    if (!this.mascota.edad) {
      alert('El campo edad es obligatorio');
      return;
    }

    this.mascotaService.updateMascota(this.mascota).subscribe({
      next: () => {
        console.log("Cambios guardados");
        this.router.navigate(['/mascotas']);
      },
      error: (error) => {
        console.error('Error al guardar cambios:', error);
        alert('Ocurrió un error al guardar los cambios.');
      }
    });
    
  }

  cancelar() {
    this.router.navigate(['/mascotas']);
  }
}
