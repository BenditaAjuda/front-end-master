import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestadorService } from '../prestador-service';
import { Prestador } from 'src/app/shared/models/prestador';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.component.html',
  styleUrls: ['./prestador.component.css']
})
export class PrestadorComponent implements OnInit{

  data: string | null = null;
  email!: string;
  servicosMei!: any[];
  prestador$!: Observable<Prestador>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private prestadorService: PrestadorService) {}

  ngOnInit(): void {
    this.data = this.route.snapshot.paramMap.get('email');
    if (this.data) {
      let parts = this.data.split('|');
      this.email = parts[0];
    }
    this.consultaPrestadorExiste();
  }

  consultaPrestadorExiste() {
    this.prestadorService.getPrestadorExiste(this.email).subscribe({
      next: (response: any) => {
        console.log("Ver se prestador existe: ", response);
        this.router.navigate(['/completar-prestador/', this.data]);
      }, error: error => {
        this.consultarServicosMeiPrestador();
      }
    })
  }

    consultarServicosMeiPrestador() {
    this.prestadorService.getDadosEServicosPrestador(this.email).subscribe({
      next: (response: Prestador) => {
        this.prestador$ = of(response);
        console.log(this.servicosMei);
      }, error: error => {
        console.log("Erro");

      }
    })
  }

  //acho que não precisa3
  // consultarServicosMeiPrestador() {
  //   this.prestadorService.getServicosMeiPrestador(this.email).subscribe({
  //     next: (response: any) => {
  //       this.servicosMei = response;
  //       console.log(this.servicosMei);
  //     }, error: error => {
  //       console.log("Erro");

  //     }
  //   })
  // }

  // consultarServicosMeiPrestador() {
  //   this.prestadorService.getDadosEServicosPrestador(this.email).subscribe({
  //     next: (response: any) => {
  //       this.servicosMei = response;
  //       console.log(this.servicosMei);
  //     }, error: error => {
  //       console.log("Erro");

  //     }
  //   })
  // }

  items = [
    {
      id: 401,
      nome: "Administradores",
      prestadores: null,
      isCollapsed: true
    },
    {
      id: 429,
      nome: "Geólogos",
      prestadores: null,
      isCollapsed: true
    },
    {
      id: 444,
      nome: "Químicos",
      prestadores: null,
      isCollapsed: true
    }
  ];
}
