import { Component, EventEmitter, inject, Input, OnInit, Output, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Entrega } from '../../../core/models/entrega.model';
import { MoradorService, MoradorCadastrado } from '../../../core/services/morador.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  private fb  = inject(FormBuilder);
  private ms  = inject(MoradorService);

  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() addEntrega = new EventEmitter<Omit<Entrega, 'id' | 'data' | 'status' | 'registradoPor'>>();

  form!: FormGroup;

  // Busca de morador
  termoBusca  = signal('');
  dropdownAberto = signal(false);
  moradorSelecionado = signal<MoradorCadastrado | null>(null);

  sugestoes = computed(() => this.ms.buscar(this.termoBusca()));

  ngOnInit() {
    this.form = this.fb.group({
      tipo:      ['Encomenda', Validators.required],
      remetente: ['', Validators.required],
      desc:      ['', Validators.required],
      obs:       [''],
    });
  }

  onBuscaInput(valor: string) {
    this.termoBusca.set(valor);
    this.moradorSelecionado.set(null);
    this.dropdownAberto.set(true);
  }

  selecionarMorador(m: MoradorCadastrado) {
    this.moradorSelecionado.set(m);
    this.termoBusca.set(`${m.nome} — Apto ${m.apto}`);
    this.dropdownAberto.set(false);
  }

  fecharDropdown() {
    // pequeno delay para permitir o clique na sugestão
    setTimeout(() => this.dropdownAberto.set(false), 150);
  }

  selecionarTipo(tipo: string) { this.form.get('tipo')?.setValue(tipo); }

  onClose() {
    this.closeModal.emit();
    this.form.reset({ tipo: 'Encomenda' });
    this.termoBusca.set('');
    this.moradorSelecionado.set(null);
    this.dropdownAberto.set(false);
  }

  onSubmit() {
    if (!this.moradorSelecionado()) {
      alert('Selecione um morador da lista.');
      return;
    }
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const v = this.form.value;
    const m = this.moradorSelecionado()!;

    this.addEntrega.emit({
      apto:      m.apto,
      morador:   m.nome,
      remetente: v.remetente,
      tipo:      v.tipo,
      desc:      v.obs ? `${v.desc} — ${v.obs}` : v.desc,
    });
    this.onClose();
  }
}
