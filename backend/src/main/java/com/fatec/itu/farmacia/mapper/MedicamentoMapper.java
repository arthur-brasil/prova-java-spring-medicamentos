package com.fatec.itu.farmacia.mapper;

import com.fatec.itu.farmacia.dto.MedicamentoRequestDTO;
import com.fatec.itu.farmacia.dto.MedicamentoResponseDTO;
import com.fatec.itu.farmacia.entity.Medicamento;

public class MedicamentoMapper {

    public static Medicamento toEntity(MedicamentoRequestDTO request) {
        Medicamento m = new Medicamento();
        m.setNome(request.nome());
        m.setFabricante(request.fabricante());
        m.setPreco(request.preco());
        m.setQuantidadeEstoque(request.quantidadeEstoque());
        m.setControlado(request.controlado());

        return m;
    }

    public static MedicamentoResponseDTO toDTO(Medicamento medicamento) {
        return new MedicamentoResponseDTO(
            medicamento.getId(),
            medicamento.getNome(),
            medicamento.getFabricante(),
            medicamento.getPreco(),
            medicamento.getQuantidadeEstoque(),
            medicamento.getControlado()
        );
    }
}
