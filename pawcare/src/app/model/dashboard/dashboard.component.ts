import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service'; 
import { MascotaService } from 'src/app/service/mascota.service';
import { mascota } from '../mascota/mascota';
import * as echarts from 'echarts';  // Importa ECharts
import { DrogaService } from 'src/app/service/droga.service';
import { droga } from '../droga/droga';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { veterinario } from '../veterinario/veterinario';
import { CurrencyPipe } from '@angular/common';
import { ClienteService } from 'src/app/service/cliente.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';

@Component({
  selector: 'app-dashboard',          
  templateUrl: './dashboard.component.html', 
  styleUrls: ['./dashboard.component.css']   
})
export class DashboardComponent implements OnInit {
  // Propiedades para los KPIs
  totalTratamientosMes!: number;
  totalVeterinariosActivos: number = 0;
  totalVeterinariosInactivos!: number;
  aumentoVet: number = 0;
  dismVet: number = 0;
  totalMascotas!: number;
  totalMascotasActivas!: number;
  totalMascotasRecuperadas!: number;	
  totalMascotasEnObservacion!: number;
  totalUsuarios: number = 0;
  aumentoCli: number = 0;
  dismCli: number = 0;
  ventasTotales!: number;
  gananciasTotales: number = 0;  
  tratamientos: number = 0;

  mascotaList: mascota[] = [];
  drogaList: droga[] = [];
  veterinarioList: veterinario[] = [];
  top5Drogas: any[] = [];
  Top5DrogasxIngresos: any[] = [];
  top5Veterinarios: any[] = [];

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
              private drogaService: DrogaService,
              private veterinarioService: VeterinarioService,
              private clienteService: ClienteService,
              private tratamientoService: TratamientoService,
              private currencyPipe: CurrencyPipe
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
        console.log(data);  // Verifica que 'data' es el valor esperado
        this.gananciasTotales = data;
      },
      (error) => {
        console.error('Error al obtener ganancias:', error);
      }
    );

    this.tratamientoService.findAll().subscribe(
      (data) => {
        this.tratamientos = data.length;
      }
    );

    this.veterinarioService.findAll().subscribe(
      (data) => {
        this.totalVeterinariosActivos = data.length;
        if (data.length > 20) {
         this.aumentoVet = data.length - 20;
        }else if (data.length < 20) {
          this.dismVet = data.length - 20;
          this.aumentoVet = 20 - data.length;
        }else if (data.length === 20){
          this.aumentoVet = 0;
        }
      }
    );

    this.clienteService.findAll().subscribe(
      (data) => {
        this.totalUsuarios = data.length;
        if (data.length > 50) {
          this.aumentoCli = data.length - 50;
        }else if (data.length < 50) {
          this.dismCli = data.length - 50;
          this.aumentoCli = 50 - data.length;
        }else if (data.length === 50){
          this.aumentoCli = 0;
        }
      }
    );

    // Valores simulados para otros KPIs
    this.totalVeterinariosInactivos = 3;

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

    this.veterinarioService.findAll().subscribe(
      (veterinarios) => {
        this.veterinarioList = veterinarios;
        this.obtenerTop5Veterinarios();
        this.pieVeterinarios();
      });
  }

  // Funciones para obtener los tops
  obtenerTop5Drogas() {
    // Ordenar las drogas por la cantidad vendida en orden descendente
    this.drogaList.sort((a, b) => b.unidadesVendidas - a.unidadesVendidas);
    
    // Tomar las 5 primeras
    this.top5Drogas = this.drogaList.slice(0, 5).map(droga => ({
      nombre: droga.nombre,
      cantidadVendida: droga.unidadesVendidas
    }));
  }

  obtenerTop5Veterinarios() {
    // Ordenar los veterinarios por la cantidad de tratamientos realizados en orden descendente
    this.veterinarioList.sort((a, b) => b.numAtenciones - a.numAtenciones);
    
    // Tomar las 5 primeras
    this.top5Veterinarios = this.veterinarioList.map(veterinario => ({
      nombre: veterinario.nombre,
      cantidadTratamientos: veterinario.numAtenciones
    }));
  }

  // Funciones para generar los gráficos
  pieVeterinarios() {
    const chartDom = document.getElementById('pieTopVeterinarios')!;
    const myChart = echarts.init(chartDom);
    console.log(this.top5Veterinarios);
    const option = {
      title: {
        text: 'Top 5 Veterinarios por Consultas',
        left: 'center',
        top: '5%',
        textStyle: {
          color: '#333',
          fontSize: 18,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      //  backgroundColor: 'rgba(0,0,0,0.7)',
      //  textStyle: {
      //    color: '#fff'
      //  }
      },
      series: [
        {
          name: 'Consultas',
          type: 'pie',
          radius: ['35%', '70%'],
          roseType: 'radius',
          data: [
            { value: this.top5Veterinarios[0].cantidadTratamientos, name: this.top5Veterinarios[0].nombre },
            { value: this.top5Veterinarios[1].cantidadTratamientos, name: this.top5Veterinarios[1].nombre },
            { value: this.top5Veterinarios[2].cantidadTratamientos, name: this.top5Veterinarios[2].nombre },
            { value: this.top5Veterinarios[3].cantidadTratamientos, name: this.top5Veterinarios[3].nombre },
            { value: this.top5Veterinarios[4].cantidadTratamientos, name: this.top5Veterinarios[4].nombre }

          ],
          color: ['#005143', '#006d62', '#00877a', '#00ad9c', '#59e0d2'],
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
  
  pieDrogasVendidas(){
    const chartDom = document.getElementById('pieDrogas')!;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Top 5 Drogas Más Vendidas',
        left: 'center',
        top: '5%',
        textStyle: {
          color: '#333',
          fontSize: 18,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: 'Droga:',
          type: 'pie',
          radius: ['40%', '70%'],
          roseType: 'radius',
          bottom: '0%',
          top: '10%',
          data: this.top5Drogas.map(droga => ({
            value: droga.cantidadVendida,
            name: droga.nombre
          })),
          color: ['#761815', '#991f1d', '#d52c27', '#d65f5b', '#f3c4c2'],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            }
          }
        }
      ]
    };

    myChart.setOption(option);
  }

  pieEstadoMascotas() {
    const chartDom = document.getElementById('pieChart')!;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Mascotas en el sistema',
        left: 'center',
        top: '5%'
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
          color: ['hsl(36, 100%, 65%)', '#008a7c', '#d52c27'],
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
