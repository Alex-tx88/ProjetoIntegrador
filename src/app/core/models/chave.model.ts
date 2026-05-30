export interface ControleChave {
  id: number;
  chave: string;
  moradorApto: string;
  moradorNome: string;
  dataRetirada: string;
  porteiroEntregou: string;
  dataDevolucao?: string;
  porteiroRecebeu?: string;
  status: 'emprestada' | 'devolvida' | 'atrasada';
}

export const CHAVES_DISPONIVEIS = [
  'Academia',
  'Salão de Jogos',
  'Salão de Festas',
  'Churrasqueira'
] as const;
