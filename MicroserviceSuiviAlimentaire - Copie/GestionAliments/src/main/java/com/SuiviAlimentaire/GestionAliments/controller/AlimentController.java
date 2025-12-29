package com.SuiviAlimentaire.GestionAliments.controller;



import com.SuiviAlimentaire.GestionAliments.entity.Aliment;
import com.SuiviAlimentaire.GestionAliments.service.AlimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/aliments")
@CrossOrigin(origins = "http://localhost:4200")
public class AlimentController {
    @Autowired
    private AlimentService alimentService;

    @GetMapping
    public List<Aliment> getAllAliments() {
        return alimentService.getAllAliments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aliment> getAlimentById(@PathVariable Long id) {
        Optional<Aliment> aliment = alimentService.getAlimentById(id);
        return aliment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Aliment createAliment(@RequestBody Aliment aliment) {
        return alimentService.createAliment(aliment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aliment> updateAliment(@PathVariable Long id, @RequestBody Aliment alimentDetails) {
        Aliment updatedAliment = alimentService.updateAliment(id, alimentDetails);
        return ResponseEntity.ok(updatedAliment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAliment(@PathVariable Long id) {
        alimentService.deleteAliment(id);
        return ResponseEntity.noContent().build();
    }
}