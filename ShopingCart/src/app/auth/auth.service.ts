import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticate: boolean = false;

  constructor() {}
  login(email: string, password: string): Observable<boolean> {
    if (email === 'admin@gmail.com' && password === 'admin') {
      this.isAuthenticate = true;
      return of(true);
    }
    return of(false);
  }
}
