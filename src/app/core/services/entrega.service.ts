import { Injectable, signal, computed } from '@angular/core';
import { Entrega } from '../models/entrega.model';
import { AuthService } from './auth.service';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class EntregaService {
  private _entregas = signal<Entrega[]>(this.load('entregas'));
  private _historico = signal<Entrega[]>(this.load('historicoRetiradas'));

  entregasAtivas  = computed(() => this._entregas().filter((e: Entrega) => e.status !== 'retirado'));
  historico       = computed(() => this._historico());
  totalEntregas   = computed(() => this._entregas().length + this._historico().length);
  totalPendentes  = computed(() => this._entregas().filter((e: Entrega) => e.status === 'pendente').length);
  totalNotificados = computed(() => this._entregas().filter((e: Entrega) => e.status === 'notificado').length);
  totalRetirados  = computed(() => this._historico().length);

  constructor(private auth: AuthService) {}

  addEntrega(dados: Omit<Entrega, 'id' | 'data' | 'status' | 'registradoPor'>): void {
    const novaEntrega: Entrega = {
      ...dados,
      id: Date.now(),
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'pendente',
      registradoPor: (this.auth.usuario() as Usuario | null)?.nome ?? 'Porteiro',
    };
    const lista = [...this._entregas(), novaEntrega];
    this._entregas.set(lista);
    this.save('entregas', lista);
  }

  atualizarStatus(id: number, novoStatus: 'notificado' | 'retirado', retiradoPor?: string): void {
    const lista = this._entregas().map((e: Entrega) => {
      if (e.id !== id) return e;
      return {
        ...e,
        status: novoStatus,
        ...(novoStatus === 'retirado' ? {
          retiradoPor: retiradoPor ?? (this.auth.usuario() as Usuario | null)?.nome ?? 'Porteiro',
          dataRetirada: new Date().toLocaleString('pt-BR')
        } : {})
      } as Entrega;
    });

    if (novoStatus === 'retirado') {
      const retirada = lista.find((e: Entrega) => e.id === id)!;
      const hist  = [...this._historico(), retirada];
      const ativas = lista.filter((e: Entrega) => e.id !== id);
      this._entregas.set(ativas);
      this._historico.set(hist);
      this.save('entregas', ativas);
      this.save('historicoRetiradas', hist);
    } else {
      this._entregas.set(lista);
      this.save('entregas', lista);
    }
  }

  limparHistorico(): void {
    this._historico.set([]);
    this.save('historicoRetiradas', []);
  }

  entregasPorApto(apto: string): Entrega[] {
    return this._entregas().filter((e: Entrega) => e.apto === apto);
  }

  historicoPorApto(apto: string): Entrega[] {
    return this._historico().filter((e: Entrega) => e.apto === apto);
  }

  private load(chave: string): Entrega[] {
    try { return JSON.parse(localStorage.getItem(chave) ?? '[]'); }
    catch { return []; }
  }

  private save(chave: string, dados: Entrega[]): void {
    localStorage.setItem(chave, JSON.stringify(dados));
  }
}
