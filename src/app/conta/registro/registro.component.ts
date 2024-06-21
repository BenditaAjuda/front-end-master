import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContaService } from '../conta.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];


  constructor(private contaService: ContaService,
              private formBuilder: FormBuilder,
              private sharedService: SharedService,
              private router: Router,
              private _renderer2: Renderer2,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              @Inject(DOCUMENT) private _document: Document) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        })
      }

      register() {
        this.submitted = true;
        this.errorMessages = [];

        if (this.registerForm.valid) {
          this.spinner.show();
          this.contaService.registro(this.registerForm.value).subscribe({
            next: (response: any) => {
              this.sharedService.showNotification(true, response.value.title, response.value.message);
              //this.toastr.success(response);
              this.spinner.hide();
              this.router.navigateByUrl('/conta/login');
            },
            error: error => {
              if(error.error.errors){
                this.errorMessages = error.error.errors;
                this.spinner.hide();
                }
              else{
                this.errorMessages.push(error.error);
                this.spinner.hide();
                }
              },
            complete: () => {
              console.log("Completou");
              this.spinner.hide();
            }
          })
       };
      }

}
