import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChaveService } from '../../../core/services/chave.service';
import { MoradorService, MoradorCadastrado } from '../../../core/services/morador.service';
import { ControleChave, CHAVES_DISPONIVEIS } from '../../../core/models/chave.model';

@Component({
  selector: 'app-controle-chaves',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './controle-chaves.component.html',
  styleUrl: './controle-chaves.component.css',
})
export class ControleChavesComponent {
  chavesOpts  = CHAVES_DISPONIVEIS;
  moradores: MoradorCadastrado[];

  empMorador = signal('');
  empChave   = signal(CHAVES_DISPONIVEIS[0]);
  empErro    = signal('');

  constructor(private svc: ChaveService, private morSvc: MoradorService) {
    this.moradores = this.morSvc.todos;
  }

  get chaves(): ControleChave[]    { return this.svc.todos(); }
  get emprestadas(): ControleChave[] { return this.svc.emprestadas(); }

  registrarEmprestimo() {
    this.empErro.set('');
    const val = this.empMorador();
    if (!val) { this.empErro.set('Selecione um morador.'); return; }
    const [nome, apto] = val.split('|');
    const res = this.svc.registrarEmprestimo(apto, nome, this.empChave());
    if (!res.ok) { this.empErro.set(res.erro ?? 'Erro'); return; }
    this.empMorador.set('');
  }

  registrarDevolucao(id: number) {
    if (confirm('Confirmar devolução desta chave?')) {
      this.svc.registrarDevolucao(id);
    }
  }

  formatarData(iso: string) {
    return new Date(iso).toLocaleString('pt-BR');
  }
}
