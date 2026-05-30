export type PerfilUsuario = 'porteiro' | 'morador';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  apto?: string;
}
