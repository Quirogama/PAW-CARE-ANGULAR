import { Component } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';
import { cliente } from '../cliente';

@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.css']
})
export class ClienteTableComponent {

  selectedCliente!: cliente;
  
  clienteList: cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  //Metodos
  ngOnInit(): void {
    this.clienteService.findAll().subscribe(
      (clientes) => {
        this.clienteList = clientes;
      }
    )
  }

  mostrarCliente(cliente: cliente) {
    this.selectedCliente = cliente;
  }

  agregarCliente(cliente: cliente) {
    this.clienteList.push(cliente);
    this.clienteService.addCliente(cliente); 
  }

  eliminarCliente(cliente: cliente) {
    var index = this.clienteList.indexOf(cliente);
    this.clienteList.splice(index, 1);
    this.clienteService.deleteCliente(cliente.id); 
  }

  verDetalles(cliente: cliente) {
    this.selectedCliente = cliente;
  }
}
