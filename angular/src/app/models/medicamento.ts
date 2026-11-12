export interface Medicamento {
  id: number;
  nome: string;
  fabricante: string;
  preco: number;
  quantidadeEstoque: number;
  controlado: boolean;
}

export type MedicamentoRequest = Omit<Medicamento, 'id'>;
