import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SharedService } from '../shared.service';
import { ContaService } from 'src/app/conta/conta.service';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard {
  constructor(private contaService: ContaService,
    private sharedService: SharedService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.contaService.user$.pipe(
      map((user: User | null) => {
        if (user) {
          return true;
        } else {
          this.sharedService.showNotification(false, 'Area restrita', 'inacessível !');
          this.router.navigate(['conta/login'], {queryParams: {returnUrl: state.url}});
          return false;
        }
      })
    );
  }

}
