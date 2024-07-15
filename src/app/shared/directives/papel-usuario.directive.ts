import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs';
import { ContaService } from 'src/app/conta/conta.service';
import jwt_decode from 'jwt-decode';

@Directive({
  selector: '[appPapelUsuario]'
})
export class PapelUsuarioDirective implements OnInit{

  @Input() appPapelUsuario: string[] = [];

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private contaService: ContaService) { }

    ngOnInit(): void {

      this.contaService.user$.pipe((take(1))).subscribe({
        next: user => {
          if (user) {
            const decodedToken: any = jwt_decode(user.jwt);
            console.log("Papel usuario role: ",decodedToken.role);
              if (decodedToken.role) {
                this.appPapelUsuario = decodedToken.role
                console.log("Aqui: ", this.appPapelUsuario);
                this.viewContainerRef.createEmbeddedView(this.templateRef);
              } else {
                console.log("Papel usuario else: ", this.appPapelUsuario);
                this.viewContainerRef.clear();
              }
          }
           else {
            this.viewContainerRef.clear();
          }
        }
      })
    }

}


