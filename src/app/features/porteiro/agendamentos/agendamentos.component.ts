import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoService } from '../../../core/services/agendamento.service';
import { Agendamento } from '../../../core/models/agendamento.model';

@Component({
  selector: 'app-porteiro-agendamentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendamentos.component.html',
  styleUrl: './agendamentos.component.css',
})
export class PorteiroAgendamentosComponent {
  constructor(private svc: AgendamentoService) {}

  get agendamentos(): Agendamento[] {
    return this.svc.ativos();
  }
}
