import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Rotas do Porteiro
  {
    path: 'porteiro',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { perfil: 'porteiro' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/porteiro/dashboard/dashboard.component').then(m => m.PorteiroDashboardComponent),
      },
      {
        path: 'agendamentos',
        loadComponent: () => import('./features/porteiro/agendamentos/agendamentos.component').then(m => m.PorteiroAgendamentosComponent),
      },
      {
        path: 'controle-chaves',
        loadComponent: () => import('./features/porteiro/controle-chaves/controle-chaves.component').then(m => m.ControleChavesComponent),
      },
      {
        path: 'relatorios',
        loadComponent: () => import('./features/porteiro/relatorios/relatorios.component').then(m => m.RelatoriosComponent),
      },
      {
        path: 'historico',
        loadComponent: () => import('./features/porteiro/historico/historico.component').then(m => m.PorteiroHistoricoComponent),
      },
    ],
  },

  // Rotas do Morador
  {
    path: 'morador',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { perfil: 'morador' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/morador/dashboard/dashboard.component').then(m => m.MoradorDashboardComponent),
      },
      {
        path: 'meus-agendamentos',
        loadComponent: () => import('./features/morador/meus-agendamentos/meus-agendamentos.component').then(m => m.MeusAgendamentosComponent),
      },
      {
        path: 'novo-agendamento',
        loadComponent: () => import('./features/morador/novo-agendamento/novo-agendamento.component').then(m => m.NovoAgendamentoComponent),
      },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
