import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContaService } from '../conta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];

  constructor(private contaService: ContaService,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _renderer2: Renderer2,
              @Inject(DOCUMENT) private _document: Document) {
                this.contaService.user$.pipe(take(1)).subscribe({
                  next: (user: User | null) => {
                    if(user) {
                      console.log("Aqui", user);
                      this.router.navigateByUrl('/');
                    }
                  }
                })
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
            //this.toastr.success("Sucesso ao logar");
            this.router.navigateByUrl('/');
          },
          error: error => {
            if (error.error.errors) {
              this.errorMessages = error.error.errors;
              this.spinner.hide();
            } else {
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

}
