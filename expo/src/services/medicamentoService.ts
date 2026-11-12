import { Medicamento, MedicamentoRequest } from '../types/medicamento';

// No navegador (Expo web) o backend fica em localhost.
// No celular com Expo Go, crie o arquivo .env com o IP do computador:
// EXPO_PUBLIC_API_URL=http://192.168.0.10:8080
const API_URL = `${process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080'}/medicamentos`;

export class ApiError extends Error {
  constructor(public status: number, public mensagens: string[]) {
    super(mensagens.join('\n'));
  }
}

async function tratarErro(resposta: Response): Promise<never> {
  if (resposta.status === 400) {
    const corpo = await resposta.json();
    const mensagens = Array.isArray(corpo.errors)
      ? corpo.errors.map((erro: { defaultMessage: string }) => erro.defaultMessage)
      : ['Dados inválidos.'];
    throw new ApiError(400, mensagens);
  }
  throw new ApiError(resposta.status, [`Erro ${resposta.status} ao falar com o backend.`]);
}

export async function getAll(): Promise<Medicamento[]> {
  const resposta = await fetch(API_URL);
  if (!resposta.ok) return tratarErro(resposta);
  return resposta.json();
}

export async function create(medicamento: MedicamentoRequest): Promise<Medicamento> {
  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicamento),
  });
  if (!resposta.ok) return tratarErro(resposta);
  return resposta.json();
}

export async function update(id: number, medicamento: MedicamentoRequest): Promise<void> {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicamento),
  });
  if (!resposta.ok) return tratarErro(resposta);
}
