import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContaService } from '../conta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/conta/user';
import { environment } from 'src/environments/environment.development';
import jwt_decode from 'jwt-decode';
import { PrestadorService } from 'src/app/prestador/prestador-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  returnUrl: string | null = null;
  botaoReenvio: boolean = false;
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  constructor(private contaService: ContaService,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private prestadorService: PrestadorService,
              private _renderer2: Renderer2,
              @Inject(DOCUMENT) private _document: Document) {
                this.contaService.user$.pipe(take(1)).subscribe({
                  next: (user: User | null) => {
                    if(user) {
                      console.log("Aqui", user);
                      this.router.navigateByUrl('/');
                    }
                    else{
                      this.activatedRoute.queryParamMap.subscribe({
                        next: (param: any) => {
                          if(param){
                            this.returnUrl = param.get('returnUrl');
                          }
                        }
                      })
                    }
                  }
                });
              }

    initializeForm() {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      })
    }

    ngOnInit() {
      this.initializeForm();
    }

    login() {
      this.submitted = true;
      this.errorMessages = [];

      if (this.loginForm.valid) {
        this.spinner.show();
        this.contaService.login(this.loginForm.value).subscribe({
          next: (response: any) => {
            if (this.isLocalStorageAvailable) {
              const key = localStorage.getItem(environment.userKey);
              if(key){
                const user: User = JSON.parse(key);
                const decodedToken: any = jwt_decode(user.jwt);
                const email = decodedToken.email;
                const role = decodedToken.role;
                const nome = decodedToken.given_name;
                const sobrenome = decodedToken.family_name;
                this.consultaPrestadorExiste(email+'|'+nome+'|'+sobrenome);
              }
            }
          },
          error: error => {
            if (error.error.errors) {
              console.log("Caiu 1");
              this.errorMessages = error.error.errors;
              this.spinner.hide();
            } else {
              console.log("Caiu 2", error.error);
              if(error.error == "Confirme seu email"){
                this.botaoReenvio = true;
              }
              this.errorMessages.push(error.error);
              this.spinner.hide();
            }
          },
          complete: () => {
            this.spinner.hide();
          }
        })
      }
    }

    consultaPrestadorExiste(email: string) {
      let emailConsulta = email.split('|');
      this.prestadorService.getPrestadorExiste(emailConsulta[0]).subscribe({
        next: (response: any) => {
          console.log("Ver se prestador existe: ", response);

          this.router.navigate(['/completar-prestador/', email]);
        }, error: error => {
          this.router.navigateByUrl('/prestador');
        }
    })
  }

    resendEmailConfirmationLink() {
      this.router.navigateByUrl('/conta/envia-email/resend-email-confirmation-link');
    }

}
