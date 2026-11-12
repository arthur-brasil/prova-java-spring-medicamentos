package com.fatec.itu.farmacia.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fatec.itu.farmacia.dto.MedicamentoRequestDTO;
import com.fatec.itu.farmacia.dto.MedicamentoResponseDTO;
import com.fatec.itu.farmacia.entity.Medicamento;
import com.fatec.itu.farmacia.mapper.MedicamentoMapper;
import com.fatec.itu.farmacia.service.MedicamentoService;

@RestController
@RequestMapping("/medicamentos")
public class MedicamentoController {

    private final MedicamentoService service;

    MedicamentoController(MedicamentoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<MedicamentoResponseDTO>> getAll() {
        List<MedicamentoResponseDTO> medicamentos = service.getAll()
                                                           .stream()
                                                           .map(MedicamentoMapper::toDTO)
                                                           .toList();
        return ResponseEntity.ok(medicamentos);
    }

    @PostMapping
    public ResponseEntity<MedicamentoResponseDTO> create(@RequestBody MedicamentoRequestDTO request) {
        Medicamento m = service.create(MedicamentoMapper.toEntity(request));
        MedicamentoResponseDTO response = MedicamentoMapper.toDTO(m);

        URI location = ServletUriComponentsBuilder
                       .fromCurrentRequest()
                       .path("/{id}")
                       .buildAndExpand(response.id())
                       .toUri();

        return ResponseEntity.created(location).body(response);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable Long id,
                                       @RequestBody MedicamentoRequestDTO request) {
        service.update(id, MedicamentoMapper.toEntity(request));
        return ResponseEntity.noContent().build();
    }
}
