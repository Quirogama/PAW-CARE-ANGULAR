import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service'; 
import { MascotaService } from 'src/app/service/mascota.service';
import { mascota } from '../mascota/mascota';
import * as echarts from 'echarts';  // Importa ECharts
import { DrogaService } from 'src/app/service/droga.service';
import { droga } from '../droga/droga';

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
  totalMascotasRecuperadas!: number;	
  totalMascotasEnObservacion!: number;
  ventasTotales!: number;
  gananciasTotales!: number;

  mascotaList: mascota[] = [];
  drogaList: droga[] = [];
  top5Drogas: any[] = [];

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
  constructor(private dashboardService: DashboardService,
              private mascotaService: MascotaService,
              private drogaService: DrogaService
  ) { }

  ngOnInit(): void {
    // Llamar al servicio para obtener la cantidad total de tratamientos en el último mes
    this.dashboardService.getCantidadTratamientosUltimoMes().subscribe(
      (data) => {
        this.totalTratamientosMes = data; 
      }
    );

    // Llamar al servicio para obtener la cantidad total de mascotas
    this.dashboardService.getCantidadTotalMascotas().subscribe(
      (data) => {
        this.totalMascotas = data;
      }
    );

    // Llamar al servicio para obtener las ventas totales
    this.dashboardService.getTotalVentas().subscribe(
      (data) => {
        this.ventasTotales = data; 
      }
    );

    // Llamar al servicio para obtener las ganancias totales
    this.dashboardService.getTotalGanancias().subscribe(
      (data) => {
        this.gananciasTotales = data; 
      }
    );

    // Valores simulados para otros KPIs
    this.totalVeterinariosActivos = 10;
    this.totalVeterinariosInactivos = 3;

    // Obtener las mascotas y calcular las estadísticas
    this.mascotaService.findAll().subscribe(
      (mascotas) => {
        this.mascotaList = mascotas;
        this.totalMascotasActivas = this.mascotaList.filter(mascota => mascota.estado === "En tratamiento").length;
        this.totalMascotasRecuperadas = this.mascotaList.filter(mascota => mascota.estado === "Recuperado").length;
        this.totalMascotasEnObservacion = this.mascotaList.filter(mascota => mascota.estado === "En observación").length;

        this.pieEstadoMascotas();
      }
    );

    this.drogaService.findAll().subscribe(
      (drogas) => {
        this.drogaList = drogas;
        this.obtenerTop5Drogas();
        this.pieDrogasVendidas();
      }
    );
  }

  obtenerTop5Drogas() {
    // Ordenar las drogas por la cantidad vendida en orden descendente
    this.drogaList.sort((a, b) => b.unidadesVendidas - a.unidadesVendidas);
    
    // Tomar las 5 primeras
    this.top5Drogas = this.drogaList.slice(0, 5).map(droga => ({
      nombre: droga.nombre,
      cantidadVendida: droga.unidadesVendidas
    }));
  }


  pieDrogasVendidas(){
    const chartDom = document.getElementById('pieDrogas')!;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Top 5 Drogas Más Vendidas',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 18,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        backgroundColor: 'rgba(0,0,0,0.7)',
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name: 'Droga:',
          type: 'pie',
          radius: '50%',
          data: this.top5Drogas.map(droga => ({
            value: droga.cantidadVendida,
            name: droga.nombre
          })),
          color: ['#ef7f7f', '#efe47f', '#99ef7f', '#7fefe2', '#ef7fe9'],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    myChart.setOption(option);
  }

  // Función para hacer el gráfico de pastel de mascotas
  pieEstadoMascotas() {
    const chartDom = document.getElementById('pieChart')!;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Mascotas en el sistema',
        left: 'center',
        top: 'top'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      series: [
        {
          name: 'Estado:',
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.totalMascotasActivas, name: 'En tratamiento' },
            { value: this.totalMascotasRecuperadas, name: 'Recuperadas' },
            { value: this.totalMascotasEnObservacion, name: 'En observación' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    myChart.setOption(option);
  }
}
