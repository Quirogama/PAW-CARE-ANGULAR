import { Component } from '@angular/core';
import { veterinario } from '../veterinario';
import { MascotaService } from 'src/app/service/mascota.service';
import { Router } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-veterinario-form',
  templateUrl: './veterinario-form.component.html',
  styleUrls: ['./veterinario-form.component.css']
})
export class VeterinarioFormComponent {

  sendVeterinario!: veterinario;

  veterinarioList: veterinario[] = [];

  formVeterinario: veterinario = {
    id: 0,
    nombre: '',
    cedula: 0,
    especialidad: '',
    numAtenciones: 0,
    imagen: 'assets/img/veterinarioGenerico.png',
    clave: ''
  }

  constructor(private veterinarioService: VeterinarioService,
              private router: Router){ }

  addVeterinario() {
    this.sendVeterinario = this.formVeterinario;
    this.veterinarioService.addVeterinario(this.sendVeterinario);
    this.router.navigate(['/veterinarios'])
  }

  validarFormulario() {
    if (!this.formVeterinario.nombre || !this.formVeterinario.cedula || !this.formVeterinario.especialidad || !this.formVeterinario.imagen || !this.formVeterinario.clave) {
      alert('Todos los campos marcados con * son obligatorios');
      return false;
    }
    return true;
  }

}
