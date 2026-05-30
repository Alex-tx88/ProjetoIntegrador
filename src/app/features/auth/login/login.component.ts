import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  senha = '';
  erro  = signal('');

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.erro.set('');
    if (!this.email || !this.senha) {
      this.erro.set('Preencha e-mail e senha.');
      return;
    }
    const ok = this.auth.login(this.email, this.senha);
    if (!ok) {
      this.erro.set('E-mail ou senha incorretos.');
      return;
    }
    const perfil = this.auth.usuario()?.perfil;
    this.router.navigate([perfil === 'porteiro' ? '/porteiro/dashboard' : '/morador/dashboard']);
  }
}
