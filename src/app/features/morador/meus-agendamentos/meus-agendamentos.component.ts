import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoService } from '../../../core/services/agendamento.service';
import { AuthService } from '../../../core/services/auth.service';
import { Agendamento } from '../../../core/models/agendamento.model';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-meus-agendamentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meus-agendamentos.component.html',
  styleUrl: './meus-agendamentos.component.css',
})
export class MeusAgendamentosComponent {
  agendamentos = computed(() => {
    const apto = (this.auth.usuario() as Usuario | null)?.apto ?? '';
    return this.svc.todos().filter((a: Agendamento) => a.moradorApto === apto);
  });

  constructor(private svc: AgendamentoService, private auth: AuthService) {}

  cancelar(id: number) {
    if (confirm('Cancelar este agendamento?')) this.svc.cancelar(id);
  }
}
