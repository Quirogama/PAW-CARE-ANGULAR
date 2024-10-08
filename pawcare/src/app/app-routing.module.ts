import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error/error-page/error-page.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { MascotaTableComponent } from './model/mascota/mascota-table/mascota-table.component';
import { MascotaDetailComponent } from './model/mascota/mascota-detail/mascota-detail.component';
import { LoginComponent } from './model/login/login.component';
import { MascotaEditComponent } from './model/mascota/mascota-edit/mascota-edit.component';
import { MascotaFormComponent } from './model/mascota/mascota-form/mascota-form.component';
import { ClienteTableComponent } from './model/cliente/cliente-table/cliente-table.component';
import { ClienteDetailComponent } from './model/cliente/cliente-detail/cliente-detail.component';
import { AdministradorDashboardComponent } from './model/administrador/administrador-dashboard/administrador-dashboard.component';
import { ClienteFormComponent } from './model/cliente/cliente-form/cliente-form.component';
import { ClienteEditComponent } from './model/cliente/cliente-edit/cliente-edit.component';
import { VeterinarioTableComponent } from './model/veterinario/veterinario-table/veterinario-table.component';


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
  //veterinarios
  { path: 'veterinarios', component: VeterinarioTableComponent},
  //administrador
  { path: 'administrador/dashboard', component: AdministradorDashboardComponent},
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
