import { Component, EventEmitter, Output } from '@angular/core';
import { mascota } from '../mascota';
import { lastValueFrom } from 'rxjs';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.css']
})
export class MascotaFormComponent {

  @Output()
  addMascotaEvent = new EventEmitter<mascota>();

  sendMascota!: mascota;

  formMascota: mascota = {
    id: this.mascotaService.mascotaList.length + 1,
    nombre: '',
    peso: 0,
    raza: '',
    enfermedad: '',
    estado: '',
    edad: 0,
    imagen: ''
  }

  constructor(private mascotaService: MascotaService) { }

  addMascota() {
    if (!this.formMascota.nombre) {
      alert('El campo nombre es obligatorio');
      return;
    }

    if (!this.formMascota.peso) {
      alert('El campo peso es obligatorio');
      return;
    }

    if (!this.formMascota.raza) {
      alert('El campo raza es obligatorio');
      return;
    }

    if (!this.formMascota.enfermedad) {
      alert('El campo enfermedad es obligatorio');
      return;
    }

    if (!this.formMascota.estado) {
      alert('Seleccione un estado de la mascota');
      return;
    }

    if (!this.formMascota.edad) {
      alert('El campo edad es obligatorio');
      return;
    }

    console.log(this.formMascota);
    this.sendMascota = Object.assign({}, this.formMascota);
    this.addMascotaEvent.emit(this.sendMascota); 
  }

  addMasc(form:any) {
    console.log(this.formMascota);
    this.sendMascota = Object.assign({}, this.formMascota);
    this.addMascotaEvent.emit(this.sendMascota); 
  }

}
