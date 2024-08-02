import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ServicosMei } from '../shared/models/servicos-mei';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {

  constructor(private http: HttpClient) { }

  getPrestadorExiste(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}Prestador/prestadorServico/${email}`)
    }

  getServicosMei(): Observable<ServicosMei[]> {
      return this.http.get<ServicosMei[]>(`${environment.baseUrl}ServicosMei/`)
      }

}
