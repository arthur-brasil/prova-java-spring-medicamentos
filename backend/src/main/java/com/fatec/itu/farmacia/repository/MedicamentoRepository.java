package com.fatec.itu.farmacia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.itu.farmacia.entity.Medicamento;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {

}
