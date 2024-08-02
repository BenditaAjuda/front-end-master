import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CepService } from 'src/app/shared/services/cep-service';

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
  controle: boolean = false;

  constructor(private cepService: CepService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {

                this.form = this.fb.group({
                  step1: this.fb.group({
                    cep: ["", Validators.required],
                    logradouro: ["", [Validators.required, Validators.email]],
                    bairro: ["", [Validators.required, Validators.email]],
                    cidade: ["", [Validators.required, Validators.email]],
                    estado: ["", [Validators.required, Validators.email]],
                  }),
                  step2: this.fb.group({
                    address: ['', Validators.required],
                    city: ['', Validators.required],
                  }),
                  step3: this.fb.group({
                    cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
                    cardExpiry: ['', Validators.required],
                  }),
                });

              }

  ngOnInit(): void {
      this.data = this.route.snapshot.paramMap.get('email');
      if (this.data) {
        let parts = this.data.split('|');
        this.email = parts[0];
        this.nome = parts[1];
        this.sobrenome = parts[2];
      }
  }

  buscarCep() {
    this.cepService.getCepInfo(this.cep).subscribe( {
      next: (response: any) => {
        this.cepInfo = response
        if(response.erro){
          this.mensagemErro = "Endereço não encontrado";

        }
        else{
          console.log("Acerto");
          this.form.patchValue({
            step1: {
              cep: this.cepInfo.cep,
              logradouro: this.cepInfo.logradouro,
              bairro: this.cepInfo.bairro,
              cidade: this.cepInfo.localidade,
              estado: this.cepInfo.uf
            }
          });
          this.controle = true;
        }
      }
    })
  }

  goToNextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  goToPrevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      alert('Form Submitted Successfully!');
    }
  }

}
