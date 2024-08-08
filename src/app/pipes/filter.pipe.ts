import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
        return items;
    }

    let filterMinusculo = filter.toLowerCase()
    let filterMinusculaSemAcento = filterMinusculo.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    let itemsFiltrado = items.filter(item => {

      let itemMinusculo = item.nome.toLowerCase();
      let itemMinusculoSemAcento = itemMinusculo.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

      return itemMinusculoSemAcento.includes(filterMinusculaSemAcento);
    })

    return itemsFiltrado;
}

}
