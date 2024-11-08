import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { cliente } from '../cliente';
import { MascotaService } from 'src/app/service/mascota.service';
import { mergeMap } from 'rxjs';
import { Observable, } from 'rxjs';
import { mascota } from '../../mascota/mascota';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css']
})
export class ClienteDetailComponent {

  @Input()
  cliente!: cliente;

  @Input()
  mascotas: mascota[] = [];

  constructor(private clienteService: ClienteService,
              private route: ActivatedRoute,
              private router: Router,
              private mascotaService: MascotaService,
              private http: HttpClient
  ) {}

  //Metodos

  ngOnInit(): void {
    this.clienteService.clienteHome().pipe(
      mergeMap((clienteInfo) => {
        this.cliente = clienteInfo;
        return this.mascotaService.findClienteMascota(this.cliente.id);
      })
    ).subscribe(
      (mascotas) => {
        this.mascotas = mascotas;
      },
      (error) => {
        console.error("Error al obtener mascotas", error);
      }
    );  
  }

  onEstadoChange(event: Event) {
    const estadoSeleccionado = (event.target as HTMLSelectElement).value;
    this.clienteService.clienteHome().pipe(
      mergeMap((clienteInfo) => {
        this.cliente = clienteInfo;
        return this.mascotaService.findClienteMascota(this.cliente.id);
      })
    ).subscribe(
      (mascotas) => {
        this.mascotas = mascotas;
        if (estadoSeleccionado === "Todos") {
          this.todas(); // Método que carga todas las mascotas sin filtro
        } else if (estadoSeleccionado === "Recuperado") {
          this.filtrarMascotasREC();
        } else if (estadoSeleccionado === "En observación") {
          this.filtrarMascotasOBS();
        } else if (estadoSeleccionado === "En tratamiento") {
          this.filtrarMascotasTRAT();
        }
      },
      (error) => {
        console.error("Error al obtener mascotas", error);
      }
    );
  }

  todas() {
    this.clienteService.clienteHome().pipe(
      mergeMap((clienteInfo) => {
        this.cliente = clienteInfo;
        return this.mascotaService.findClienteMascota(this.cliente.id);
      })
    ).subscribe(
      (mascotas) => {
        this.mascotas = mascotas;
      },
      (error) => {
        console.error("Error al obtener mascotas", error);
      }
    );
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
