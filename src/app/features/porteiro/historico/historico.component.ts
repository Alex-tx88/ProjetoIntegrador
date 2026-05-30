import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntregaService } from '../../../core/services/entrega.service';
import { Entrega } from '../../../core/models/entrega.model';

@Component({
  selector: 'app-porteiro-historico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css',
})
export class PorteiroHistoricoComponent {
  filtroTermo = '';

  constructor(private svc: EntregaService) {}

  get historicoFiltrado(): Entrega[] {
    const t = this.filtroTermo.toLowerCase().trim();
    return this.svc.historico().filter((e: Entrega) =>
      !t ||
      e.morador.toLowerCase().includes(t) ||
      e.apto.toLowerCase().includes(t) ||
      e.desc.toLowerCase().includes(t) ||
      e.remetente.toLowerCase().includes(t)
    );
  }

  limpar() {
    if (confirm('Apagar TODO o histórico? Esta ação não pode ser desfeita.')) {
      this.svc.limparHistorico();
    }
  }
}
