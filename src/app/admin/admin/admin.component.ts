import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsuarioView } from 'src/app/shared/models/admin/usuarioView';
import { AdminService } from '../admin.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  usuarios: UsuarioView[] = [];
  usuarioToDelete: UsuarioView | undefined;
  modalRef?: BsModalRef;

  constructor(private adminService: AdminService,
              private sharedService: SharedService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.adminService.getUsuarios().subscribe({
      next: usuarios => this.usuarios = usuarios
    });
  }

  lockUsuario(id: string) {
    this.adminService.lockUsuario(id).subscribe({
      next: _ => {
        this.handleLockUnlockFilterAndMessage(id, true);
      }
    })
  }

  unlockUsuario(id: string) {
    this.adminService.unlockUsuario(id).subscribe({
      next: _ => {
        this.handleLockUnlockFilterAndMessage(id, false);
      }
    })
  }

  deleteUsuario(id: string, template: TemplateRef<any>) {
    let usuario = this.findUsuario(id);
    if (usuario) {
      this.usuarioToDelete = usuario;
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }
  }

  confirm() {
    if(this.usuarioToDelete) {
      this.adminService.deleteUsuario(this.usuarioToDelete.id).subscribe({
        next: _ => {
          this.sharedService.showNotification(true, 'Deletado', `Usuário ${this.usuarioToDelete?.userName} foi deletado !`);
          this.usuarios = this.usuarios.filter(x => x.id !== this.usuarioToDelete?.id);
          this.usuarioToDelete = undefined;
          this.modalRef?.hide();
        }
      })
    }
  }

  decline() {
    this.usuarioToDelete = undefined;
    this.modalRef?.hide();
  }

  private handleLockUnlockFilterAndMessage(id: string, locking: boolean) {
    let usuario = this.findUsuario(id);

    if (usuario) {
      usuario.isLocked = !usuario.isLocked;
      if (locking) {
        this.sharedService.showNotification(true, 'Bloqueado', `${usuario.userName}`);
      } else {
        this.sharedService.showNotification(true, 'Desbloqueado', `${usuario.userName}`);
      }
    }
  }

  private findUsuario(id: string): UsuarioView | undefined {
    let usuario = this.usuarios.find(x => x.id === id);
    if (usuario) {
      return usuario;
    }

    return undefined;
  }

}
