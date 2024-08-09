import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  controle: boolean = false;
  isCepValid: boolean = false;
  submitted = false;
  servicoPesquisa: string = "";
  comboUnidade: any[] = [];
  servicosSelecionados: any[] = [];
  prestador?: Prestador;

  constructor(private cepService: CepService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private prestadorService: PrestadorService) {

                this.form = this.fb.group({
                  cep: [{ value: '', disabled: true }, Validators.required],
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
          this.form.patchValue({
              cep: this.cepInfo.cep,
              logradouro: this.cepInfo.logradouro,
              bairro: this.cepInfo.bairro,
              cidade: this.cepInfo.localidade,
              estado: this.cepInfo.uf,
              nome: this.nomeCompleto.toUpperCase(),
              email: this.email
          });

          console.log("Aqui teste1: ", this.form.value);

          // this.form.get('cep')?.disable();
          // this.form.get('logradouro')?.disable();
          // this.form.get('bairro')?.disable();
          // this.form.get('cidade')?.disable();
          // this.form.get('estado')?.disable();
          // this.form.get('nome')?.disable();
          // this.form.get('email')?.disable();
        }
        console.log("Aqui teste2: ", this.form.value);
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
    this.submitted = true;
    //this.controle = true;
    console.log("Aqui: ", this.form.value);
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
    console.log("Aqui2: ", uniqueData);
    console.log("Aqui3: ", this.form.value);

  };

}
