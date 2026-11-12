package com.fatec.itu.farmacia.dto;

public record MedicamentoResponseDTO(
    Long id,
    String nome,
    String fabricante,
    Double preco,
    Integer quantidadeEstoque,
    Boolean controlado
) {

}
