import { Component, signal } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  colapsado = signal(false);

  constructor(public auth: AuthService) {}

  toggle() { this.colapsado.update(v => !v); }

  menuPorteiro = [
    { label: 'Dashboard',          icon: '🏠', rota: '/porteiro/dashboard' },
    { label: 'Agendamentos',       icon: '📅', rota: '/porteiro/agendamentos' },
    { label: 'Controle de Chaves', icon: '🔑', rota: '/porteiro/controle-chaves' },
    { label: 'Relatórios',         icon: '📊', rota: '/porteiro/relatorios' },
    { label: 'Histórico',          icon: '🗂️', rota: '/porteiro/historico' },
  ];

  menuMorador = [
    { label: 'Meu Dashboard',     icon: '🏠', rota: '/morador/dashboard' },
    { label: 'Meus Agendamentos', icon: '📅', rota: '/morador/meus-agendamentos' },
    { label: 'Novo Agendamento',  icon: '➕', rota: '/morador/novo-agendamento' },
  ];

  get menu() {
    return this.auth.isPorteiro() ? this.menuPorteiro : this.menuMorador;
  }

  sair() { this.auth.logout(); }
}
