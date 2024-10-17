import { Component, Input } from '@angular/core';
import { cliente } from '../cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent {

  @Input() 
  cliente: cliente = {
    id: 0,
    nombre: '',
    cedula: 0,
    correo: '',
    celular: 0,
    clave: ''
  };
  
  constructor(private clienteService: ClienteService,
              private router: Router,
              private route: ActivatedRoute,
  ) { 
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.clienteService.findById(id).subscribe(
        (cliente) => this.cliente = cliente
      )
    })
  }

  guardarCambios() {
    if (!this.cliente.cedula) {
      alert('El campo cedula es obligatorio');
      return;
    }

    if (!this.cliente.correo) {
      alert('El campo correo es obligatorio');
      return;
    }

    if (!this.cliente.celular) {
      alert('El campo celular es obligatorio');
      return;
    }

    
    this.clienteService.updateCliente(this.cliente).subscribe(() => {
      //alert('Cambios guardados');
      this.router.navigate(['/clientes']);
    });
  }
  

  cancelar() {
    this.router.navigate(['/clientes']);
  }
}
