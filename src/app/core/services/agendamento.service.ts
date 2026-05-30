import { Injectable, signal, computed } from '@angular/core';
import { Agendamento } from '../models/agendamento.model';
import { AuthService } from './auth.service';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private _agendamentos = signal<Agendamento[]>(this.load());

  todos  = computed(() => this._agendamentos());
  ativos = computed(() => this._agendamentos().filter((a: Agendamento) => a.status === 'ativo'));

  constructor(private auth: AuthService) {}

  criar(dados: Pick<Agendamento, 'servico' | 'data' | 'horarioInicio' | 'horarioFim'>): { ok: boolean; erro?: string } {
    const user = this.auth.usuario() as Usuario | null;
    if (!user) return { ok: false, erro: 'Usuário não logado' };

    const conflito = this._agendamentos().some((a: Agendamento) =>
      a.status === 'ativo' &&
      a.servico === dados.servico &&
      a.data === dados.data &&
      a.horarioInicio === dados.horarioInicio
    );
    if (conflito) return { ok: false, erro: 'Já existe um agendamento para este serviço neste horário.' };

    const novo: Agendamento = {
      id: Date.now(),
      ...dados,
      moradorApto: user.apto ?? '',
      moradorNome: user.nome,
      status: 'ativo',
      criadoEm: new Date().toISOString(),
    };
    const lista = [...this._agendamentos(), novo];
    this._agendamentos.set(lista);
    this.save(lista);
    return { ok: true };
  }

  cancelar(id: number): void {
    const lista = this._agendamentos().map((a: Agendamento) =>
      a.id === id ? { ...a, status: 'cancelado' as const } : a
    );
    this._agendamentos.set(lista);
    this.save(lista);
  }

  agendamentosPorData(data: string): Agendamento[] {
    return this._agendamentos().filter((a: Agendamento) => a.data === data && a.status === 'ativo');
  }

  private load(): Agendamento[] {
    try { return JSON.parse(localStorage.getItem('agendamentos') ?? '[]'); }
    catch { return []; }
  }

  private save(dados: Agendamento[]): void {
    localStorage.setItem('agendamentos', JSON.stringify(dados));
  }
}
