import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendamentoService } from '../../../core/services/agendamento.service';
import { SERVICOS_DISPONIVEIS } from '../../../core/models/agendamento.model';

@Component({
  selector: 'app-novo-agendamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './novo-agendamento.component.html',
  styleUrl: './novo-agendamento.component.css',
})
export class NovoAgendamentoComponent {
  servicos   = SERVICOS_DISPONIVEIS;
  horarios   = ['18:00', '19:00', '20:00', '21:00'];

  servico       = signal(SERVICOS_DISPONIVEIS[0]);
  data          = signal('');
  horarioInicio = signal('18:00');
  erro          = signal('');
  sucesso       = signal('');

  constructor(private svc: AgendamentoService, private router: Router) {}

  get minData(): string {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }

  horarioFim(inicio: string): string {
    const h = parseInt(inicio.split(':')[0], 10);
    return `${String(h + 1).padStart(2, '0')}:00`;
  }

  submit() {
    this.erro.set(''); this.sucesso.set('');
    if (!this.data()) { this.erro.set('Selecione uma data.'); return; }

    const res = this.svc.criar({
      servico: this.servico(),
      data: this.data(),
      horarioInicio: this.horarioInicio(),
      horarioFim: this.horarioFim(this.horarioInicio()),
    });

    if (!res.ok) { this.erro.set(res.erro ?? 'Erro ao agendar.'); return; }
    this.sucesso.set('Agendamento realizado com sucesso!');
    setTimeout(() => this.router.navigate(['/morador/meus-agendamentos']), 1500);
  }
}
