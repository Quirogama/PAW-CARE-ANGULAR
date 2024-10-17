import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userTypeSubject = new BehaviorSubject<string>('noauth'); // Valor inicial es 'noauth'
  userType$ = this.userTypeSubject.asObservable();

  constructor() { }

  setUserType(type: string) {
    this.userTypeSubject.next(type);
  }
}
