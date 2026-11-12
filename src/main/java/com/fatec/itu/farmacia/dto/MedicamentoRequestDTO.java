package com.fatec.itu.farmacia.dto;

public record MedicamentoRequestDTO(
    String nome,
    String fabricante,
    Double preco,
    Integer quantidadeEstoque,
    Boolean controlado
) {

}
