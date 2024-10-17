import { Component, EventEmitter, Output } from '@angular/core';
import { cliente } from '../cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-registro',
  templateUrl: './cliente-registro.component.html',
  styleUrls: ['./cliente-registro.component.css']
})
export class ClienteRegistroComponent {


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

  constructor(private clienteService: ClienteService,
              private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.clienteService.findAll().subscribe(
      (clientes) => {
        this.clienteList = clientes;
      }
    );
  }

  addCliente(){
  if (this.validarFormulario()) {
    this.clienteList.push(this.formCliente);
    this.clienteService.addCliente(this.formCliente);
    this.formCliente.id = this.clienteList.length + 1;
    this.router.navigate(['/login']);
    // Navigate or perform other actions if necessary
  } else {
    alert('Todos los campos marcados con * son obligatorios');
  }
  }

  validarFormulario() {
    if (!this.formCliente.nombre || !this.formCliente.cedula || !this.formCliente.celular || !this.formCliente.clave) {
      alert('Todos los campos marcados con * son obligatorios');
      return false;
    }
    return true;
  }

}

