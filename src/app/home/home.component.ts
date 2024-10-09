import { Component, OnInit } from '@angular/core';
import { PrestadorService } from '../prestador/prestador-service';
import { ServicosMei } from '../shared/models/servicos-mei';
import { Observable, of } from 'rxjs';
import { Prestador } from '../shared/models/prestador';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  servicosMei$!: Observable<ServicosMei[]>;
  prestadores$!: Observable<Prestador[]>;

  selectedService!: number;

  constructor(private prestadorService: PrestadorService) { }

  ngOnInit() {

    this.prestadorService.getServicosMei().subscribe({
      next: (response: ServicosMei[]) => {
        this.servicosMei$ = of(response);
      },
      error: (error: any) => {
      }
    })

  }

  buscarPrestadores() {

    this.prestadorService.getPrestadorPeloServico(this.selectedService).subscribe({
      next: (response: Prestador[]) => {
        this.prestadores$ = of(response);
      },
      error: () => {
      }
    })

  }

}
