import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntregaService } from '../../../core/services/entrega.service';
import { AuthService } from '../../../core/services/auth.service';
import { EntregaCardComponent } from '../../../shared/components/entrega-card/entrega-card.component';
import { Entrega } from '../../../core/models/entrega.model';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-morador-dashboard',
  standalone: true,
  imports: [CommonModule, EntregaCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class MoradorDashboardComponent {
  private apto = computed(() => (this.auth.usuario() as Usuario | null)?.apto ?? '');

  minhasEntregas  = computed(() => this.svc.entregasPorApto(this.apto()));
  meuHistorico    = computed(() => this.svc.historicoPorApto(this.apto()));

  totalMinhas    = computed(() => this.minhasEntregas().length);
  totalPendentes = computed(() => this.minhasEntregas().filter((e: Entrega) => e.status === 'pendente').length);
  totalNotif     = computed(() => this.minhasEntregas().filter((e: Entrega) => e.status === 'notificado').length);
  totalRetiradas = computed(() => this.meuHistorico().length);

  constructor(private svc: EntregaService, private auth: AuthService) {}

  handleStatusChange(ev: { id: number; novoStatus: 'notificado' | 'retirado' }) {
    this.svc.atualizarStatus(ev.id, ev.novoStatus, 'Morador');
  }
}
