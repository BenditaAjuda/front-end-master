import { Component } from '@angular/core';
import { ContaService } from './conta/conta.service';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bendita Ajuda';

  constructor(private contaService: ContaService,
              private sharedService: SharedService) {}

  ngOnInit(): void {
    this.refreshUser();
  }

  private refreshUser() {
    const jwt = this.contaService.getJWT();
    if(jwt) {
      this.contaService.refreshUser(jwt).subscribe({
        next: _ => {},
        error: error => {
          this.contaService.logout();
          if(error.status ===401){
            this.sharedService.showNotification(false, "Conta bloqueada", error.error);
          }
        }
      })
    }
    else {
      this.contaService.refreshUser(null).subscribe();
    }
  }

}
