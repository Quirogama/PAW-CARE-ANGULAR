import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { MascotaService } from 'src/app/service/mascota.service';
import { cliente } from '../cliente';
import { mascota } from '../../mascota/mascota';

@Component({
  selector: 'app-cliente-tabla-detail',
  templateUrl: './cliente-tabla-detail.component.html',
  styleUrls: ['./cliente-tabla-detail.component.css']
})
export class ClienteTablaDetailComponent {

  cliente: cliente = {
    nombre: '', correo: '', cedula: 0, celular: 0, id: 0,
    clave: ''
  }; // Inicializa con valores vacíos
  
  mascota: any;

  mascotas: mascota[] = [];

  constructor(
    private clienteService: ClienteService,
    private mascotaService: MascotaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const clienteId = Number(this.route.snapshot.paramMap.get('id'));
    if (clienteId) {
      this.clienteService.findById(clienteId).subscribe(
        (clienteInfo) => {
          this.cliente = clienteInfo;
          this.mascotaService.findClienteMascota(clienteId).subscribe(
            (mascotas) => (this.mascotas = mascotas),
            (error) => console.error("Error al obtener mascotas", error)
          );
        },
        (error) => console.error("Error al obtener detalles del cliente", error)
      );
    }
  }

  onEstadoChange(event: Event) {
    const clienteId = Number(this.route.snapshot.paramMap.get('id'));
    const estadoSeleccionado = (event.target as HTMLSelectElement).value;
    if (clienteId) {
      this.clienteService.findById(clienteId).subscribe(
        (clienteInfo) => {
          this.cliente = clienteInfo;
          this.mascotaService.findClienteMascota(clienteId).subscribe(
            (mascotas) => {this.mascotas = mascotas
              if (estadoSeleccionado === "Todos") {
                this.todas(); 
              } else if (estadoSeleccionado === "Recuperado") {
                this.filtrarMascotasREC();
              } else if (estadoSeleccionado === "En observación") {
                this.filtrarMascotasOBS();
              } else if (estadoSeleccionado === "En tratamiento") {
                this.filtrarMascotasTRAT();
              }
            })
        },
        (error) => console.error("Error al obtener detalles del cliente", error)
      );
    }
  }

  todas() {
    const clienteId = Number(this.route.snapshot.paramMap.get('id'));
    if (clienteId) {
      this.clienteService.findById(clienteId).subscribe(
        (clienteInfo) => {
          this.cliente = clienteInfo;
          this.mascotaService.findClienteMascota(clienteId).subscribe(
            (mascotas) => (this.mascotas = mascotas),
            (error) => console.error("Error al obtener mascotas", error)
          );
        },
        (error) => console.error("Error al obtener detalles del cliente", error)
      );
    }
  }

  filtrarMascotasOBS() {
    this.mascotas = this.mascotas.filter(mascota => mascota.estado === "En observación");
  }

  filtrarMascotasREC() {
    this.mascotas = this.mascotas.filter(mascota => mascota.estado === "Recuperado");
  }

  filtrarMascotasTRAT() {
    this.mascotas = this.mascotas.filter(mascota => mascota.estado === "En tratamiento");
  }

}
