import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CepService } from 'src/app/shared/services/cep-service';
import { PrestadorService } from '../prestador-service';
import { ServicosMei } from 'src/app/shared/models/servicos-mei';

@Component({
  selector: 'app-completar-prestador',
  templateUrl: './completar-prestador.component.html',
  styleUrls: ['./completar-prestador.component.css']
})
export class CompletarPrestadorComponent implements OnInit{

  cepInfo: any;
  cep: string = '';
  email?: string
  nome?: string;
  sobrenome?: string;
  data: string | null = null;
  form: FormGroup;
  currentStep: number = 1;
  mensagemErro = "";
  nomeCompleto = "";
  servicosMei: ServicosMei[] = [];
  selectedItems = [];

  orgaoPesquisa: string = "";
  comboUnidade: any[] = []
  orgaosSelecionados: any[] = []

  constructor(private cepService: CepService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private prestadorService: PrestadorService) {

                this.form = this.fb.group({

                    cep: ["", Validators.required],
                    logradouro: ["", [Validators.required, Validators.email]],
                    bairro: ["", [Validators.required, Validators.email]],
                    cidade: ["", [Validators.required, Validators.email]],
                    estado: ["", [Validators.required, Validators.email]],
                    nome: ['', Validators.required],
                    email: ['', Validators.required],
                    telefone: ['', Validators.required],

                });

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
          this.comboUnidade = response;
          console.log(this.servicosMei);
        },
        error: (error: any) => {
          console.log("Erro prestador mei: ", error.error);
        }
      })
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

          this.form.reset({
              cep: '',
              logradouro: '',
              bairro: '',
              cidade: '',
              estado: ''
          });

        }
        else{
          this.spinner.hide();
          console.log("Acerto");
          this.form.patchValue({
              cep: this.cepInfo.cep,
              logradouro: this.cepInfo.logradouro,
              bairro: this.cepInfo.bairro,
              cidade: this.cepInfo.localidade,
              estado: this.cepInfo.uf,
              nome: this.nomeCompleto.toUpperCase(),
              email: this.email
          });

          this.form.get('cep')?.disable();
          this.form.get('logradouro')?.disable();
          this.form.get('bairro')?.disable();
          this.form.get('cidade')?.disable();
          this.form.get('estado')?.disable();
          this.form.get('nome')?.disable();
          this.form.get('email')?.disable();

        }
      },
      error: (error: any) => {
        this.spinner.hide();
        this.mensagemErro = "Digite o cep novamente";

        this.form.reset({
          step1: {
            cep: '',
            logradouro: '',
            bairro: '',
            cidade: '',
            estado: ''
          }
        });

      }
    })
  }

  voltar() {

  }

  onSubmit() {
    console.log(this.form.value);
  }

  public selecionarOrgao(orgao: any) {
    let idxOrgao = this.comboUnidade?.indexOf(orgao);
    this.comboUnidade?.splice(idxOrgao, 1);
    this.orgaosSelecionados.push(orgao);
  }

  public removerTodosOrgaos() {
    this.comboUnidade = this.comboUnidade.concat(this.orgaosSelecionados);
    this.orgaosSelecionados = [];
  }

  public removerOrgao(orgao: any) {
    let idxOrgao = this.orgaosSelecionados.indexOf(orgao);
    this.orgaosSelecionados.splice(idxOrgao, 1);
    this.comboUnidade.push(orgao);
  }

}
