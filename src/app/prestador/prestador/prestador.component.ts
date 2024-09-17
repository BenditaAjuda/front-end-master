import { Component } from '@angular/core';

@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.component.html',
  styleUrls: ['./prestador.component.css']
})
export class PrestadorComponent {

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
