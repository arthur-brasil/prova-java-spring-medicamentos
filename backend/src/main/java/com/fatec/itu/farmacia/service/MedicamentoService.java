package com.fatec.itu.farmacia.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fatec.itu.farmacia.entity.Medicamento;
import com.fatec.itu.farmacia.repository.MedicamentoRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class MedicamentoService {

    private final MedicamentoRepository repository;

    MedicamentoService(MedicamentoRepository repository) {
        this.repository = repository;
    }

    public List<Medicamento> getAll() {
        return repository.findAll();
    }

    public Medicamento create(Medicamento medicamento) {
        return repository.save(medicamento);
    }

    public void update(Long id, Medicamento medicamento) {
        Medicamento m = repository.findById(id)
                                  .orElseThrow(() -> new EntityNotFoundException("Medicamento não cadastrado"));

        m.setNome(medicamento.getNome());
        m.setFabricante(medicamento.getFabricante());
        m.setPreco(medicamento.getPreco());
        m.setQuantidadeEstoque(medicamento.getQuantidadeEstoque());
        m.setControlado(medicamento.getControlado());

        repository.save(m);
    }
}
