import {Injectable} from '@angular/core';
import {AuthService} from '../../http/auth/auth.service';
import {UserInterface} from '../../models/user.interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthRequestInterface} from '../../models/auth-request.interface';
import {filter, map, startWith, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthDataProvider {
  private userSource = new BehaviorSubject<UserInterface>(null);
  public user$: Observable<UserInterface>;

  constructor(
    private authService: AuthService
  ) {
    this.user$ = this.userSource.asObservable().pipe(
      startWith(JSON.parse(localStorage.getItem('user')) as UserInterface)
    );
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public login(request: UserInterface): Observable<AuthRequestInterface> {
    return this.authService.login(request)
      .pipe(
        tap(({user}) => this.userSource.next(user))
      );
  }

  public signup(request: UserInterface): Observable<AuthRequestInterface> {
    return this.authService.signup(request)
      .pipe(
        tap(({user}) => this.userSource.next(user))
      );
  }

  public logout(): void {
    this.authService.logout();
    this.userSource.next(null);
  }

  public getRole(): Observable<string> {
    return this.user$.pipe(
      filter(user => !!user),
      map(user => user.role)
    );
  }

  public currentUsername(): Observable<string> {
    return this.user$.pipe(
      filter(user => !!user),
      map(user => user.username)
    );
  }
}
