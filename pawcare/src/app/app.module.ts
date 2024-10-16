import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './landing/header/header.component';
import { FooterComponent } from './landing/footer/footer.component';
import { IntroComponent } from './landing/intro/intro.component';
import { ServiciosComponent } from './landing/servicios/servicios.component';
import { GaleriaComponent } from './landing/galeria/galeria.component';
import { ContactoComponent } from './landing/contacto/contacto.component';
import { ErrorPageComponent } from './error/error-page/error-page.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { MascotaTableComponent } from './model/mascota/mascota-table/mascota-table.component';
import { MascotaDetailComponent } from './model/mascota/mascota-detail/mascota-detail.component';
import { MascotaFormComponent } from './model/mascota/mascota-form/mascota-form.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './model/login/login.component';
import { MascotaEditComponent } from './model/mascota/mascota-edit/mascota-edit.component';
import { ClienteTableComponent } from './model/cliente/cliente-table/cliente-table.component';
import { ClienteDetailComponent } from './model/cliente/cliente-detail/cliente-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { AdministradorDashboardComponent } from './model/administrador/administrador-dashboard/administrador-dashboard.component';
import { ClienteFormComponent } from './model/cliente/cliente-form/cliente-form.component';
import { ClienteEditComponent } from './model/cliente/cliente-edit/cliente-edit.component';
import { VeterinarioTableComponent } from './model/veterinario/veterinario-table/veterinario-table.component';

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
