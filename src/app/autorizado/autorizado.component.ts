import { Component, OnInit } from '@angular/core';
import { AutorizadoService } from './autorizado.service';
import { CategoriaDescricao } from '../shared/models/categoria-descricao';

@Component({
  selector: 'app-autorizado',
  templateUrl: './autorizado.component.html',
  styleUrls: ['./autorizado.component.css']
})
export class AutorizadoComponent implements OnInit {

  categoriaDescricao: CategoriaDescricao[] = [];

  constructor(private autorizadoService: AutorizadoService) { }

  ngOnInit() {
    this.getCategoriaDescricao();
  }

  getCategoriaDescricao(){
    this.autorizadoService.getcategoriasDescricao().subscribe({
      next: (response: CategoriaDescricao[]) => {
        this.categoriaDescricao = response;
        console.log("Aqui: ", this.categoriaDescricao);
      },
      error: (error: any) => {
        console.log("Erro: ", error.error);
      },
      complete: () => {

      }
    })
  }

}
