export interface Agendamento {
  id: number;
  servico: string;
  moradorApto: string;
  moradorNome: string;
  data: string;           // YYYY-MM-DD
  horarioInicio: string;  // "19:00"
  horarioFim: string;     // "22:00"
  status: 'ativo' | 'cancelado';
  criadoEm: string;
}

export const SERVICOS_DISPONIVEIS = [
  'Churrasqueira',
  'Salão de Festas',
  'Salão de Jogos',
  'Academia'
] as const;
