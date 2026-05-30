import { Injectable, signal, computed } from '@angular/core';
import { ControleChave } from '../models/chave.model';
import { AuthService } from './auth.service';
import { Usuario } from '../models/usuario.model';

const LIMITE_HORAS = 4;

@Injectable({ providedIn: 'root' })
export class ChaveService {
  private _chaves = signal<ControleChave[]>(this.load());

  todos       = computed(() => this._chaves());
  emprestadas = computed(() => this._chaves().filter((c: ControleChave) =>
    c.status === 'emprestada' || c.status === 'atrasada'
  ));

  constructor(private auth: AuthService) {}

  registrarEmprestimo(moradorApto: string, moradorNome: string, chave: string): { ok: boolean; erro?: string } {
    const jaTemChave = this._chaves().some((c: ControleChave) =>
      c.moradorApto === moradorApto && c.status === 'emprestada'
    );
    if (jaTemChave) return { ok: false, erro: `O morador do Apto ${moradorApto} já possui uma chave emprestada.` };

    const novo: ControleChave = {
      id: Date.now(),
      chave,
      moradorApto,
      moradorNome,
      dataRetirada: new Date().toISOString(),
      porteiroEntregou: (this.auth.usuario() as Usuario | null)?.nome ?? 'Porteiro',
      status: 'emprestada',
    };
    const lista = [...this._chaves(), novo];
    this._chaves.set(lista);
    this.save(lista);
    return { ok: true };
  }

  registrarDevolucao(id: number): void {
    const agora = new Date();
    const lista = this._chaves().map((c: ControleChave) => {
      if (c.id !== id) return c;
      const retirada = new Date(c.dataRetirada);
      const diffHoras = (agora.getTime() - retirada.getTime()) / (1000 * 60 * 60);
      return {
        ...c,
        dataDevolucao: agora.toISOString(),
        porteiroRecebeu: (this.auth.usuario() as Usuario | null)?.nome ?? 'Porteiro',
        status: diffHoras > LIMITE_HORAS ? 'atrasada' as const : 'devolvida' as const,
      };
    });
    this._chaves.set(lista);
    this.save(lista);
  }

  private load(): ControleChave[] {
    try { return JSON.parse(localStorage.getItem('controleChaves') ?? '[]'); }
    catch { return []; }
  }

  private save(dados: ControleChave[]): void {
    localStorage.setItem('controleChaves', JSON.stringify(dados));
  }
}
