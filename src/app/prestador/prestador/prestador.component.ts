import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestadorService } from '../prestador-service';

@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.component.html',
  styleUrls: ['./prestador.component.css']
})
export class PrestadorComponent implements OnInit{

  data: string | null = null;
  email!: string;

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
        this.consultarDadosPrestador();
      }
    })
  }

  consultarDadosPrestador() {
    console.log("Vou consultar agora");
  }

  treeData = [
    {
      name: 'Parent 1',
      expanded: false,
      children: [
        { name: 'Child 1.1' },
        { name: 'Child 1.2' }
      ]
    },
    {
      name: 'Parent 2',
      expanded: false,
      children: [
        { name: 'Child 2.1' },
        { name: 'Child 2.2' }
      ]
    }
  ];

  toggle(node: any) {
    node.expanded = !node.expanded;
  }

}
