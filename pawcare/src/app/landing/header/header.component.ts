import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userType: string = 'noauth'; // Valor por defecto

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
        this.authService.setUserType(storedUserType); // Establece el userType desde localStorage
    }
    
    this.authService.userType$.subscribe(type => {
        this.userType = type; 
    });
}

getUserId(): string | null {
  return localStorage.getItem('id');
}


logout(): void {
  this.authService.setUserType('noauth');
  localStorage.removeItem('userType'); // Limpia el localStorage
  localStorage.removeItem('id'); // Limpia el ID
  this.router.navigate(['/login']);
}

}
