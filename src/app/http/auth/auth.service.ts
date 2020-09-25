import {Injectable} from '@angular/core';
import {UserInterface} from '../../models/user.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthRequestInterface} from '../../models/auth-request.interface';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly BASE_URL = 'http://localhost:4200/';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  public login(payload: UserInterface): Observable<AuthRequestInterface> {
    return this.http.post<AuthRequestInterface>(`${this.BASE_URL}login`, payload);
  }

  public signup(payload: UserInterface): Observable<AuthRequestInterface> {
    return this.http.post<AuthRequestInterface>(`${this.BASE_URL}signup`, payload);
  }

  public logout(): void {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
}
