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
    if (this.selectedRole === "cliente") {
      this.login();
    } else if (this.selectedRole === "veterinario") {
      this.loginVET();
    } else if (this.selectedRole === "administrador") {
      this.loginADM();
    }
  }

  login() {
    console.log(this.formUser);
    this.clienteService.login(this.formUser).subscribe(
      (data) => {
        localStorage.setItem('token', String(data));
        this.authService.setUserType('cliente');
        localStorage.setItem('userType', 'cliente');
        this.router.navigate(['/cliente/home']);
      },
      (error) => {
        if (error.status === 401) {
          alert('Cedula o contraseña incorrectas');
          console.error('Error de autenticación');
        } else if (error.status === 400) {
          alert('Cedula o contraseña incorrectas');
          console.error('Error de autenticación');
        } else {
          console.error(error);
        }
      }
    );
  }

  loginVET() {
    console.log("VET");
    console.log(this.formUser);
    this.veterinarioService.login(this.formUser).subscribe(
      (data) => {
        localStorage.setItem('token', String(data));
        this.authService.setUserType('veterinario');
        localStorage.setItem('userType', 'veterinario');
        this.router.navigate(['/veterinario/home']);
      },
      (error) => {
        if (error.status === 401) {
          alert('Cedula o contraseña incorrectas');
          console.error('Error de autenticación');
        } else if (error.status === 400) {
          alert('Cedula o contraseña incorrectas');
          console.error('Error de autenticación');
        } else {
          console.error(error);
        }
      }
    );
  }

  loginADM() {
    console.log("ADM");
    console.log(this.formUser);
    this.administradorService.login(this.formUser).subscribe(
      (data) => {
        localStorage.setItem('token', String(data));
        this.authService.setUserType('administrador');
        localStorage.setItem('userType', 'administrador');
        this.router.navigate(['/administrador/dashboard/']);
      },
      (error) => {
        if (error.status === 401) {
          alert('Cedula o contraseña incorrectas');
          console.error('Error de autenticación');
        } else if (error.status === 400) {
          alert('Cedula o contraseña incorrectas');
          console.error('Error de autenticación');
        } else {
          console.error(error);
        }
      }
    );
  }
}
