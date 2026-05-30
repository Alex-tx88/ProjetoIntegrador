import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css',
})
export class RelatoriosComponent implements AfterViewInit {
  @ViewChildren('chartCanvas') canvases!: QueryList<ElementRef<HTMLCanvasElement>>;

  ultimaAtualizacao = new Date().toLocaleString('pt-BR');
  private charts: Chart<any, any, any>[] = [];

  private loadLS<T>(key: string): T[] {
    try { return JSON.parse(localStorage.getItem(key) ?? '[]'); } catch { return []; }
  }

  ngAfterViewInit() { this.renderAll(); }

  private canvas(i: number): HTMLCanvasElement | null {
    return this.canvases.toArray()[i]?.nativeElement ?? null;
  }

  private destroyAll() { this.charts.forEach(c => c.destroy()); this.charts = []; }

  renderAll() {
    this.destroyAll();
    this.g1(); this.g2(); this.g3(); this.g4(); this.g5(); this.g6();
  }

  private bar(cvs: HTMLCanvasElement | null, labels: string[], data: number[], label: string, color: string) {
    if (!cvs) return;
    this.charts.push(new Chart(cvs, {
      type: 'bar',
      data: { labels, datasets: [{ label, data, backgroundColor: color } as any] },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } },
    }));
  }

  private pie(cvs: HTMLCanvasElement | null, labels: string[], data: number[], colors: string[]) {
    if (!cvs) return;
    this.charts.push(new Chart(cvs, {
      type: 'pie',
      data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 2 }] },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } } },
    }));
  }

  private g1() {
    const todas = [...this.loadLS<any>('entregas'), ...this.loadLS<any>('historicoRetiradas')];
    const labels: string[] = [], counts: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const s = d.toLocaleDateString('pt-BR');
      labels.push(s); counts.push(todas.filter((e: any) => e.data === s).length);
    }
    this.bar(this.canvas(0), labels, counts, 'Entregas', 'rgba(13,46,130,0.75)');
  }

  private g2() {
    const a = this.loadLS<any>('entregas'), h = this.loadLS<any>('historicoRetiradas');
    this.pie(this.canvas(1),
      ['Pendente', 'Notificado', 'Retirado'],
      [a.filter((e: any) => e.status === 'pendente').length, a.filter((e: any) => e.status === 'notificado').length, h.length],
      ['#fbbf24', '#60a5fa', '#34d399']);
  }

  private g3() {
    const mapa: Record<string, number> = {};
    [...this.loadLS<any>('entregas'), ...this.loadLS<any>('historicoRetiradas')]
      .forEach((e: any) => { const k = `Apto ${e.apto}`; mapa[k] = (mapa[k] ?? 0) + 1; });
    const sorted = Object.entries(mapa).sort((a, b) => b[1] - a[1]).slice(0, 5);
    if (!sorted.length) return;
    const cvs = this.canvas(2); if (!cvs) return;
    this.charts.push(new Chart(cvs, {
      type: 'bar',
      data: { labels: sorted.map(x => x[0]), datasets: [{ label: 'Entregas', data: sorted.map(x => x[1]), backgroundColor: 'rgba(99,102,241,0.75)' } as any] },
      options: { indexAxis: 'y', responsive: true, plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true } } },
    }));
  }

  private g4() {
    const mapa: Record<string, number> = {};
    this.loadLS<any>('agendamentos').filter((a: any) => a.status === 'ativo')
      .forEach((a: any) => { mapa[a.servico] = (mapa[a.servico] ?? 0) + 1; });
    this.bar(this.canvas(3), Object.keys(mapa), Object.values(mapa), 'Agendamentos', 'rgba(20,184,166,0.75)');
  }

  private g5() {
    const mapa: Record<string, number> = {};
    this.loadLS<any>('controleChaves').forEach((c: any) => { mapa[c.chave] = (mapa[c.chave] ?? 0) + 1; });
    this.pie(this.canvas(4), Object.keys(mapa), Object.values(mapa), ['#f97316', '#a78bfa', '#34d399', '#60a5fa']);
  }

  private g6() {
    const mapa: Record<string, number> = {};
    [...this.loadLS<any>('entregas'), ...this.loadLS<any>('historicoRetiradas')]
      .forEach((e: any) => { const k = e.registradoPor ?? 'Desconhecido'; mapa[k] = (mapa[k] ?? 0) + 1; });
    this.bar(this.canvas(5), Object.keys(mapa), Object.values(mapa), 'Registros', 'rgba(239,68,68,0.7)');
  }
}
