import { Component, OnInit } from '@angular/core';
import { ContaService } from '../conta/conta.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(public contaService: ContaService) { }

  ngOnInit(): void {
    console.log(this.contaService.user$);
  }

  logout() {
    this.contaService.logout();
  }

}
