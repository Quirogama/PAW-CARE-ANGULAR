import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Propiedades para las estadísticas
  totalMascotas!: number;
  totalClientes!: number;
  proximasCitas!: number;
  totalVeterinarios!: number;


  constructor() { }

  ngOnInit(): void {
    // Inicializar con valores genéricos
    this.totalMascotas = 150;      // Este dato será dinámico más adelante
    this.totalClientes = 85;       // Este dato será dinámico más adelante
    this.proximasCitas = 5;        // Este dato será dinámico más adelante
    this.totalVeterinarios = 10;   // Este dato será dinámico más adelante
  }

}
