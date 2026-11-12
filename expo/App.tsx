import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { ApiError, create, getAll, update } from './src/services/medicamentoService';
import { Medicamento, MedicamentoRequest } from './src/types/medicamento';

interface Formulario {
  nome: string;
  fabricante: string;
  preco: string;
  quantidadeEstoque: string;
  controlado: boolean;
}

const FORM_VAZIO: Formulario = { nome: '', fabricante: '', preco: '', quantidadeEstoque: '', controlado: false };

function paraNumero(texto: string): number | null {
  const numero = Number(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(numero) ? null : numero;
}

function formatarPreco(preco: number): string {
  return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

export default function App() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [form, setForm] = useState<Formulario>(FORM_VAZIO);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [erros, setErros] = useState<string[]>([]);
  const [mensagem, setMensagem] = useState('');

  async function carregar() {
    try {
      setMedicamentos(await getAll());
    } catch {
      setErros(['Não foi possível conectar ao backend.']);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar() {
    setErros([]);
    setMensagem('');

    const dados = {
      nome: form.nome,
      fabricante: form.fabricante,
      preco: paraNumero(form.preco),
      quantidadeEstoque: paraNumero(form.quantidadeEstoque),
      controlado: form.controlado,
    } as MedicamentoRequest;

    try {
      if (editandoId === null) {
        await create(dados);
        setMensagem('Medicamento cadastrado.');
      } else {
        await update(editandoId, dados);
        setMensagem('Medicamento atualizado.');
      }
      cancelar();
      carregar();
    } catch (e) {
      setErros(e instanceof ApiError ? e.mensagens : ['Não foi possível conectar ao backend.']);
    }
  }

  function editar(m: Medicamento) {
    setEditandoId(m.id);
    setForm({
      nome: m.nome,
      fabricante: m.fabricante,
      preco: String(m.preco),
      quantidadeEstoque: String(m.quantidadeEstoque),
      controlado: m.controlado,
    });
    setErros([]);
    setMensagem('');
  }

  function cancelar() {
    setEditandoId(null);
    setForm(FORM_VAZIO);
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Medicamentos</Text>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>
          {editandoId === null ? 'Cadastrar medicamento' : `Editar medicamento #${editandoId}`}
        </Text>

        <Text style={styles.rotulo}>Nome</Text>
        <TextInput style={styles.campo} value={form.nome} onChangeText={nome => setForm({ ...form, nome })} />

        <Text style={styles.rotulo}>Fabricante</Text>
        <TextInput
          style={styles.campo}
          value={form.fabricante}
          onChangeText={fabricante => setForm({ ...form, fabricante })}
        />

        <Text style={styles.rotulo}>Preço (R$)</Text>
        <TextInput
          style={styles.campo}
          value={form.preco}
          keyboardType="decimal-pad"
          onChangeText={preco => setForm({ ...form, preco })}
        />

        <Text style={styles.rotulo}>Quantidade em estoque</Text>
        <TextInput
          style={styles.campo}
          value={form.quantidadeEstoque}
          keyboardType="number-pad"
          onChangeText={quantidadeEstoque => setForm({ ...form, quantidadeEstoque })}
        />

        <View style={styles.linhaSwitch}>
          <Switch value={form.controlado} onValueChange={controlado => setForm({ ...form, controlado })} />
          <Text>Medicamento controlado</Text>
        </View>

        {erros.length > 0 && (
          <View style={styles.erros}>
            {erros.map(erro => (
              <Text key={erro} style={styles.textoErro}>• {erro}</Text>
            ))}
          </View>
        )}

        {mensagem !== '' && <Text style={styles.sucesso}>{mensagem}</Text>}

        <View style={styles.botoes}>
          <Pressable style={styles.botao} onPress={salvar}>
            <Text style={styles.textoBotao}>{editandoId === null ? 'Cadastrar' : 'Salvar alterações'}</Text>
          </Pressable>
          {editandoId !== null && (
            <Pressable style={[styles.botao, styles.botaoSecundario]} onPress={cancelar}>
              <Text style={styles.textoBotaoSecundario}>Cancelar</Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Catálogo</Text>
        {medicamentos.length === 0 && <Text>Nenhum medicamento cadastrado.</Text>}
        {medicamentos.map(m => (
          <View key={m.id} style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemNome}>
                {m.id}. {m.nome} {m.controlado ? '(controlado)' : ''}
              </Text>
              <Text style={styles.itemDetalhe}>
                {m.fabricante} · {formatarPreco(m.preco)} · {m.quantidadeEstoque} em estoque
              </Text>
            </View>
            <Pressable style={[styles.botao, styles.botaoSecundario]} onPress={() => editar(m)}>
              <Text style={styles.textoBotaoSecundario}>Editar</Text>
            </Pressable>
          </View>
        ))}
      </View>

      <StatusBar style="dark" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#f4f7f5' },
  conteudo: { padding: 16, paddingTop: 56, gap: 16 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#0b6e4f' },
  subtitulo: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  card: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#dde3e0', padding: 16, gap: 6 },
  rotulo: { fontWeight: '600', marginTop: 4 },
  campo: { borderWidth: 1, borderColor: '#b8c2bd', borderRadius: 6, padding: 8, fontSize: 16 },
  linhaSwitch: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 8 },
  erros: { backgroundColor: '#fdecec', borderRadius: 6, padding: 8 },
  textoErro: { color: '#a12626' },
  sucesso: { backgroundColor: '#e6f4ea', color: '#1e6b34', borderRadius: 6, padding: 8 },
  botoes: { flexDirection: 'row', gap: 8, marginTop: 8 },
  botao: { backgroundColor: '#0b6e4f', borderRadius: 6, paddingVertical: 10, paddingHorizontal: 16 },
  botaoSecundario: { backgroundColor: '#e6efeb' },
  textoBotao: { color: '#fff', fontWeight: '600' },
  textoBotaoSecundario: { color: '#0b6e4f', fontWeight: '600' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eef1ef',
  },
  itemInfo: { flex: 1 },
  itemNome: { fontWeight: '600', fontSize: 16 },
  itemDetalhe: { color: '#55635c' },
});
