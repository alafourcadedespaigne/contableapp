import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Route} from '@angular/router';
import {AuthService} from './auth.service';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService) {
  }


  canActivate() {

    return this.authService.isAuth();
  }

  canLoad(route: Route) {
    return this.authService.isAuth()
      .pipe(
        take(1)
      );
  }

}
