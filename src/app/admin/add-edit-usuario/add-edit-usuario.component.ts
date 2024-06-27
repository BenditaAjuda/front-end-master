import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioAddEdit } from 'src/app/shared/models/admin/usuarioAddEdit';

@Component({
  selector: 'app-add-edit-usuario',
  templateUrl: './add-edit-usuario.component.html',
  styleUrls: ['./add-edit-usuario.component.css']
})
export class AddEditUsuarioComponent implements OnInit {

  usuarioForm: FormGroup = new FormGroup({});
  formInitialized = false;
  addNew = true;
  submitted = false;
  errorMessages: string[] = [];
  applicationRoles: string[] = [];
  existingUsuarioRoles: string[] = [];

  constructor(private adminService: AdminService,
              private sharedService: SharedService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.addNew = false; // this means we are editing a member
      this.getUsuario(id);
    } else {
      this.initializeForm(undefined);
    }

    //this.getRoles();
  }

  getUsuario(id: string) {
    this.adminService.getUsuario(id).subscribe({
      next: usuario => {
        this.initializeForm(usuario);
      }
    })
  }

  /*getRoles() {
    this.adminService.getApplicationRoles().subscribe({
      next: roles => this.applicationRoles = roles
    });
  }*/

  initializeForm(usuario: UsuarioAddEdit | undefined) {
    if (usuario) {
      // form for editing an existing member
      this.usuarioForm = this.formBuilder.group({
        id: [usuario.id],
        firstName: [usuario.firstName, Validators.required],
        lastName: [usuario.lastName, Validators.required],
        userName: [usuario.userName, Validators.required],
        password: [''],
        roles: [usuario.roles, Validators.required]
      });
      this.existingUsuarioRoles = usuario.roles.split(',');
    } else {
      // form for creating a member
      this.usuarioForm = this.formBuilder.group({
        id: [''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
        roles: ['', Validators.required]
      });
    }

    this.formInitialized = true;
  }

  submit() {
    this.submitted = true;
    this.errorMessages = [];

    if (this.usuarioForm.valid) {
      this.adminService.addEditUsuario(this.usuarioForm.value).subscribe({
        next: (response: any) => {
          this.sharedService.showNotification(true, response.value.titile, response.value.message);
          this.router.navigateByUrl('/admin');
        },
        error: error => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
          }
        }
      })
    }
  }

}
