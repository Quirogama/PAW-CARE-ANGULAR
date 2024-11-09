import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { VeterinarioDetailComponent } from './model/veterinario/veterinario-detail/veterinario-detail.component';
import { VeterinarioFormComponent } from './model/veterinario/veterinario-form/veterinario-form.component';
import { VeterinarioPerfilComponent } from './model/veterinario/veterinario-perfil/veterinario-perfil.component';
import { TratamientoFormComponent } from './model/tratamiento/tratamiento-form/tratamiento-form.component';
import { ClienteRegistroComponent } from './model/cliente/cliente-registro/cliente-registro.component';
import { TratamientoDetailComponent } from './model/tratamiento/tratamiento-detail/tratamiento-detail.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { MascotaHistorialComponent } from './model/mascota/mascota-historial/mascota-historial.component';
import { NgxEchartsModule } from 'ngx-echarts';
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
    VeterinarioEditComponent,
    VeterinarioDetailComponent,
    VeterinarioFormComponent,
    VeterinarioPerfilComponent,
    TratamientoFormComponent,
    ClienteRegistroComponent,
    TratamientoDetailComponent,
    MascotaHistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxEchartsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
