import { Component } from '@angular/core';
import { veterinario } from '../veterinario';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-veterinario-table',
  templateUrl: './veterinario-table.component.html',
  styleUrls: ['./veterinario-table.component.css']
})
export class VeterinarioTableComponent {

  selectedVeterinario!: veterinario;

  veterinarioList: veterinario[] = [];

  constructor(private veterinarioService: VeterinarioService){ }


  ngOnInit(): void {
    this.veterinarioService.findAll().subscribe(
      (veterinarios) => {
        this.veterinarioList = veterinarios;
      }
    )
  }

  mostrarVeterinario(veterinario: veterinario){
    this.selectedVeterinario = veterinario
  }

  agregarVeterinario(veterinario: veterinario) {
    this.veterinarioList.push(veterinario);
    this.veterinarioService.addVeterinario(veterinario); 
  }

  eliminarveterinario(veterinario: veterinario) {
    var index = this.veterinarioList.indexOf(veterinario);
    this.veterinarioList.splice(index, 1);
    this.veterinarioService.deleteVeterinario(veterinario.id); 
  }
}
