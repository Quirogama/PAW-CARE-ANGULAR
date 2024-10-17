import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service'; // Asegúrate de importar el servicio correctamente

@Component({
  selector: 'app-dashboard',           // El nombre del componente
  templateUrl: './dashboard.component.html', // La ruta al archivo HTML del componente
  styleUrls: ['./dashboard.component.css']   // La ruta a los estilos CSS del componente
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

  // Inyectamos el servicio en el constructor
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    // Llamar al servicio para obtener la cantidad total de tratamientos en el último mes
    this.dashboardService.getCantidadTratamientosUltimoMes().subscribe(
      (data) => {
        this.totalTratamientosMes = data; // Asignamos los datos reales obtenidos desde el backend
      }
    );

    
    this.dashboardService.getCantidadTotalMascotas().subscribe(
      (data) => {
        this.totalMascotas = data; // Asignamos los datos reales obtenidos desde el backend
      }
    );
  
    // Valores simulados para otros KPIs (puedes reemplazarlos con llamados reales en el futuro)
    this.totalVeterinariosActivos = 10;
    this.totalVeterinariosInactivos = 3;
    this.totalMascotasActivas = 45;
    this.ventasTotales = 5000;
    this.gananciasTotales = 2000;
  }
}
