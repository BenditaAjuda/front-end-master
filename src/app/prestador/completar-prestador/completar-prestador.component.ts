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

  constructor(private cepService: CepService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
                this.form = this.fb.group({
                  email: ['', [Validators.required, Validators.email]],
                  name: ['', Validators.required],
                  address: ['', Validators.required]
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
    this.cepService.getCepInfo(this.cep).subscribe(
      data => this.cepInfo = data,
      error => console.error(error)
    );
  }

  nextStep() {
    const activeTab = document.querySelector('.nav-link.active') as HTMLElement;
    const nextTab = activeTab.nextElementSibling as HTMLElement;
    if (nextTab) {
      nextTab.click();
    }
  }

  prevStep() {
    const activeTab = document.querySelector('.nav-link.active') as HTMLElement;
    const prevTab = activeTab.previousElementSibling as HTMLElement;
    if (prevTab) {
      prevTab.click();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    }
  }

}
