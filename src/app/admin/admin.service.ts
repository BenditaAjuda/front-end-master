import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioView } from '../shared/models/admin/usuarioView';
import { environment } from 'src/environments/environment.development';
import { UsuarioAddEdit } from '../shared/models/admin/usuarioAddEdit';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get<UsuarioView[]>(`${environment.baseUrl}admin/usuarios`);
  }

  getUsuario(id: string) {
    return this.http.get<UsuarioAddEdit>(`${environment.baseUrl}admin/usuarios/${id}`);
  }

  getPapeis() {
    return this.http.get<string[]>(`${environment.baseUrl}admin/get-application-roles`);
  }

  addEditUsuario(model: UsuarioAddEdit) {
    return this.http.post(`${environment.baseUrl}admin/add-edit-member`, model);
  }

  lockUsuario(id: string) {
    return this.http.put(`${environment.baseUrl}admin/lock-member/${id}`, {});
  }

  unlockUsuario(id: string) {
    return this.http.put(`${environment.baseUrl}admin/unlock-member/${id}`, {});
  }

  deleteUsuario(id: string) {
    return this.http.delete(`${environment.baseUrl}admin/delete-member/${id}`, {});
  }

}
