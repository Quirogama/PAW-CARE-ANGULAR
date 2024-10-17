import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error/error-page/error-page.component';
import { ContactoComponent } from './landing/contacto/contacto.component';
import { FooterComponent } from './landing/footer/footer.component';
import { GaleriaComponent } from './landing/galeria/galeria.component';
import { HeaderComponent } from './landing/header/header.component';
import { IntroComponent } from './landing/intro/intro.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { ServiciosComponent } from './landing/servicios/servicios.component';
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
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IntroComponent,
    ServiciosComponent,
    GaleriaComponent,
    ContactoComponent,
    ErrorPageComponent,
    LandingPageComponent,
    MascotaTableComponent,
    MascotaDetailComponent,
    MascotaFormComponent,
    LoginComponent,
    MascotaEditComponent,
    ClienteTableComponent,
    ClienteDetailComponent,
    AdministradorDashboardComponent,
    ClienteFormComponent,
    ClienteEditComponent,
    VeterinarioTableComponent,
    DashboardComponent,
    VeterinarioEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
