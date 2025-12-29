package com.SuiviAlimentaire.HistoriqueNutritionnel.service;


import  com.SuiviAlimentaire.HistoriqueNutritionnel.entity.Repas;
import com.SuiviAlimentaire.HistoriqueNutritionnel.repository.RepasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RepasService {

    @Autowired
    private RepasRepository repasRepository;

    public Repas enregistrerRepas(Repas repas) {
        return repasRepository.save(repas);
    }

    public List<Repas> getHistoriqueByUser(Long userId) {
        return repasRepository.findByUserId(userId);
    }

    public Optional<Repas> getRepasById(Long id) {
        return repasRepository.findById(id);
    }

    public Repas modifierRepas(Long id, Repas updatedRepas) {
        return repasRepository.findById(id)
                .map(repas -> {
                    repas.setType(updatedRepas.getType());
                    repas.setDate(updatedRepas.getDate());
                    repas.setCalories(updatedRepas.getCalories());
                    repas.setNutriments(updatedRepas.getNutriments());
                    return repasRepository.save(repas);
                })
                .orElseThrow(() -> new RuntimeException("Repas non trouvé"));
    }

    public void supprimerRepas(Long id) {
        repasRepository.deleteById(id);
    }
}