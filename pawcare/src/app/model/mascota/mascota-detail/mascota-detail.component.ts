import { Component, Input } from '@angular/core';
import { mascota } from '../mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { find } from 'rxjs';

@Component({
  selector: 'app-mascota-detail',
  templateUrl: './mascota-detail.component.html',
  styleUrls: ['./mascota-detail.component.css']
})
export class MascotaDetailComponent {

  @Input()
  mascota!: mascota;

  constructor(private mascotaService: MascotaService,
              private route: ActivatedRoute,
              private router : Router
  ) {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.mascota = this.mascotaService.findById(id);
      if (!this.mascota) {
        this.router.navigate(['/mascotas']);
      }
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit de Detail");
  }

  ngOnChanges(): void {
    console.log("ngOnChanges de Detail");
  }

  siguiente() {
    let nextID = this.mascota.id+1;
    this.router.navigate(['/mascota/detail', this.mascota.id+1]);
  }

}