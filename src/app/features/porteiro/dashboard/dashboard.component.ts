import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EntregaService } from '../../../core/services/entrega.service';
import { Entrega } from '../../../core/models/entrega.model';
import { EntregaCardComponent } from '../../../shared/components/entrega-card/entrega-card.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { CalendarioMiniComponent } from '../../../shared/components/calendario-mini/calendario-mini.component';

@Component({
  selector: 'app-porteiro-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, EntregaCardComponent, ModalComponent, CalendarioMiniComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class PorteiroDashboardComponent {
  filtroNome   = '';
  filtroStatus = '';
  filtroApto   = '';
  isModalOpen  = signal(false);

  constructor(private svc: EntregaService) {}

  get entregasFiltradas(): Entrega[] {
    const nome   = this.filtroNome.toLowerCase().trim();
    const status = this.filtroStatus;
    const apto   = this.filtroApto.trim();
    return this.svc.entregasAtivas().filter((e: Entrega) =>
      (!nome   || e.morador.toLowerCase().includes(nome) || e.desc.toLowerCase().includes(nome)) &&
      (!status || e.status === status) &&
      (!apto   || e.apto === apto)
    );
  }

  get totalEntregas()    { return this.svc.totalEntregas(); }
  get totalPendentes()   { return this.svc.totalPendentes(); }
  get totalNotificados() { return this.svc.totalNotificados(); }
  get totalRetirados()   { return this.svc.totalRetirados(); }

  handleStatusChange(ev: { id: number; novoStatus: 'notificado' | 'retirado' }) {
    this.svc.atualizarStatus(ev.id, ev.novoStatus);
  }

  handleNovaEntrega(dados: Omit<Entrega, 'id' | 'data' | 'status' | 'registradoPor'>) {
    this.svc.addEntrega(dados);
    this.isModalOpen.set(false);
  }
}
