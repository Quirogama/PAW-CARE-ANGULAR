import { Component, Input } from '@angular/core';
import { cliente } from '../cliente/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { AdministradorService } from 'src/app/service/administrador.service';
import { Router } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { AuthService } from 'src/app/service/auth.service'; // Importa el servicio
import { user } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Input() cliente!: cliente;
  cedula: number = null!;
  clave: string = '';

  formUser: user = {
    cedula: null!,
    clave: ""
  }

  selectedRole: string | null = null;

  selectRole(role: string) {
    this.selectedRole = role;
  }

  constructor(
    private clienteService: ClienteService, 
    private veterinarioService: VeterinarioService,
    private administradorService: AdministradorService,
    private router: Router,
    private authService: AuthService // Inyecta el servicio
  ) { }

  onSubmit() {
    if (!this.selectedRole) {
      alert('Seleccione un rol para continuar.');
      return;
    }

    switch (this.selectedRole) {
      case 'cliente':
        this.login();
        break;
      case 'veterinario':
        this.loginVET();
        break;
      case 'administrador':
        this.loginADM();
        break;
    }
  }

  loginALL() {
    
  }

  login(){
    console.log(this.formUser);
    this.clienteService.login(this.formUser).subscribe(
      (data) => {
        localStorage.setItem('token', String(data));
        this.authService.setUserType('cliente'); // Establece el userType
        localStorage.setItem('userType', 'cliente'); // Almacena en localStorage
        this.router.navigate(['/cliente/home']);
      },
      (error) => {
        if (error.status === 401) {
          // Puedes mostrar un mensaje de error al usuario aquí
        } else {
          console.error(error);
        }
      }
    )
  }

  loginVET() {
    console.log("VET");
    console.log(this.formUser);
    this.veterinarioService.login(this.formUser).subscribe(
      (data) => {
        localStorage.setItem('token', String(data));
        this.authService.setUserType('veterinario'); // Establece el userType
        localStorage.setItem('userType', 'veterinario'); // Almacena en localStorage
        this.router.navigate(['/veterinario/home']);
      },
      (error) => {
        if (error.status === 401) {
          // Puedes mostrar un mensaje de error al usuario aquí
        } else {
          console.error(error);
        }
      }
    )
  }

  loginADM(){
    console.log("ADM");
    console.log(this.formUser);
    this.administradorService.login(this.formUser).subscribe(
      (data) => {
        localStorage.setItem('token', String(data));
        this.authService.setUserType('administrador'); // Establece el userType
        localStorage.setItem('userType', 'administrador'); // Almacena en localStorage
        this.router.navigate(['/administrador/dashboard/']);
      },
      (error) => {
        if (error.status === 401) {
          // Puedes mostrar un mensaje de error al usuario aquí
        } else {
          console.error(error);
        }
      }
    )
  }

  iniciarSesion() {
    if (this.cedula && this.cedula !== 0) {
        this.clienteService.findByCedula(this.cedula).subscribe(
            (clienteEncontrado) => {
                if (clienteEncontrado && clienteEncontrado.clave === this.clave) {
                    this.authService.setUserType('cliente'); // Establece el userType
                    localStorage.setItem('userType', 'cliente'); // Almacena en localStorage
                    localStorage.setItem('id', clienteEncontrado.id.toString());
                    this.router.navigate(['/cliente/detail/' + clienteEncontrado.id]);
                } else {
                    this.administradorService.findByCedula(this.cedula).subscribe(
                        (administradorEncontrado) => {
                            if (administradorEncontrado && administradorEncontrado.clave === this.clave) {
                                this.authService.setUserType('administrador'); // Establece el userType
                                localStorage.setItem('userType', 'administrador'); // Almacena en localStorage
                                localStorage.setItem('id', administradorEncontrado.id.toString());
                                this.router.navigate(['/administrador/dashboard/']);
                            } else {
                                this.veterinarioService.findByCedula(this.cedula).subscribe(
                                    (veterinarioEncontrado) => {
                                        if (veterinarioEncontrado && veterinarioEncontrado.clave === this.clave) {
                                            this.authService.setUserType('veterinario'); // Establece el userType
                                            localStorage.setItem('userType', 'veterinario'); // Almacena en localStorage
                                            localStorage.setItem('id', veterinarioEncontrado.id.toString());
                                            this.router.navigate(['/veterinario/perfil/' + veterinarioEncontrado.id]);
                                        } else {
                                            alert('Cédula o clave incorrecta. Intente de nuevo.');
                                        }
                                    },
                                    (error) => {
                                        console.error('Error al buscar el veterinario por cédula:', error);
                                    }
                                );
                            }
                        },
                        (error) => {
                            console.error('Error al buscar el administrador por cédula:', error);
                        }
                    );
                }
            },
            (error) => {
                console.error('Error al buscar el cliente por cédula:', error);
            }
        );
    } else {
        alert('Por favor, ingrese una cédula válida.');
    }
}

  

}
