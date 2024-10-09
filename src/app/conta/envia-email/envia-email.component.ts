import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContaService } from '../conta.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/conta/user';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-envia-email',
  templateUrl: './envia-email.component.html',
  styleUrls: ['./envia-email.component.css']
})
export class EnviaEmailComponent {

  emailForm: FormGroup = new FormGroup({});
  submitted = false;
  mode: string | undefined;
  errorMessages: string[] = [];

  constructor(private contaService: ContaService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.contaService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          const mode = this.activatedRoute.snapshot.paramMap.get('mode');
          if (mode) {
            this.mode = mode;
            this.initializeForm();
          }
        }
      }
    })
  }

  initializeForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.required,],
    })
  }

  sendEmail() {
    this.submitted = true;
    this.errorMessages = [];

    if (this.emailForm.valid && this.mode) {
      if (this.mode.includes('resend-email-confirmation-link')) {
        this.spinner.show();
        this.contaService.resendEmailConfirmationLink(this.emailForm.get('email')?.value).subscribe({
          next: (response: any) => {
            this.spinner.hide();
            this.sharedService.showNotification(true, response.value.title, response.value.message);
            this.router.navigateByUrl('/conta/login');
          }, error: error => {
            this.spinner.hide();
            if (error.error.errors) {
              this.errorMessages = error.error.errors;
            } else {
              this.errorMessages.push(error.error);
            }
          },
          complete: () => {
            this.spinner.hide();
          }
        })
      } else if (this.mode.includes('forgot-username-or-password')) {
        this.spinner.show();
        this.contaService.forgotUsernameOrPassword(this.emailForm.get('email')?.value).subscribe({
          next: (response: any) => {
            this.sharedService.showNotification(true, response.value.title, response.value.message);
            this.router.navigateByUrl('/conta/login');
          }, error: error => {
            this.spinner.hide();
            if (error.error.errors) {
              this.errorMessages = error.error.errors;
            } else {
              this.errorMessages.push(error.error);
            }
          },
          complete: () => {
            this.spinner.hide();
          }
        })
      }
    }
  }

  cancel() {
    this.router.navigateByUrl('/conta/login');
  }

}
