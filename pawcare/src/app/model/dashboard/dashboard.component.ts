import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Propiedades para los KPIs
  totalTratamientosMes!: number;
  totalVeterinariosActivos!: number;
  totalVeterinariosInactivos!: number;
  totalMascotas!: number;
  totalMascotasActivas!: number;
  ventasTotales!: number;
  gananciasTotales!: number;

  // Datos para la tabla de tratamientos por medicamento
  tratamientosPorMedicamento = [
    { medicamento: 'Antibiótico', cantidad: 35 },
    { medicamento: 'Antiparasitario', cantidad: 50 },
    { medicamento: 'Vacuna', cantidad: 60 }
  ];

  // Datos para el top 3 tratamientos más vendidos
  topTratamientos = [
    { nombre: 'Tratamiento 1', unidadesVendidas: 100 },
    { nombre: 'Tratamiento 2', unidadesVendidas: 80 },
    { nombre: 'Tratamiento 3', unidadesVendidas: 60 }
  ];

  constructor() { }

  ngOnInit(): void {
    // Inicializar con valores simulados
    this.totalTratamientosMes = 120;          // Cantidad total de tratamientos en el último mes
    this.totalVeterinariosActivos = 10;       // Veterinarios activos
    this.totalVeterinariosInactivos = 3;      // Veterinarios inactivos
    this.totalMascotas = 200;                 // Mascotas totales
    this.totalMascotasActivas = 45;           // Mascotas en tratamiento
    this.ventasTotales = 5000;                // Ventas totales
    this.gananciasTotales = 2000;             // Ganancias totales
  }

}
