import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Medicamento, MedicamentoRequest } from '../models/medicamento';

@Injectable({ providedIn: 'root' })
export class MedicamentoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/medicamentos';

  getAll(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.apiUrl);
  }

  create(medicamento: MedicamentoRequest): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.apiUrl, medicamento);
  }

  update(id: number, medicamento: MedicamentoRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, medicamento);
  }
}
