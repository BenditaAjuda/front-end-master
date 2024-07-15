import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioAddEdit } from 'src/app/shared/models/admin/usuarioAddEdit';
import { NgxSpinnerService } from 'ngx-spinner';

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
  usuarioEdit?: UsuarioAddEdit;
  id?: any;
  roleAtual: string = "";
  roleShowChanges: string[] = []

  constructor(private adminService: AdminService,
              private sharedService: SharedService,
              private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.spinner.show();
    this.buscarUsuarioId();
    this.getRoles();

    this.usuarioForm = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      userName: [''],
      password: [''],
      roles: ['', Validators.required]
    })

  }

  public buscarUsuarioId(): void{
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.adminService.getUsuario(this.id).subscribe({
        next: (usuario: UsuarioAddEdit) => {
          this.usuarioForm.patchValue(usuario);
          this.roleAtual = usuario.roles;
          this.spinner.hide();
          },
        error: (error: any) => {
          this.spinner.hide();
          },
        complete: () => {
          this.spinner.hide();
          }
      });
}

  getUsuario(id: string) {
    this.adminService.getUsuario(id).subscribe({
      next: (usuario : UsuarioAddEdit) => {
        this.usuarioEdit = usuario;
      }
    })
  }

  getRoles() {
    this.adminService.getPapeis().subscribe({
      next: roles => this.applicationRoles = roles
    });
  }

  roleOnChange(selectedRole: string) {
    let roles = this.usuarioForm.get('roles')?.value.split(',');
    const index = roles.indexOf(selectedRole);
    index !== -1 ? roles.splice(index, 1) : roles.push(selectedRole);

    if (roles[0] === "") {
      roles.splice(0, 1);
    }

    this.usuarioForm.controls['roles'].setValue(roles.join(','));

    this.roleShowChanges = this.usuarioForm.get('roles')?.value

    console.log("Array: ", this.usuarioForm.get('roles')?.value);
  }

  submit() {
    console.log("Form: ", this.usuarioForm);
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

