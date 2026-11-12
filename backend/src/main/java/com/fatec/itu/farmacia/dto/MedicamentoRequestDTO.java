package com.fatec.itu.farmacia.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public record MedicamentoRequestDTO(

    @NotBlank(message = "O nome é obrigatório")
    String nome,

    @NotBlank(message = "O fabricante é obrigatório")
    String fabricante,

    @NotNull(message = "O preço é obrigatório")
    @Positive(message = "O preço deve ser maior que zero")
    Double preco,

    @NotNull(message = "A quantidade em estoque é obrigatória")
    @PositiveOrZero(message = "A quantidade em estoque deve ser maior ou igual a zero")
    Integer quantidadeEstoque,

    @NotNull(message = "O campo controlado é obrigatório")
    Boolean controlado
) {

}
