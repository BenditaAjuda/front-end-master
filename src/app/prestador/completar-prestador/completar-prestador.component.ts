import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CepService } from 'src/app/shared/services/cep-service';
import { PrestadorService } from '../prestador-service';
import { ServicosMei } from 'src/app/shared/models/servicos-mei';
import { Prestador } from 'src/app/shared/models/prestador';

@Component({
  selector: 'app-completar-prestador',
  templateUrl: './completar-prestador.component.html',
  styleUrls: ['./completar-prestador.component.css']
})
export class CompletarPrestadorComponent implements OnInit{


  prestador: Prestador = {
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
    nome: '',
    email: '',
    telefoneCelular: '',
    telefoneFixo: '',
    complemento: '',
    servicos: []
  };

  mensagemFormSemCep: string = "";
  cepInfo: any;
  cep: string = '';
  nome?: string;
  sobrenome?: string;
  data: string | null = null;
  form: FormGroup;
  currentStep: number = 1;
  mensagemErro = "";
  servicosMei: ServicosMei[] = [];
  selectedItems = [];
  controle: boolean = false;
  isCepValid: boolean = false;
  submitted = false;
  servicoPesquisa: string = "";
  comboUnidade: any[] = [];
  servicosSelecionados: any[] = [];
  nomeCompleto!: string;
  email!: string;

  constructor(private cepService: CepService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private prestadorService: PrestadorService) {

                this.form = new FormGroup({
                  complemento: new FormControl('', [
                    Validators.required,
                    Validators.maxLength(20)
                  ]),
                  telefoneCelular: new FormControl('', [
                    Validators.required,
                    Validators.minLength(9)
                  ]),
                  telefoneFixo: new FormControl('')
                });

              }
              get f() {
                return this.form.controls;
              }

  ngOnInit(): void {
      this.data = this.route.snapshot.paramMap.get('email');
      if (this.data) {
        let parts = this.data.split('|');
        this.email = parts[0];
        this.nome = parts[1];
        this.sobrenome = parts[2];
        this.nomeCompleto = `${this.nome} ${this.sobrenome}`
      }

      this.prestadorService.getServicosMei().subscribe({
        next: (response: ServicosMei[]) => {
          this.servicosMei = response;
        },
        error: (error: any) => {
        }
      })
  }

  validateCep() {
    // Simple validation for CEP format (00000-000)
    const cepPattern = /^[0-9]{5}[0-9]{3}$/;
    this.isCepValid = cepPattern.test(this.cep);
  }

  buscarCep() {
    this.mensagemErro = "";
    this.spinner.show();
    this.cepService.getCepInfo(this.cep).subscribe({
      next: (response: any) => {
        this.spinner.hide();
        this.cepInfo = response
        if(response.erro){
          this.mensagemErro = "Endereço não encontrado";
        }
        else{
          this.spinner.hide();
          this.prestador.cep = this.cepInfo.cep;
          this.prestador.logradouro = this.cepInfo.logradouro;
          this.prestador.bairro = this.cepInfo.bairro;
          this.prestador.cidade = this.cepInfo.localidade;
          this.prestador.estado = this.cepInfo.uf;
          this.prestador.nome = this.nomeCompleto;
          this.prestador.email = this.email;
        }
      },
      error: (error: any) => {
        this.spinner.hide();
        this.mensagemErro = "Digite o cep novamente";
      }
    })
  }

  voltar() {

  }

  onSubmit() {
    this.mensagemFormSemCep = '';
    if (this.form.valid &&
        this.prestador.cep != '' &&
        this.prestador.estado != '' &&
        this.prestador.cidade != '' ) {
      this.prestador.complemento = this.form.value.complemento;
      this.prestador.telefoneFixo = this.form.value.telefoneFixo;
      this.prestador.telefoneCelular = this.form.value.telefoneCelular;
      this.controle = true;

    } else {
      this.mensagemFormSemCep = "Complete seu endereço com um cep válido";
    }
  }


  public selecionarOrgao(orgao: any) {
    let idxOrgao = this.comboUnidade?.indexOf(orgao);
    this.comboUnidade?.splice(idxOrgao, 1);
    this.servicosSelecionados.push(orgao);
  }

  public removerTodosOrgaos() {
    this.comboUnidade = this.comboUnidade.concat(this.servicosSelecionados);
    this.servicosSelecionados = [];
  }

  public removerOrgao(orgao: any) {
    let idxOrgao = this.servicosSelecionados.indexOf(orgao);
    this.servicosSelecionados.splice(idxOrgao, 1);
    this.comboUnidade.push(orgao);
  }

  public completarCadastro() {
    const uniqueData = this.servicosSelecionados.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.id === value.id && t.nome === value.nome
      ))
    )
    this.prestador.servicos = uniqueData;
    console.log("Aqui: ", this.prestador);
  };

}
