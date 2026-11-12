import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { Medicamento, MedicamentoRequest } from './models/medicamento';
import { MedicamentoService } from './services/medicamento.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly service = inject(MedicamentoService);

  protected readonly medicamentos = signal<Medicamento[]>([]);
  protected readonly editandoId = signal<number | null>(null);
  protected readonly erros = signal<string[]>([]);
  protected readonly mensagem = signal('');

  protected form: MedicamentoRequest = this.formVazio();

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.service.getAll().subscribe({
      next: lista => this.medicamentos.set(lista),
      error: () => this.erros.set(['Não foi possível conectar ao backend em http://localhost:8080.'])
    });
  }

  salvar(): void {
    this.erros.set([]);
    this.mensagem.set('');
    const id = this.editandoId();

    const requisicao: Observable<unknown> = id === null
      ? this.service.create(this.form)
      : this.service.update(id, this.form);

    requisicao.subscribe({
      next: () => {
        this.mensagem.set(id === null ? 'Medicamento cadastrado.' : 'Medicamento atualizado.');
        this.cancelar();
        this.carregar();
      },
      error: (e: HttpErrorResponse) => this.erros.set(this.lerErros(e))
    });
  }

  editar(m: Medicamento): void {
    this.editandoId.set(m.id);
    this.form = {
      nome: m.nome,
      fabricante: m.fabricante,
      preco: m.preco,
      quantidadeEstoque: m.quantidadeEstoque,
      controlado: m.controlado
    };
    this.erros.set([]);
    this.mensagem.set('');
  }

  cancelar(): void {
    this.editandoId.set(null);
    this.form = this.formVazio();
  }

  private formVazio(): MedicamentoRequest {
    return { nome: '', fabricante: '', preco: 0, quantidadeEstoque: 0, controlado: false };
  }

  private lerErros(e: HttpErrorResponse): string[] {
    if (e.status === 400 && Array.isArray(e.error?.errors)) {
      return e.error.errors.map((erro: { defaultMessage: string }) => erro.defaultMessage);
    }
    if (e.status === 0) {
      return ['Não foi possível conectar ao backend em http://localhost:8080.'];
    }
    return [`Erro ${e.status} ao salvar o medicamento.`];
  }
}
