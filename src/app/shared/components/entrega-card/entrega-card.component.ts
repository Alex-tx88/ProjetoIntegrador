import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Entrega } from '../../../core/models/entrega.model';

@Component({
  selector: 'app-entrega-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entrega-card.component.html',
  styleUrl: './entrega-card.component.css',
})
export class EntregaCardComponent {
  @Input({ required: true }) entrega!: Entrega;
  @Input() modoMorador = false;
  @Output() statusChange = new EventEmitter<{ id: number; novoStatus: 'notificado' | 'retirado' }>();

  notificar()  { this.statusChange.emit({ id: this.entrega.id, novoStatus: 'notificado' }); }
  retirar()    { this.statusChange.emit({ id: this.entrega.id, novoStatus: 'retirado' }); }
}
