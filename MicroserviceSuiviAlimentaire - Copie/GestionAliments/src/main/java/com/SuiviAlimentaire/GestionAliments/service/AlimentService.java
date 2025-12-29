package com.SuiviAlimentaire.GestionAliments.service;



import com.SuiviAlimentaire.GestionAliments.entity.Aliment;
import com.SuiviAlimentaire.GestionAliments.repository.AlimentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlimentService {
    @Autowired
    private AlimentRepository alimentRepository;

    public List<Aliment> getAllAliments() {
        return alimentRepository.findAll();
    }

    public Optional<Aliment> getAlimentById(Long id) {
        return alimentRepository.findById(id);
    }

    public Aliment createAliment(Aliment aliment) {
        return alimentRepository.save(aliment);
    }

    public Aliment updateAliment(Long id, Aliment alimentDetails) {
        Aliment aliment = alimentRepository.findById(id).orElseThrow();
        aliment.setNom(alimentDetails.getNom());
        aliment.setCaloriesParPortion(alimentDetails.getCaloriesParPortion());
        aliment.setNutrimentsParPortion(alimentDetails.getNutrimentsParPortion());
        return alimentRepository.save(aliment);
    }

    public void deleteAliment(Long id) {
        alimentRepository.deleteById(id);
    }
}