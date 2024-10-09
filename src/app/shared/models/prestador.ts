import { ServicosMei } from './servicos-mei';

export interface Prestador {
  cep?: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  nome: string;
  email: string;
  telefoneCelular: string;
  telefoneFixo: string;
  complemento: string;
  servicosDto?: ServicosMei[];
}

