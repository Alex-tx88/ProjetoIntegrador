import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoService } from '../../../core/services/agendamento.service';
import { Agendamento } from '../../../core/models/agendamento.model';

interface DiaCalendario {
  data: Date;
  dataStr: string;  // YYYY-MM-DD
  label: string;
  diaSemana: string;
  temAgendamento: boolean;
}

@Component({
  selector: 'app-calendario-mini',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario-mini.component.html',
  styleUrl: './calendario-mini.component.css',
})
export class CalendarioMiniComponent implements OnInit {
  dias: DiaCalendario[] = [];
  diaSelecionado = signal<string | null>(null);
  agendamentosDoDia = signal<Agendamento[]>([]);

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit() {
    const hoje = new Date();
    const nomeDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    this.dias = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(hoje);
      d.setDate(hoje.getDate() + i);
      const dataStr = d.toISOString().split('T')[0];
      return {
        data: d,
        dataStr,
        label: d.getDate().toString(),
        diaSemana: nomeDias[d.getDay()],
        temAgendamento: this.agendamentoService.agendamentosPorData(dataStr).length > 0,
      };
    });
  }

  selecionarDia(dia: DiaCalendario) {
    this.diaSelecionado.set(dia.dataStr);
    this.agendamentosDoDia.set(this.agendamentoService.agendamentosPorData(dia.dataStr));
  }

  fechar() { this.diaSelecionado.set(null); }
}
