import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { ContaService } from "src/app/conta/conta.service";
import { SharedService } from "../shared.service";
import { map, Observable } from "rxjs";
import { User } from "../models/conta/user";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{

  constructor(private contaService: ContaService,
              private sharedService: SharedService,
              private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.contaService.user$.pipe(
      map((user: User | null) => {
        if (user) {
          const decodedToken: any = jwt_decode(user.jwt);
          if(decodedToken.role.includes('Super')){
            return true;
          }
        }
        this.sharedService.showNotification(false, 'Area administrativa', 'Inacessível');
        this.router.navigateByUrl('/');
        return false;
      })
    );
  }

}
