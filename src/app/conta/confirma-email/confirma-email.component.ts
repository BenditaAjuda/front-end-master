import { Component } from '@angular/core';
import { ContaService } from '../conta.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/conta/user';
import { ConfirmaEmail } from 'src/app/shared/models/conta/confirma-email';

@Component({
  selector: 'app-confirma-email',
  templateUrl: './confirma-email.component.html',
  styleUrls: ['./confirma-email.component.css']
})
export class ConfirmaEmailComponent {

  success = true;

  constructor(private contaService: ContaService,
              private sharedService: SharedService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.contaService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) =>{
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              const confirmEmail: ConfirmaEmail = {
                token: params.get('token'),
                email: params.get('email'),
              }

              this.contaService.confirmEmail(confirmEmail).subscribe({
                next: (response: any) => {
                  this.sharedService.showNotification(true, response.value.title, response.value.message);
                }, error: error => {
                  this.success = false;
                  this.sharedService.showNotification(false, "Falha", error.error);
                }
              })
            }
          })
        }
      }
    })
  }

  resendEmailConfirmationLink() {
    //this.router.navigateByUrl('/account/send-email/resend-email-confirmation-link');
  }

}
