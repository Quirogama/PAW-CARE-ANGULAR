import { Component, EventEmitter, Output } from '@angular/core';
import { mascota } from '../mascota';
import { lastValueFrom } from 'rxjs';
import { MascotaService } from 'src/app/service/mascota.service';
import { Router, RouterLink } from '@angular/router';
import { cliente } from '../../cliente/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { mascotaDTO } from './mascotaDTO';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.css']
})
export class MascotaFormComponent {

  @Output()
  addMascotaEvent = new EventEmitter<mascota>();

  sendMascota!: mascota;

  mascotaDTO: mascotaDTO = {
    id: 0,
    nombre: '',
    peso: '',
    raza: '',
    enfermedad: '',
    estado: '',
    edad: 1,
    imagen: ''
  }

  mascotaList: mascota[] = [];

  clientes: cliente[] = [];

  formMascota: mascota = {
    id: 0,
    nombre: '',
    peso: '',
    raza: '',
    enfermedad: '',
    estado: '',
    edad: 1,
    imagen: '',
    cedulaCliente: 0
  }

  constructor(private mascotaService: MascotaService,
              private clienteService: ClienteService,
              private router: Router
  )
   {
   }

   ngOnInit(): void {
    this.mascotaService.findAll().subscribe((mascotas) => {
      this.mascotaList = mascotas;
    });

    // Cargar la lista de clientes
    this.clienteService.findAll().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }
  /*addMascota() {
    if (this.validarFormulario()) {
      this.mascotaList.push(this.formMascota);
      this.mascotaService.addMascota(this.formMascota);
      this.formMascota.id = this.mascotaList.length + 1;

      this.clienteService.addMascota(this.formMascota, this.formMascota.cedulaCliente);

      this.router.navigate(['/mascotas']);
    }
    else {
      alert('Todos los campos marcados con * son obligatorios');
    }
  }
    */
  addMascota() : void {
    this.mascotaDTO.id = this.mascotaList.length + 1;
    this.mascotaDTO.nombre = this.formMascota.nombre;
    this.mascotaDTO.peso = this.formMascota.peso.toString();    
    this.mascotaDTO.raza = this.formMascota.raza;
    this.mascotaDTO.enfermedad = this.formMascota.enfermedad;
    this.mascotaDTO.estado = this.formMascota.estado;
    this.mascotaDTO.edad = this.formMascota.edad;
    this.mascotaDTO.imagen = this.formMascota.imagen;

    console.log(this.mascotaDTO);
    console.log(this.formMascota.cedulaCliente);

    this.mascotaService.agregarMascota(this.formMascota.cedulaCliente, this.mascotaDTO).subscribe(
      (response) => {
        console.log('Mascota agregada:', response);
        this.addMascotaEvent.emit(this.sendMascota);
        this.router.navigate(['/mascotas']);
      },
    (error) => {
      console.error('Error al agregar la mascota:', error);
    });
  }

  
  validarFormulario() {
    if (!this.formMascota.nombre || !this.formMascota.peso || !this.formMascota.raza || 
        !this.formMascota.enfermedad || !this.formMascota.estado || !this.formMascota.edad) {
      alert('Todos los campos marcados con * son obligatorios');
      return false;
    }
    return true;
  }
  

  addMasc(form:any) {
    console.log(this.formMascota);
    this.sendMascota = Object.assign({}, this.formMascota);
    this.addMascotaEvent.emit(this.sendMascota); 
  }

}
