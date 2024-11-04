import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error/error-page/error-page.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { AdministradorDashboardComponent } from './model/administrador/administrador-dashboard/administrador-dashboard.component';
import { ClienteDetailComponent } from './model/cliente/cliente-detail/cliente-detail.component';
import { ClienteEditComponent } from './model/cliente/cliente-edit/cliente-edit.component';
import { ClienteFormComponent } from './model/cliente/cliente-form/cliente-form.component';
import { ClienteTableComponent } from './model/cliente/cliente-table/cliente-table.component';
import { DashboardComponent } from './model/dashboard/dashboard.component';
import { LoginComponent } from './model/login/login.component';
import { MascotaDetailComponent } from './model/mascota/mascota-detail/mascota-detail.component';
import { MascotaEditComponent } from './model/mascota/mascota-edit/mascota-edit.component';
import { MascotaFormComponent } from './model/mascota/mascota-form/mascota-form.component';
import { MascotaTableComponent } from './model/mascota/mascota-table/mascota-table.component';
import { VeterinarioTableComponent } from './model/veterinario/veterinario-table/veterinario-table.component';
import { VeterinarioEditComponent } from './model/veterinario/veterinario-edit/veterinario-edit.component';
import { VeterinarioDetailComponent } from './model/veterinario/veterinario-detail/veterinario-detail.component';
import { VeterinarioPerfilComponent } from './model/veterinario/veterinario-perfil/veterinario-perfil.component';
import { ClienteRegistroComponent } from './model/cliente/cliente-registro/cliente-registro.component';
import { VeterinarioFormComponent } from './model/veterinario/veterinario-form/veterinario-form.component';
import { TratamientoFormComponent } from './model/tratamiento/tratamiento-form/tratamiento-form.component';
import { TratamientoDetailComponent } from './model/tratamiento/tratamiento-detail/tratamiento-detail.component';


const routes: Routes = [
  { path: 'home', component: LandingPageComponent},
//  { path: 'InicioSesion', component: InicioSesionComponent},
  //mascotas
  { path: 'mascotas', component: MascotaTableComponent},
  { path: 'mascota/form', component: MascotaFormComponent},
  { path: 'mascota/detail/:id', component: MascotaDetailComponent},
  { path: 'mascota/edit/:id', component: MascotaEditComponent},
  //clientes
  { path: 'clientes', component: ClienteTableComponent},
  { path: 'cliente/form', component: ClienteFormComponent},
  { path: 'cliente/detail/:id', component: ClienteDetailComponent},
  { path: 'cliente/edit/:id', component: ClienteEditComponent},
  { path: 'cliente/registro', component: ClienteFormComponent},
  { path: 'cliente/crear-cuenta', component: ClienteRegistroComponent},
  //veterinarios
  { path: 'veterinarios', component: VeterinarioTableComponent},
  { path: 'veterinario/edit/:id', component: VeterinarioEditComponent},
  { path: 'veterinario/detail/:id', component: VeterinarioDetailComponent},
  { path: 'veterinario/perfil/:id', component: VeterinarioPerfilComponent},
  { path: 'veterinario/form', component: VeterinarioFormComponent},
  { path: 'tratamiento/form/:id', component: TratamientoFormComponent},
  { path: 'tratamiento/detail/:id', component: TratamientoDetailComponent},
  //administrador
  { path: 'administrador/dashboard', component: AdministradorDashboardComponent},
  //dashboard
  { path: 'dashboard', component: DashboardComponent },
  //login
  { path: 'login', component: LoginComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Restores scroll position after navigation
    anchorScrolling: 'enabled'           // Enables scrolling to anchor fragments like #section
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
