import { Component, Input } from '@angular/core';
import { veterinario } from '../veterinario';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-veterinario-detail',
  templateUrl: './veterinario-detail.component.html',
  styleUrls: ['./veterinario-detail.component.css']
})
export class VeterinarioDetailComponent {

  @Input() 
  veterinario!: veterinario;

  constructor(private veterinarioService: VeterinarioService,
              private route: ActivatedRoute,
              private router: Router
  ) { 
  }

  ngOnInit(): void {
    this.veterinarioService.veterinarioHome().subscribe(
      (data) => {
        this.veterinario = data
      }
    )
  }
}
