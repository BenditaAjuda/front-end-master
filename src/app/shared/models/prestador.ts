import { ServicosMei } from './servicos-mei';

export interface Prestador {
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  nome: string;
  email: string;
  telefone: string;
  servicos: ServicosMei[];
}
