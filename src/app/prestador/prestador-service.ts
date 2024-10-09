import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ServicosMei } from '../shared/models/servicos-mei';
import { Prestador } from '../shared/models/prestador';

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

  cadastrarPrestador(prestador: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}Prestador`, prestador);
  }

  //acho que não vai precisar
  getServicosMeiPrestador(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}Prestador/servicosMeiPrestador/${email}`)
    }

  getDadosEServicosPrestador(email: string): Observable<Prestador> {
    return this.http.get<Prestador>(`${environment.baseUrl}Prestador/dadosPrestador/${email}`)
    }

  getPrestadorPeloServico(id: number): Observable<Prestador[]> {
    return this.http.get<Prestador[]>(`${environment.baseUrl}Prestador/prestadoresPorServico/${id}`)
    }

}

