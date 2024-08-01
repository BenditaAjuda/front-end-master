import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {

  constructor(private http: HttpClient) { }

  getPrestadorExiste(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}Prestador/prestadorServico/${email}`)
    }

}
