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
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.clienteService.findById(id).pipe(
        mergeMap(
          (ClienteInfo) => {
            this.cliente = ClienteInfo;
            return this.mascotaService.findClienteMascota(this.cliente.id);
          }
        )
      ).subscribe(
        (mascotas) => {
          this.mascotas = mascotas;
        }
      )
    })
  }

  //Metodos

  ngOnInit(): void {
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
      
  }

  
}
