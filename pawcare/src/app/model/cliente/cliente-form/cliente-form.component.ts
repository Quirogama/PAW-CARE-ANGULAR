import { Component, EventEmitter, Output } from '@angular/core';
import { cliente } from '../cliente';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent {

  @Output()
  addClienteEvent = new EventEmitter<cliente>();

  sendCliente!: cliente;

  clienteList: cliente[] = [];

  formCliente: cliente = {
    id: 0,
    nombre: '',
    correo: '',
    cedula: 0,
    celular: 0,
    clave: ''
  }


  addCliente(){
    
  }

}
