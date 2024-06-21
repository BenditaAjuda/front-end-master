import { Component } from '@angular/core';
import { ContaService } from './conta/conta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bendita Ajuda';

  constructor(private contaService: ContaService) {}

  ngOnInit(): void {
    this.refreshUser();
  }

  private refreshUser() {
    const jwt = this.contaService.getJWT();
    if(jwt) {
      this.contaService.refreshUser(jwt).subscribe({
        next: _ => {},
        error: _ => {
          this.contaService.logout();
        }
      })
    }
    else {
      this.contaService.refreshUser(null).subscribe();
    }
  }

}
