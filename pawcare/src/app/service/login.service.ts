import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:8080/login';


  constructor(private http: HttpClient) { }

  login(cedula: string, clave: string) {
    return this.http.post<any>(this.loginUrl, { cedula, clave });
  }

  logout() {
    localStorage.removeItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
