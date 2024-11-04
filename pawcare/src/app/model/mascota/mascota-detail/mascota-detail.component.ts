import { Component, Input } from '@angular/core';
import { mascota } from '../mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { find, mergeMap } from 'rxjs';
import { droga } from '../../droga/droga';
import { DrogaService } from 'src/app/service/droga.service';

@Component({
  selector: 'app-mascota-detail',
  templateUrl: './mascota-detail.component.html',
  styleUrls: ['./mascota-detail.component.css']
})
export class MascotaDetailComponent {

  @Input()
  mascota!: mascota;

  droga: droga = {
    id: 0,
    nombre: '',
    correo: '',
    cedula: 0,
    celular: 0
  };

  constructor(private mascotaService: MascotaService,
              private drogaService: DrogaService,
              private route: ActivatedRoute,
              private router : Router
  ) {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.mascotaService.findById(id).subscribe(
        (mascota) => this.mascota = mascota
      );
      this.drogaService.findMascotaDroga(id).subscribe(
        (droga) => this.droga = droga
      );
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log("ngOnChanges de Detail");
  }

  siguiente() {
    let nextID = this.mascota.id+1;
    this.router.navigate(['/mascota/detail', this.mascota.id+1]);
  }

}
