import { Component, OnInit } from '@angular/core';
import { ContaService } from '../conta/conta.service';
import { take } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  papelUsuario: string[] = [];

  constructor(public contaService: ContaService) { }

  ngOnInit(): void {
    this.contaService.user$.pipe((take(1))).subscribe({
      next: user => {
        if (user) {
          const decodedToken: any = jwt_decode(user.jwt);
            if (decodedToken.role) {
              this.papelUsuario = decodedToken.role
            } else {
            }
        }
         else {
         //outra coisa
        }
      }
    })
  }

  logout() {
    this.contaService.logout();
  }

}
