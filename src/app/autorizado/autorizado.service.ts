import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaDescricao } from '../shared/models/categoria-descricao';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoService {

constructor(private http: HttpClient) { }

getcategoriasDescricao(): Observable<CategoriaDescricao[]> {
  return this.http.get<CategoriaDescricao[]>(`${environment.baseUrl}categoria/categoriasDescricao`)
  }
}
