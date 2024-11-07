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
  ) {  
  }

  //Metodos

  ngOnInit(): void {
    /*
    this.route.paramMap.subscribe(params => {
      
      const id = Number(params.get('id'));
      this.clienteService.findById(id).pipe(
        mergeMap(
          (ClienteInfo) => this.mascotaService.findClienteMascota(this.cliente.id)
        )
      ).subscribe(
        (mascotas) => {
          this.cliente.mascotas = mascotas;
        }
      )
    })
      */
    this.clienteService.clienteHome().subscribe(
      (clienteInfo) => {
        this.cliente = clienteInfo;
        console.log("ID del cliente:", this.cliente.id);  // Verificar ID
    
        this.mascotaService.findClienteMascota(this.cliente.id).subscribe(
          (mascotas) => {
            if (mascotas && mascotas.length > 0) {
              this.mascotas = mascotas;
            } else {
              console.warn("No se encontraron mascotas para este cliente.");
            }
          },
          (error) => {
            console.error("Error al obtener las mascotas del cliente:", error);
          }
        );
      },
      (error) => {
        console.error("Error al obtener la información del cliente:", error);
      }
    );
    
    
    
      
  }

  
}
