import { Injectable } from '@angular/core';

export interface MoradorCadastrado {
  nome: string;
  apto: string;
  email: string;
}

export const MORADORES_CADASTRADOS: MoradorCadastrado[] = [
  { nome: 'Daniele', apto: '101', email: 'morador101@condominio.com' },
  { nome: 'Enoque',  apto: '205', email: 'morador205@condominio.com' },
];

@Injectable({ providedIn: 'root' })
export class MoradorService {
  readonly todos = MORADORES_CADASTRADOS;

  buscar(termo: string): MoradorCadastrado[] {
    const t = termo.toLowerCase().trim();
    if (!t) return this.todos;
    return this.todos.filter(m =>
      m.nome.toLowerCase().includes(t) ||
      m.apto.includes(t)
    );
  }

  porApto(apto: string): MoradorCadastrado | undefined {
    return this.todos.find(m => m.apto === apto);
  }
}
