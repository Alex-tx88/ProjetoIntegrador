export interface Entrega {
  id: number;
  tipo: string;
  desc: string;
  apto: string;
  morador: string;
  remetente: string;
  data: string;
  status: 'pendente' | 'notificado' | 'retirado';
  registradoPor: string;
  retiradoPor?: string;
  dataRetirada?: string;
}
