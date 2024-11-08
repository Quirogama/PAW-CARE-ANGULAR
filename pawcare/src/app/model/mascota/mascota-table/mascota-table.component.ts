import { Component } from '@angular/core';
import { mascota } from '../mascota';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-mascota-table',
  templateUrl: './mascota-table.component.html',
  styleUrls: ['./mascota-table.component.css']
})

export class MascotaTableComponent {
  selectedMascota!: mascota;


  mascotaList: mascota[] = [];

  constructor(private mascotaService: MascotaService) { }

  //Metodos
  ngOnInit(): void {
    this.mascotaService.findAll().subscribe(
      (mascotas) => {
        this.mascotaList = mascotas;
      }
    );
  }

  onEstadoChange(event: Event) {
    const estadoSeleccionado = (event.target as HTMLSelectElement).value;
    this.mascotaService.findAll().subscribe(
      (mascotas) => {
        this.mascotaList = mascotas;
        if (estadoSeleccionado === "Todos") {
          this.todas(); // Método que carga todas las mascotas sin filtro
        } else if (estadoSeleccionado === "Recuperado") {
          this.filtrarMascotasREC();
        } else if (estadoSeleccionado === "En observación") {
          this.filtrarMascotasOBS();
        } else if (estadoSeleccionado === "En tratamiento") {
          this.filtrarMascotasTRAT();
        }
      }
    );
  }

  todas() {
    this.mascotaService.findAll().subscribe(
      (mascotas) => {
        this.mascotaList = mascotas;
      }
    );
  }

  filtrarMascotasOBS() {
    this.mascotaList = this.mascotaList.filter(mascota => mascota.estado === "En observación");
  }

  filtrarMascotasREC() {
    this.mascotaList = this.mascotaList.filter(mascota => mascota.estado === "Recuperado");
  }

  filtrarMascotasTRAT() {
    this.mascotaList = this.mascotaList.filter(mascota => mascota.estado === "En tratamiento");
  }

  mostrarMascota(mascota: mascota) {
    this.selectedMascota = mascota;
  }
  
  eliminarMascota(mascota: mascota) {
    var index = this.mascotaList.indexOf(mascota);
    this.mascotaList.splice(index, 1);
    this.mascotaService.deleteMascota(mascota.id);
  }

  agregarMascota(mascota: mascota) {
    this.mascotaList.push(mascota);
    this.mascotaService.addMascota(mascota);
  }
}
