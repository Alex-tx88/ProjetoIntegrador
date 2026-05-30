import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const USUARIOS: Usuario[] = [
  { id: 1, nome: 'João Paulo', email: 'porteiro@condominio.com', perfil: 'porteiro' },
  { id: 2, nome: 'Daniele',    email: 'morador101@condominio.com', perfil: 'morador', apto: '101' },
  { id: 3, nome: 'Enoque',     email: 'morador205@condominio.com', perfil: 'morador', apto: '205' },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _usuario = signal<Usuario | null>(this.carregarDoStorage());

  usuario    = this._usuario.asReadonly();
  isLogado   = computed(() => this._usuario() !== null);
  isPorteiro = computed(() => this._usuario()?.perfil === 'porteiro');
  isMorador  = computed(() => this._usuario()?.perfil === 'morador');

  constructor(private router: Router) {}

  login(email: string, senha: string): boolean {
    if (senha !== '123456') return false;
    const user = USUARIOS.find(u => u.email === email.trim().toLowerCase());
    if (!user) return false;
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this._usuario.set(user);
    return true;
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this._usuario.set(null);
    this.router.navigate(['/login']);
  }

  private carregarDoStorage(): Usuario | null {
    try {
      const raw = localStorage.getItem('loggedUser');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
}
